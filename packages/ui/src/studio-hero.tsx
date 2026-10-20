import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export type StudioHeroProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title?: ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const stages = [
  { label: 'Imagine', title: 'Start with a little possibility.', detail: 'A blank page. A clear direction.', cards: ['Find the right feeling', 'Collect what inspires you', 'Make a little room'] },
  { label: 'Create', title: 'Good things take shape.', detail: 'Bring your idea a little closer.', cards: ['Shape the first impression', 'Build something that works', 'Connect the details'] },
  { label: 'Refine', title: 'The details make the difference.', detail: 'A few small changes. A better whole.', cards: ['Find a quieter rhythm', 'Give every detail a purpose', 'Make it feel like you'] },
];

export function StudioHero({ title = <>Make room<br />for good work.</>, description = 'A calmer space for your ideas, your process, and the details that make it yours.', primaryLabel = 'Explore the collection', primaryHref, secondaryHref, secondaryLabel = 'Meet the system', className, ...props }: StudioHeroProps) {
  const [stage, setStage] = useState(1);
  const [finished, setFinished] = useState<Record<string, boolean>>({});
  const id = useId();
  const current = stages[stage];
  const completed = current.cards.filter((_, i) => finished[`${stage}-${i}`]).length;
  return <section className={cn('forma-studio-hero', className)} {...props}>
    <div className="forma-studio-hero__copy">
      <div className="forma-studio-hero__signature"><span aria-hidden="true" className="forma-studio-hero__spark">✳</span> A little space. A fresh perspective.</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="forma-studio-hero__actions"><a className="forma-studio-hero__cta" href={primaryHref}>{primaryLabel}<span aria-hidden="true">↗</span></a>{secondaryHref && <a className="forma-studio-hero__secondary" href={secondaryHref}>{secondaryLabel}</a>}</div>
      <div className="forma-studio-hero__note"><span aria-hidden="true" /> Built for your own kind of flow.</div>
    </div>
    <div className="forma-studio-hero__visual">
      <div className="forma-studio-hero__halo" aria-hidden="true" />
      <div className="forma-workspace">
        <div className="forma-workspace__bar"><span className="forma-workspace__mark" aria-hidden="true">f.</span><strong>Your creative space</strong><span className="forma-workspace__demo">Interactive demo</span></div>
        <div className="forma-workspace__body">
          <div className="forma-workspace__intro"><span>One thing at a time.</span><div className="forma-workspace__flower" aria-hidden="true">✳</div></div>
          <h3>Today, intentionally.</h3>
          <div className="forma-workspace__tabs" role="group" aria-label="Creative stage">{stages.map((item, i) => <button type="button" key={item.label} aria-pressed={stage === i} aria-controls={`${id}-tasks`} onClick={() => setStage(i)}>{item.label}</button>)}</div>
          <div id={`${id}-tasks`} className="forma-workspace__tasks"><h4>{current.title}</h4><p>{current.detail}</p>{current.cards.map((task, i) => <label className="forma-task" key={`${stage}-${i}`}><input type="checkbox" checked={!!finished[`${stage}-${i}`]} onChange={e => setFinished(prev => ({ ...prev, [`${stage}-${i}`]: e.target.checked }))} /><span>{task}</span></label>)}</div>
          <div className="forma-workspace__bottom"><span role="status">{completed} of 3 little steps</span><div className="forma-workspace__progress" aria-hidden="true">{[0, 1, 2].map(i => <i key={i} data-done={i < completed} />)}</div></div>
        </div>
      </div>
      <div className="forma-studio-hero__caption"><span aria-hidden="true">↳</span> Less friction. More making.</div>
    </div>
  </section>;
}
