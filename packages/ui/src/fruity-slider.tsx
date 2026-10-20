import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { cn } from './utils';

export interface FruitySlide {
  id: string;
  name: string;
  description: string;
  /** A transparent product image, independent of the optional demo atlas. */
  productImage?: string;
  fruits?: readonly string[];
  wash?: string;
  ink?: string;
  /** Zero-based frame in labelAtlas. */
  labelFrame?: number;
}
export interface FruitySliderProps {
  slides: readonly FruitySlide[];
  labelAtlas?: { src: string; mask: string; frames: number };
  initialIndex?: number;
  paused?: boolean;
  /** Hide when the host provides an external motion control. */
  showControls?: boolean;
  className?: string;
  onChange?: (index: number, slide: FruitySlide) => void;
}
const bounded = (n: number, length: number) => Math.max(0, Math.min(length - 1, Number.isFinite(n) ? Math.floor(n) : 0));

function ProductArtwork({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return src && !failed ? <img src={src} alt="" draggable={false} onError={() => setFailed(true)}/> : <span className="fruity__fallback">{name}</span>;
}

/** Bounded product carousel. Arrow direction follows its explicitly LTR scene. */
export function FruitySlider({ slides, labelAtlas, initialIndex = 0, paused = false, showControls = true, className, onChange }: FruitySliderProps) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLImageElement>(null);
  const [index, setIndex] = useState(() => bounded(initialIndex, slides.length));
  const active = bounded(index, slides.length);
  const [localPause, setLocalPause] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const [atlasFailed, setAtlasFailed] = useState(false);
  const interacted = useRef(false);
  const entryDirection = useRef(-1);
  const pendingChange = useRef<number | null>(null);
  const change = useRef(onChange);
  change.current = onChange;
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const motionOff = paused || localPause || reduced;
  const atlasFrames = Number.isFinite(labelAtlas?.frames) ? Math.max(1, Math.floor(labelAtlas!.frames)) : 1;
  const useAtlas = !!labelAtlas && !atlasFailed;
  const frame = bounded(slides[active]?.labelFrame ?? active, atlasFrames);

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
  useEffect(() => {
    setIndex(current => bounded(current, slides.length));
  }, [slides.length]);
  useEffect(() => setAtlasFailed(false), [labelAtlas?.src, labelAtlas?.mask]);

  useEffect(() => {
    if (!slides.length) return;
    const finish = () => {
      if (pendingChange.current === active) {
        pendingChange.current = null;
        setAnnouncement(`${slides[active].name}, ${active + 1} of ${slides.length}`);
        change.current?.(active, slides[active]);
      }
    };
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });
      const duration = motionOff || !interacted.current ? 0 : .8;
      timeline.to(track.current, { xPercent: -active * 100 / slides.length, duration, ease: 'power3.inOut' }, 0);
      if (labels.current) timeline.to(labels.current, { xPercent: -frame * 100 / atlasFrames, duration, ease: 'power3.inOut' }, 0);
      const titles = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-fruity-title]') ?? []);
      gsap.set(titles, { x: 0, xPercent: 0, y: 0 });
      const incoming = titles[active];
      if (incoming) {
        if (Number(gsap.getProperty(incoming, 'opacity')) < .01) gsap.set(incoming, { yPercent: 110 });
        const outgoing = titles.filter((_, i) => i !== active);
        if (outgoing.length) timeline.to(outgoing, { yPercent: -110, opacity: 0, duration: duration ? .25 : 0, ease: 'power2.in' }, 0);
        timeline.to(incoming, { yPercent: 0, opacity: 1, duration: duration ? .5 : 0, ease: 'power3.out' }, duration ? .2 : 0);
      }
      // Fruit belongs to the stationary stage, not the horizontal scene track.
      // Placement, vertical entry and idle drift each own a different wrapper.
      const fruitLayers = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-fruity-fruits]') ?? []);
      const distance = (root.current?.querySelector('.fruity__stage')?.clientHeight ?? 700) + 40;
      fruitLayers.forEach((layer, i) => {
        const entries = layer.querySelectorAll('.fruity__entry');
        const shadows = layer.querySelectorAll('.fruity__ground-shadow');
        if (!duration) {
          gsap.set(layer, { autoAlpha: i === active ? 1 : 0 });
          if (entries.length) gsap.set(entries, { y: 0, opacity: 1 });
          if (shadows.length) gsap.set(shadows, { opacity: .35, scaleX: 1 });
        } else if (i === active) {
          if (Number(gsap.getProperty(layer, 'opacity')) < .01) {
            if (entries.length) gsap.set(entries, { y: entryDirection.current * distance, opacity: 0 });
            if (shadows.length) gsap.set(shadows, { opacity: 0, scaleX: .6 });
          }
          gsap.set(layer, { autoAlpha: 1 });
          if (entries.length) timeline.to(entries, { y: 0, opacity: 1, duration: .65, stagger: .07, ease: 'power3.out' }, .18);
          if (shadows.length) timeline.to(shadows, { opacity: .35, scaleX: 1, duration: .45, stagger: .07, ease: 'power2.out' }, .28);
        } else if (Number(gsap.getProperty(layer, 'opacity')) > .01) {
          if (entries.length) timeline.to(entries, { y: -entryDirection.current * distance, opacity: 0, duration: .22, ease: 'power2.in' }, 0);
          if (shadows.length) timeline.to(shadows, { opacity: 0, scaleX: .6, duration: .2 }, 0);
          timeline.to(layer, { autoAlpha: 0, duration: .22 }, 0);
        }
      });
    }, root);
    // Retarget from the current visual position on rapid input, without stacking.
    // kill(false) preserves that position; every owned tween is still disposed.
    return () => context.kill(false);
  }, [active, slides, frame, atlasFrames, motionOff, useAtlas]);

  useEffect(() => {
    if (motionOff || !visible || !slides.length) return;
    const context = gsap.context(() => {
      const fruits = root.current?.querySelectorAll(`[data-fruity-fruits="${active}"] .fruity__float`);
      if (fruits?.length) gsap.to(fruits, { y: i => i % 2 ? 9 : -9, rotation: i => i % 2 ? 3 : -3, duration: 2.8, stagger: .16, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, root);
    return () => context.revert();
  }, [active, motionOff, visible, slides]);

  const go = (next: number) => {
    const target = bounded(next, slides.length);
    if (target === active) return;
    entryDirection.current = target > active ? -1 : 1;
    interacted.current = true;
    pendingChange.current = target;
    setIndex(target);
  };
  return <section ref={root} className={cn('fruity', className)} aria-label="Fruit flavors" aria-roledescription="carousel" dir="ltr" data-still={motionOff || undefined}
    onKeyDown={e => {
      if (e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement).closest('input,textarea,select,[contenteditable="true"]')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); go(active + (e.key === 'ArrowRight' ? 1 : -1)); }
    }}
    onPointerDown={e => { if (e.pointerType !== 'mouse' && !(e.target as HTMLElement).closest('button')) gesture.current = { x: e.clientX, y: e.clientY, id: e.pointerId }; }}
    onPointerCancel={() => { gesture.current = null; }}
    onPointerUp={e => {
      const start = gesture.current; gesture.current = null;
      if (!start || start.id !== e.pointerId) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1));
    }}>
    {!slides.length ? <div className="fruity__empty"><h2>No flavors yet.</h2><p>Add a slide to start exploring.</p></div> : <>
      <div className="fruity__stage">
        <div className="fruity__track" ref={track} style={{ width: `${slides.length * 100}%` }}>
          {slides.map((slide, i) => <div key={slide.id} data-fruity-scene={i} className="fruity__scene" aria-hidden={i !== active} style={{ width: `${100 / slides.length}%`, '--fruity-wash': slide.wash ?? 'var(--muted)', '--fruity-ink': slide.ink ?? 'var(--foreground)' } as CSSProperties}>
            <div className="fruity__scene-top"><span>Fruity<span className="fruity__period">.</span></span><span>A little fruit. A little fizz.</span></div>
            {!useAtlas && <div className="fruity__product" aria-hidden="true"><ProductArtwork src={slide.productImage} name={slide.name}/></div>}
          </div>)}
        </div>
        <div className="fruity__fruit-layers" aria-hidden="true">{slides.map((slide, i) => <div key={slide.id} data-fruity-fruits={i} className={cn('fruity__fruit-layer', i === active && 'fruity__fruit-layer--current')}>
          {slide.fruits?.slice(0, 4).map((src, n) => <div className={`fruity__fruit fruity__fruit--${n}`} key={src}><div className="fruity__entry"><div className="fruity__float"><img src={src} alt="" draggable={false} onError={e => { e.currentTarget.style.visibility = 'hidden'; const shadow = e.currentTarget.closest('[data-fruity-fruits]')?.querySelector<HTMLElement>(`[data-fruity-shadow="${n}"]`); if (shadow) shadow.style.visibility = 'hidden'; }}/></div></div></div>)}
          {slide.fruits?.slice(0, 4).map((src, n) => <span key={src} data-fruity-shadow={n} className={`fruity__ground-shadow fruity__ground-shadow--${n}`}/>)}
        </div>)}</div>
        <div className="fruity__titles">{slides.map((slide, i) => <h2 key={slide.id} data-fruity-title={i} aria-hidden={i !== active} className={cn('fruity__name', i === active && 'fruity__name--current')} style={{ '--name-length': Math.max(6, slide.name.length), color: slide.ink ?? 'var(--foreground)' } as CSSProperties}>{slide.name}</h2>)}</div>
        {useAtlas && labelAtlas && <div className="fruity__product fruity__can" aria-hidden="true" style={{ maskImage: `url("${labelAtlas.mask}")`, WebkitMaskImage: `url("${labelAtlas.mask}")` }}>
          <img src={labelAtlas.mask} alt="" className="fruity__metal" draggable={false} onError={() => setAtlasFailed(true)}/>
          <img ref={labels} src={labelAtlas.src} alt="" className="fruity__labels" style={{ width: `${atlasFrames * 100}%` }} draggable={false} onError={() => setAtlasFailed(true)}/>
        </div>}
      </div>
      <div className="fruity__footer"><div className="fruity__caption"><span className="fruity__eyebrow">PICK YOUR FLAVOR</span><p>{slides[active].description}</p></div>
        {slides.length > 1 && <div className="fruity__navigation"><button type="button" className="fruity__arrow" aria-label="Previous flavor" disabled={active === 0} onClick={() => go(active - 1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><div className="fruity__positions" aria-label="Choose a flavor">{slides.map((slide, i) => <button key={slide.id} type="button" aria-label={`Show ${slide.name}`} aria-pressed={active === i} onClick={() => go(i)}><span/></button>)}</div><button type="button" className="fruity__arrow" aria-label="Next flavor" disabled={active === slides.length - 1} onClick={() => go(active + 1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div>}
        {showControls && <button type="button" className="fruity__pause" disabled={paused || reduced} aria-pressed={localPause || paused || reduced} onClick={() => setLocalPause(value => !value)}>{paused || reduced ? 'Motion off' : localPause ? 'Resume motion' : 'Pause motion'}</button>}
      </div>
    </>}
    <span className="fruity__sr" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
  </section>;
}
