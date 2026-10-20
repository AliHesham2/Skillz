"""Check a static Stitch site against its route manifest; no JS execution."""
import argparse
import json
import posixpath
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = []
        self.links = []
        self.assets = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        identifier = data.get('id') or (data.get('name') if tag == 'a' else None)
        if identifier:
            if identifier in self.ids:
                self.duplicates.append(identifier)
            self.ids.add(identifier)
        if tag == 'a' and 'href' in data:
            self.links.append(data['href'] or '')
        if tag in ('img', 'script', 'source', 'video', 'audio', 'iframe'):
            if data.get('src'):
                self.assets.append(data['src'])
            if data.get('poster'):
                self.assets.append(data['poster'])
        if tag == 'link' and data.get('href') and data.get('rel') in ('stylesheet', 'icon'):
            self.assets.append(data['href'])

    handle_startendtag = handle_starttag


def canonical(path):
    result = posixpath.normpath('/' + path.lstrip('/'))
    return result if result == '/' else result.rstrip('/')


def check(root, manifest):
    root = Path(root).resolve()
    issues, pages, routes, files = [], {}, {}, {}
    entries = manifest.get('pages', [])
    if not isinstance(entries, list) or not entries:
        return {'pages_checked': 0, 'links_checked': 0, 'issues': ['Manifest must contain a nonempty pages list.']}

    def fail(message):
        issues.append(message)

    for entry in entries:
        if not isinstance(entry, dict):
            fail('Each page must be an object.')
            continue
        route, filename = entry.get('route'), entry.get('file')
        if not isinstance(route, str) or not route.startswith('/') or urlsplit(route).scheme or urlsplit(route).netloc or '?' in route or '#' in route:
            fail(f'Invalid route: {route!r}')
            continue
        if not isinstance(filename, str) or not filename or '\\' in filename:
            fail(f'{route}: file must be a relative slash-separated path.')
            continue
        target = (root / filename).resolve()
        if not target.is_relative_to(root) or Path(filename).is_absolute():
            fail(f'{route}: output escapes site root.')
            continue
        key = canonical(route)
        if key in routes:
            fail(f'Duplicate route: {route}')
            continue
        if target in files:
            fail(f'{route}: output already belongs to another route.')
            continue
        if not target.is_file():
            fail(f'{route}: missing output {filename}')
            continue
        if target.suffix.lower() not in ('.html', '.htm'):
            fail(f'{route}: static checker requires HTML output.')
            continue
        routes[key] = target
        files[target] = route
        page = Page(target.read_text(encoding='utf-8-sig'))
        pages[target] = page
        for duplicate in page.duplicates:
            fail(f'{route}: duplicate id {duplicate!r}')
    if '/' not in routes:
        fail('Missing home route /.')

    def resolve(current, url):
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc:
            return None, parsed
        decoded = unquote(parsed.path)
        if not decoded:
            return current, parsed
        # Resolve relative links as the browser would from the public route.
        current_route = files[current]
        base = current_route if current_route.endswith('/') else posixpath.dirname(current_route) + '/'
        public = decoded if decoded.startswith('/') else posixpath.join(base, decoded)
        route_target = routes.get(canonical(public))
        if route_target:
            return route_target, parsed
        # Relative resources resolve from the public URL even behind a route rewrite.
        disk = root / posixpath.normpath(public).lstrip('/')
        disk = disk.resolve()
        if not disk.is_relative_to(root):
            return False, parsed
        if disk.is_dir():
            disk = disk / 'index.html'
        return disk, parsed

    links_checked = 0
    graph = {path: set() for path in pages}
    for current, page in pages.items():
        route = files[current]
        for href in page.links:
            links_checked += 1
            href = href.strip()
            if not href.strip() or href == '#' or href.lower().startswith('javascript:'):
                fail(f'{route}: placeholder link {href!r}')
                continue
            target, parsed = resolve(current, href)
            if target is None:
                continue
            if target is False or not target.is_file():
                fail(f'{route}: missing internal destination {href!r}')
                continue
            if target.suffix.lower() in ('.html', '.htm') and target not in pages:
                fail(f'{route}: HTML destination absent from manifest {href!r}')
            if target in pages:
                graph[current].add(target)
            if parsed.fragment and target.suffix.lower() in ('.html', '.htm'):
                other = pages.get(target) or Page(target.read_text(encoding='utf-8-sig'))
                if unquote(parsed.fragment) not in other.ids:
                    fail(f'{route}: missing fragment {href!r}')
        for asset in page.assets:
            target, _ = resolve(current, asset)
            if target is not None and (target is False or not target.is_file()):
                fail(f'{route}: missing local asset {asset!r}')
    if '/' in routes:
        visited, pending = set(), [routes['/']]
        while pending:
            current = pending.pop()
            if current not in visited:
                visited.add(current)
                pending.extend(graph.get(current, set()) - visited)
        for target in pages.keys() - visited:
            fail(f'{files[target]}: page is unreachable from home through HTML links.')
    return {'pages_checked': len(pages), 'links_checked': links_checked, 'issues': issues,
            'limits': 'Static HTML only; does not execute JavaScript or check CSS url(), srcset, forms, external URLs, server fallback or runtime motion.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', required=True)
    parser.add_argument('--manifest', required=True)
    args = parser.parse_args()
    try:
        manifest = json.loads(Path(args.manifest).read_text(encoding='utf-8-sig'))
        if not isinstance(manifest, dict):
            raise ValueError('Manifest must be an object.')
        report = check(args.root, manifest)
    except (OSError, ValueError) as error:
        report = {'issues': [str(error)]}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if report['issues'] else 0


if __name__ == '__main__':
    raise SystemExit(main())
