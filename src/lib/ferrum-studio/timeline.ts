/**
 * @module ferrum-studio/timeline
 * Animation timeline utilities.
 * Provides keyframe CRUD, per-element queries, linear interpolation,
 * and timeline sorting.
 */

import type { AnimationTimeline, TimelineKeyframe } from './types';

let _kfCounter = 0;

/** Generate a unique keyframe id. */
function kfId(): string {
  _kfCounter += 1;
  return `kf_${Date.now().toString(36)}_${(_kfCounter).toString(36)}`;
}

/** Reset the internal keyframe ID counter (exposed for testing). */
export function _resetKfCounter(): void {
  _kfCounter = 0;
}

/**
 * Create a new empty animation timeline.
 * @param duration - Total duration in milliseconds (default 1000).
 * @returns A fresh AnimationTimeline.
 */
export function createTimeline(duration: number = 1000): AnimationTimeline {
  return {
    duration,
    keyframes: [],
    loop: false,
    direction: 'normal',
  };
}

/**
 * Add a keyframe to the timeline.
 * @param timeline - Target timeline.
 * @param kf - Keyframe data without an id.
 * @returns A new timeline with the keyframe appended.
 */
export function addKeyframe(
  timeline: AnimationTimeline,
  kf: Omit<TimelineKeyframe, 'id'>,
): AnimationTimeline {
  return {
    ...timeline,
    keyframes: [
      ...timeline.keyframes,
      { ...kf, id: kfId() },
    ],
  };
}

/**
 * Remove a keyframe from the timeline by id.
 * @param timeline - Target timeline.
 * @param keyframeId - The id of the keyframe to remove.
 * @returns A new timeline without the keyframe.
 */
export function removeKeyframe(
  timeline: AnimationTimeline,
  keyframeId: string,
): AnimationTimeline {
  return {
    ...timeline,
    keyframes: timeline.keyframes.filter((kf) => kf.id !== keyframeId),
  };
}

/**
 * Get all keyframes for a specific element, sorted by time.
 * @param timeline - Target timeline.
 * @param elementId - The element id to filter by.
 * @returns Sorted array of keyframes for the element.
 */
export function getKeyframesForElement(
  timeline: AnimationTimeline,
  elementId: string,
): TimelineKeyframe[] {
  return timeline.keyframes
    .filter((kf) => kf.elementId === elementId)
    .sort((a, b) => a.time - b.time);
}

/**
 * Interpolate property values for a specific element at a given time.
 * Performs linear interpolation for numeric values; snaps to the nearest
 * keyframe for string values.
 *
 * @param timeline - Target timeline.
 * @param elementId - The element id.
 * @param time - The time position in milliseconds.
 * @returns Interpolated property map.
 */
export function getInterpolatedProps(
  timeline: AnimationTimeline,
  elementId: string,
  time: number,
): Record<string, number | string> {
  const keyframes = getKeyframesForElement(timeline, elementId);
  if (keyframes.length === 0) return {};

  // Clamp time within timeline bounds
  const t = Math.max(0, Math.min(time, timeline.duration));

  // Before first keyframe → return first keyframe values
  if (t <= keyframes[0]!.time) {
    return { ...keyframes[0]!.properties };
  }

  // After last keyframe → return last keyframe values
  if (t >= keyframes[keyframes.length - 1]!.time) {
    return { ...keyframes[keyframes.length - 1]!.properties };
  }

  // Find surrounding keyframes
  let prev = keyframes[0]!;
  let next = keyframes[1]!;
  for (let i = 0; i < keyframes.length - 1; i++) {
    const current = keyframes[i]!;
    const upcoming = keyframes[i + 1]!;
    if (t >= current.time && t <= upcoming.time) {
      prev = current;
      next = upcoming;
      break;
    }
  }

  const range = next.time - prev.time;
  const progress = range === 0 ? 0 : (t - prev.time) / range;

  const result: Record<string, number | string> = {};
  const allKeys = new Set([
    ...Object.keys(prev.properties),
    ...Object.keys(next.properties),
  ]);

  for (const key of allKeys) {
    const prevVal = prev.properties[key];
    const nextVal = next.properties[key];

    // If property only exists in one keyframe, use that value directly
    if (prevVal === undefined) {
      result[key] = nextVal!;
      continue;
    }
    if (nextVal === undefined) {
      result[key] = prevVal;
      continue;
    }

    // Both values are numbers → linear interpolation
    if (typeof prevVal === 'number' && typeof nextVal === 'number') {
      result[key] = prevVal + (nextVal - prevVal) * progress;
      continue;
    }

    // Non-numeric → snap to nearest keyframe
    result[key] = progress < 0.5 ? prevVal : nextVal;
  }

  return result;
}

/**
 * Sort all keyframes in the timeline by time (stable sort).
 * @param timeline - Target timeline.
 * @returns A new timeline with sorted keyframes.
 */
export function sortKeyframes(
  timeline: AnimationTimeline,
): AnimationTimeline {
  return {
    ...timeline,
    keyframes: [...timeline.keyframes].sort((a, b) => a.time - b.time),
  };
}
