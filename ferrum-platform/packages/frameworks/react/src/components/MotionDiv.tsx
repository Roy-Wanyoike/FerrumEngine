import React, { type ReactNode } from 'react';
import { Animated, type AnimatedProps } from './Animated';

export interface MotionDivProps extends Omit<AnimatedProps, 'as'> {
  children?: ReactNode;
}

/**
 * A pre-built `<div>` element with Ferrum animation support.
 *
 * @example
 * ```tsx
 * <MotionDiv animation="fade-in" duration={300}>
 *   <p>I fade in!</p>
 * </MotionDiv>
 * ```
 */
export function MotionDiv({
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
}: MotionDivProps) {
  return (
    <Animated
      animation={animation}
      as="div"
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

export default MotionDiv;