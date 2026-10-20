import { useState, type CSSProperties } from 'react';
import { Card } from './primitives';
import { cn } from './utils';
export type Testimonial={name:string;role:string;quote:string};
const defaults:Testimonial[]=[{name:'Alex Morgan',role:'Product designer',quote:'Everything finally feels like it belongs together.'},{name:'Sam Rivera',role:'Creative developer',quote:'Small details. A completely different experience.'},{name:'Jamie Chen',role:'Design engineer',quote:'The kind of motion you feel more than you notice.'},{name:'Noor Hassan',role:'Studio founder',quote:'A thoughtful starting point for our next idea.'},{name:'Taylor Lee',role:'Frontend developer',quote:'One system, and so much room to make it ours.'},{name:'Robin Park',role:'Art director',quote:'Quiet, considered, and beautifully simple.'}];
export function Testimonials({items=defaults,speed=28,paused=false,showControls=true,className}: {items?:Testimonial[];speed?:number;paused?:boolean;showControls?:boolean;className?:string}){
 const [locallyPaused,setLocallyPaused]=useState(false);
 const duration=Number.isFinite(speed)?Math.max(8,speed):28;
 return <section className={cn('forma-testimonials',className)} aria-label="Sample testimonials" data-paused={paused || locallyPaused} style={{'--reel-duration':`${duration}s`} as CSSProperties}>
 {showControls && items.length>0 && <button type="button" className="forma-reel-control" onClick={()=>setLocallyPaused(!locallyPaused)} aria-pressed={locallyPaused} disabled={paused}>{paused ? "Motion paused" : locallyPaused ? "Resume reel" : "Pause reel"}</button>}
 {items.length===0 && <p className="forma-reel-empty">Your next kind words belong here.</p>}
 <div className="forma-testimonial-plane" aria-hidden="true">{[0,1,2].map(column=><div className="forma-reel-window" key={column}><div className="forma-reel" style={{animationDirection:column%2?'reverse':'normal'}}>{[0,1].map(copy=><div className="forma-reel-group" key={copy}>{items.map((_,index)=>{const item=items[(index+column*2)%items.length];return <Card key={index} className="forma-quote"><div className="forma-person"><span className="forma-avatar">{item.name.split(' ').map(n=>n[0]).join('')}</span><div><strong>{item.name}</strong><small>{item.role}</small></div></div><p>“{item.quote}”</p></Card>})}</div>)}</div></div>)}</div>
 <ul className="sr-only">{items.map((item,i)=><li key={i}>{item.name}, {item.role}: {item.quote}</li>)}</ul></section>
}
