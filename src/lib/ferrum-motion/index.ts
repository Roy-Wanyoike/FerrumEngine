// Ferrum Motion — Main Entry Point

export { spring } from './spring';
export { decay } from './decay';
export { timeline } from './timeline';
export { stagger, chain } from './stagger';
export { onScroll, inView } from './scroll';

export type { SpringController, SpringConfig, DecayController, DecayConfig } from './types';
export type { TimelineSequence, TimelineOptions, TimelineController } from './types';
export type { ScrollOptions, ScrollCallback, StaggerOptions } from './types';
