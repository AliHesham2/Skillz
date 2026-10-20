# Page contract

For multi-page implementations, create `.stitch/routes.json` before wiring navigation. Paths in `file` are relative to the site output root, not the manifest directory. A minimal static site contract:

```json
{
  "pages": [
    {"route": "/", "file": "index.html", "title": "Home"},
    {"route": "/work/", "file": "work/index.html", "title": "Work"},
    {"route": "/contact/", "file": "contact/index.html", "title": "Contact"}
  ]
}
```

Choose routes from the actual product. In SITE.md also record the shared header/footer, primary CTA targets, active nav rule, and relevant user journeys. A journey might be Home -> Work -> Project detail -> Contact; do not create extra routes merely to match this example.

Preserve the same shell, typography, spacing and role colors across pages. Mark the active page with `aria-current="page"`. Link the logo to the home route and keep all requested pages reachable. Distinguish route transitions, in-page fragment links and real actions. Forms need validation and clear success/error behavior; a static demonstration must not claim to have sent a message.

Static builds should use real file paths or directory URLs matching the chosen server. SPAs should use the framework router, nested layouts and real route components. A route manifest does not configure a router or server fallback by itself. Deep-link refresh must be tested in the target hosting/preview environment.
