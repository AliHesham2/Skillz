import { useEffect, useRef, useState, type ReactNode } from 'react';

/** The same mounted preview expands into a native modal, retaining component state. */
export function PreviewWorkbench({ title, toolbar, children }: { title: string; toolbar: ReactNode; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previous = useRef(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (expanded) {
      element.close(); element.showModal(); trigger.current?.focus();
      const previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      previous.current = true;
      return () => { document.documentElement.style.overflow = previousOverflow; };
    } else {
      element.close(); element.setAttribute('open', '');
      if (previous.current) trigger.current?.focus();
    }
    previous.current = expanded;
  }, [expanded]);
  return <dialog ref={dialog} className="preview-workbench" data-expanded={expanded || undefined} role={expanded ? 'dialog' : 'group'} aria-modal={expanded || undefined} aria-label={expanded ? `${title} full-screen preview` : `${title} preview`} onCancel={e => { e.preventDefault(); setExpanded(false); }}>
    {expanded && <div className="workbench-heading"><strong>{title}</strong><span>Full-screen preview · Esc to close</span></div>}
    <div className="workbench-toolbar">{toolbar}<button type="button" ref={trigger} className="forma-button forma-button--secondary workbench-expand" aria-label={expanded ? 'Exit full-screen preview' : 'Open full-screen preview'} title={expanded ? 'Exit full-screen preview (Esc)' : 'Open full-screen preview'} aria-expanded={expanded} onClick={() => setExpanded(value => !value)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{expanded ? <path d="M4 9h5V4m11 11h-5v5M9 9 3 3m12 12 6 6"/> : <path d="M15 4h5v5M9 20H4v-5M20 4l-7 7M4 20l7-7"/>}</svg></button></div>
    <div className="workbench-body">{children}</div>
  </dialog>;
}
