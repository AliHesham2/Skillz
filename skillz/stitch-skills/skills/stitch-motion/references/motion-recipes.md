# Motion recipes

Use the project's own design tokens and classes. These patterns establish behavior; they are not a visual template.

## Reveal without hiding the page on failure

Keep server-rendered or static content visible. Only attach a one-shot entrance animation when IntersectionObserver reports visibility; never set global opacity to zero and depend on initialization to restore it. Read reduced-motion preference before observing, and disconnect observers on teardown. Use short stagger groups rather than cumulative delays across an entire page.

```css
.enter-once { animation: enter 360ms cubic-bezier(.2,.7,.2,1) both; }
@keyframes enter {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .enter-once { animation: none; }
}
```

## Button/card feedback

Use hover effects only inside `@media (hover: hover)`; provide a visible `:focus-visible` ring independently. A slight press or thumbnail shift should not move the surrounding layout. Keep the actual hit area stable and account for touch devices. Under reduced motion remove transform transitions, while keeping a visible color/border state.

## Route transitions

For static multi-page sites, progressive cross-document View Transitions may be used when compatible with the target browser and same-origin routes. Standard links and navigation remain the fallback. For React/other SPAs, use the existing router and transition support. Do not intercept modifier-click, downloads, external links or fragment-only navigation with a homegrown animation router.

If using an animation library, honor reduced-motion settings with its supported API or a media query listener; clean up subscriptions. Restore focus to the new page's main heading on client-side route changes without trapping keyboard users or overriding normal fragment targets.

## Browser acceptance

- Navigation works with transitions unsupported or disabled.
- Reduced-motion removes translation, parallax and loops.
- Content remains visible with JavaScript disabled where the chosen stack supports rendering it.
- Re-entering a route does not duplicate listeners or observers.
- No scroll-triggered layout shifts, blocked controls or horizontal overflow.
