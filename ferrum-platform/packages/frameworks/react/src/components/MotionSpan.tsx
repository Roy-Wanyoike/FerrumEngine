import React, { type ReactNode } from 'react';
import { Animated, type AnimatedProps } from './Animated';

export interface MotionSpanProps extends Omit<AnimatedProps, 'as'> {
  children?: ReactNode;
}

/**
 * A pre-built `<span>` element with Ferrum animation support.
 *
 * @example
 * ```tsx
 * <MotionSpan animation="slide-left" duration={400}>
 *   Text slides in
 * </MotionSpan>
 * ```
 */
export function MotionSpan({
  children,
  animation,
  duration,
  delay,
  easing,
  iteration,
  className,
  triggerOnMount,
  onAnimationStart,
  onAnimationEnd,
  ...htmlProps
}: MotionSpanProps) {
  return (
    <Animated
      animation={animation}
      as="span"
      duration={duration}
      delay={delay}
      easing={easing}
      iteration={iteration}
      className={className}
      triggerOnMount={triggerOnMount}
      onAnimationStart={onAnimationStart}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </Animated>
  );
}

export default MotionSpan;