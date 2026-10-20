import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from './utils';

const useClientLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
type CardLayout = { width: number; height: number; slots: { x: number; y: number; width: number; height: number }[] };

export interface WildlifeSlide {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  action?: { label: string; href: string };
}
export interface WildlifeSliderProps {
  slides: readonly WildlifeSlide[];
  className?: string;
  initialIndex?: number;
  paused?: boolean;
  /** Hide when the host provides an external motion control. */
  showControls?: boolean;
  autoplay?: boolean;
  interval?: number;
  onChange?: (index: number, slide: WildlifeSlide) => void;
}

function Photograph({ src, alt, position, className }: { src: string; alt: string; position?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return failed ? <div className={cn('wildlife__image-fallback', className)} role={alt ? 'img' : undefined} aria-label={alt || undefined}/> : <img className={className} src={src} alt={alt} style={{ objectPosition: position }} draggable={false} onError={() => setFailed(true)}/>;
}

/** A photographic carousel with expanding previews and optional autoplay. */
export function WildlifeSlider({ slides, initialIndex = 0, className, paused = false, showControls = true, autoplay = false, interval = 7000, onChange }: WildlifeSliderProps) {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(() => Number.isFinite(initialIndex) ? Math.max(0, Math.floor(initialIndex)) : 0);
  const active = slides.length ? index % slides.length : 0;
  const slide = slides[active];
  const [localPause, setLocalPause] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [cardLayout, setCardLayout] = useState<CardLayout>({ width: 0, height: 0, slots: [] });
  const [cardsReady, setCardsReady] = useState(false);
  const nextButton = useRef<HTMLButtonElement>(null);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const stopMotion = paused || localPause || reduced;
  const delay = Number.isFinite(interval) ? Math.max(3000, interval) : 7000;
  const running = autoplay && !stopMotion && !interacting && visible && slides.length > 1;
  const callback = useRef(onChange); callback.current = onChange;
  // Keep one photograph node per slide, just as the original reorders its cards.
  // Measure responsive hit targets; the photographs move between those boxes
  // and the full stage using the original one-second geometry transition.
  useClientLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const slots = Array.from(element.querySelectorAll<HTMLElement>('.wildlife__thumbnail')).map(button => {
        const box = button.getBoundingClientRect();
        return { x: box.left - bounds.left, y: box.top - bounds.top, width: box.width, height: box.height };
      });
      const next = { width: bounds.width, height: bounds.height, slots };
      setCardLayout(current => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    measure();
    const frame = !cardsReady ? requestAnimationFrame(() => setCardsReady(true)) : undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    const rail = element.querySelector('.wildlife__rail');
    if (rail) observer.observe(rail);
    return () => { observer.disconnect(); if (frame !== undefined) cancelAnimationFrame(frame); };
  }, [active, slides.length, detailsOpen, cardsReady]);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    let inView = true;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    if (root.current) observer.observe(root.current);
    document.addEventListener('visibilitychange', sync); sync();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  const go = (next: number, announce = true) => {
    if (!slides.length) return;
    const destination = (next % slides.length + slides.length) % slides.length;
    if (destination === active) return;
    setIndex(destination); setDetailsOpen(false);
    if (announce) setAnnouncement(`${slides[destination].name}, ${destination + 1} of ${slides.length}`);
    callback.current?.(destination, slides[destination]);
  };
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      const next = (active + 1) % slides.length;
      setIndex(next); setDetailsOpen(false); callback.current?.(next, slides[next]);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, running, delay, slides]);

  const upcomingCount = Math.min(3, Math.max(0, slides.length - (slides.length > 2 ? 2 : 1)));
  return <section ref={root} className={cn('wildlife', className)} aria-label="Wildlife stories" aria-roledescription="carousel" dir="ltr" data-still={stopMotion || undefined} data-ready={cardsReady || undefined}
    onMouseEnter={() => setInteracting(true)} onMouseLeave={e => setInteracting(e.currentTarget.contains(document.activeElement))}
    onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteracting(e.currentTarget.matches(':hover')); }}
    onKeyDown={e => { if (e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement).closest('input,textarea,select,[contenteditable]')) return; if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(active + (e.key === 'ArrowRight' ? 1 : -1)); if ((e.target as HTMLElement).closest('.wildlife__copy,.wildlife__rail')) nextButton.current?.focus(); } }}
    onPointerDown={e => { if (e.isPrimary && e.pointerType !== 'mouse' && !(e.target as HTMLElement).closest('button,a')) gesture.current = { x: e.clientX, y: e.clientY, id: e.pointerId }; }} onPointerCancel={() => { gesture.current = null; }}
    onPointerUp={e => { const start = gesture.current; gesture.current = null; if (!start || start.id !== e.pointerId) return; const dx = e.clientX - start.x, dy = e.clientY - start.y; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1)); }}>
    {!slide ? <div className="wildlife__empty"><h2>No stories yet.</h2><p>Add a photograph and a story to begin.</p></div> : <>
      <div className="wildlife__cards">{slides.map((item, i) => {
        const offset = (i - active + slides.length) % slides.length;
        const full = offset === 0 || (slides.length > 2 && offset === slides.length - 1);
        const firstSlot = cardLayout.slots[0];
        const step = firstSlot ? (cardLayout.slots[1]?.x ?? firstSlot.x + firstSlot.width + 12) - firstSlot.x : 0;
        // Offscreen cards remain on the same horizontal rail, as in the source.
        const slot = cardLayout.slots[offset - 1] ?? (firstSlot ? { ...firstSlot, x: firstSlot.x + Math.max(0, offset - 1) * step } : undefined);
        const thumbnail = !full && offset <= upcomingCount;
        // A departing underlay must fall behind the outgoing full photograph
        // immediately, even while its opacity/geometry transition is unfinished.
        return <div key={item.id} data-wildlife-card={item.id} data-card-state={offset === 0 ? 'active' : full ? 'previous' : thumbnail ? 'thumbnail' : 'hidden'} className="wildlife__card" aria-hidden={i !== active} style={{ left: full ? 0 : slot?.x ?? cardLayout.width + 40, top: full ? 0 : slot?.y ?? cardLayout.height, width: full ? '100%' : slot?.width ?? 120, height: full ? '100%' : slot?.height ?? 160, borderRadius: full ? 0 : 16, opacity: full || (thumbnail && !!slot) ? 1 : 0, zIndex: offset === 0 ? 1 : thumbnail ? 2 : full ? 0 : -1 }}>
          <Photograph src={item.image} alt={i === active ? item.imageAlt : ''} position={item.objectPosition}/>
          <div className="wildlife__scrim" style={{ opacity: full ? 1 : 0 }}/>
          <span className="wildlife__card-label" aria-hidden="true" style={{ opacity: thumbnail ? 1 : 0 }}>{item.name}</span>
        </div>;
      })}</div>
      <div className="wildlife__layout">
        <div className="wildlife__masthead"><span>FIELD NOTES<span className="wildlife__mark"> / </span>NATURE IN FOCUS</span><span>{String(active + 1).padStart(2, '0')} — {String(slides.length).padStart(2, '0')}</span></div>
        <div className="wildlife__copy" key={slide.id}><span className="wildlife__eyebrow">A closer look at the wild</span><h2>{slide.name}</h2><p>{slide.description}</p>{slide.action && <a className="wildlife__action" href={slide.action.href}>{slide.action.label}<span aria-hidden="true">↗</span></a>}<button className="wildlife__details-toggle" type="button" aria-expanded={detailsOpen} onClick={() => setDetailsOpen(value => !value)}>{detailsOpen ? 'Hide photo details' : 'Photo details'} <span aria-hidden="true">{detailsOpen ? '−' : '+'}</span></button>{detailsOpen && <p className="wildlife__details">{slide.imageAlt}</p>}</div>
        {upcomingCount > 0 && <div className="wildlife__rail" aria-label="Upcoming stories">{Array.from({ length: upcomingCount }, (_, offset) => (active + offset + 1) % slides.length).map(n => <button key={slides[n].id} type="button" className="wildlife__thumbnail" aria-label={`Show ${slides[n].name}, slide ${n + 1}`} onClick={() => { go(n); nextButton.current?.focus(); }}/>)}</div>}
        <div className="wildlife__controls"><div className="wildlife__arrows">{slides.length > 1 && <><button type="button" aria-label="Previous story" onClick={() => go(active - 1)}>←</button><button ref={nextButton} type="button" aria-label="Next story" onClick={() => go(active + 1)}>→</button></>}<span>{String(active + 1).padStart(2, '0')}<span className="wildlife__divider"> / </span>{String(slides.length).padStart(2, '0')}</span></div>{showControls && <button type="button" className="wildlife__pause" aria-pressed={localPause || paused || reduced} disabled={paused || reduced} onClick={() => setLocalPause(value => !value)}>{paused || reduced ? 'Motion off' : localPause ? 'Resume motion' : 'Pause motion'}</button>}</div>
      </div>
      {running && <div className="wildlife__progress" key={`${slide.id}-${delay}`} style={{ animationDuration: `${delay}ms` }} aria-hidden="true"/>}
    </>}
    <span className="wildlife__sr" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
  </section>;
}
