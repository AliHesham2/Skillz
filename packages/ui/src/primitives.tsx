import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from './utils';
export function Button({variant='primary',className,type='button',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'secondary'|'ghost'}){return <button type={type} className={cn('forma-button',`forma-button--${variant}`,className)} {...props}/>}
export function Card({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn('forma-card',className)} {...props}/>}
export function Badge({className,...props}:HTMLAttributes<HTMLSpanElement>){return <span className={cn('forma-badge',className)} {...props}/>}
