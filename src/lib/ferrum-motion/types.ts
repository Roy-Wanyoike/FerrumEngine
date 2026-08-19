// Ferrum Motion — Type Definitions

/** Spring physics configuration */
export interface SpringConfig {
  /** Spring stiffness (force per unit displacement). Default: 100 */
  stiffness?: number;
  /** Damping coefficient. Default: 10 */
  damping?: number;
  /** Mass of the animated object. Default: 1 */
  mass?: number;
  /** Precision threshold for settling (pixels). Default: 0.01 */
  precision?: number;
  /** Initial velocity */
  velocity?: number;
}

/** A spring animation controller */
export interface SpringController {
  to: (target: number) => Animation;
  set: (v: number) => void;
  get: () => number;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

/** Timeline sequence item */
export interface TimelineSequence {
  /** Duration in ms */
  duration: number;
  /** Factory that receives (element, progress 0-1) and returns void */
  apply: (progress: number) => void;
  /** Delay before this sequence starts (ms) */
  delay?: number;
  /** Easing function */
  easing?: (t: number) => number;
}

/** Timeline options */
export interface TimelineOptions {
  /** Loop the timeline */
  loop?: boolean;
  /** Alternate direction each loop */
  alternate?: boolean;
  /** Callback when timeline finishes */
  onComplete?: () => void;
}

/** Timeline controller */
export interface TimelineController {
  play: () => void;
  pause: () => void;
  reverse: () => void;
  seek: (progress: number) => void;
  state: 'idle' | 'running' | 'paused' | 'finished';
}

/** Scroll animation options */
export interface ScrollOptions {
  /** Offset from viewport edge (px) */
  offset?: number;
  /** Throttle scroll events to this interval (ms). Default: 16 */
  throttle?: number;
}

/** Scroll callback signature */
export type ScrollCallback = (info: {
  progress: number;  // 0 = out of view, 1 = fully visible
  inView: boolean;
}) => void;

/** Stagger options */
export interface StaggerOptions {
  /** Delay between each item (ms). Default: 50 */
  delay?: number;
  /** Stagger direction */
  direction?: 'forward' | 'reverse' | 'center' | 'edges';
  /** Start delay before first item (ms) */
  startDelay?: number;
}

/** Decay animation config */
export interface DecayConfig {
  /** Initial velocity */
  velocity: number;
  /** Deceleration rate. Default: 0.998 */
  deceleration?: number;
  /** Bounce stiffness if hitting bounds */
  bounceStiffness?: number;
  /** Minimum velocity to stop */
  minVelocity?: number;
  /** Lower bound */
  min?: number;
  /** Upper bound */
  max?: number;
}

/** Decay controller */
export interface DecayController {
  to: (target: number) => void;
  set: (v: number) => void;
  get: () => number;
  stop: () => void;
}
