import type { ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

export type LiftButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline';
  loading?: boolean;
};

export function LiftButton({ children, variant = 'solid', loading = false, disabled, className, type = 'button', ...props }: LiftButtonProps) {
  return <button type={type} className={cn('forma-lift', `forma-lift--${variant}`, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    <span className="forma-lift__wash" aria-hidden="true" />
    <span className="forma-lift__label">{children}</span>
    <span className="forma-lift__icon" aria-hidden="true">{loading ? <span className="forma-lift__spinner" /> : <span className="forma-lift__arrows">{[0, 1].map(i => <svg key={i} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg>)}</span>}</span>
  </button>;
}
