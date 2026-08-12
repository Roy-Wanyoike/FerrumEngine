"use client";
import { useReportWebVitals } from "next/web-vitals";
import { trackEvent, type WebVitalEvent, type WebVitalName, type WebVitalRating } from "@/lib/analytics-types";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const event: WebVitalEvent = {
      type: 'web-vital',
      name: metric.name as WebVitalName,
      value: metric.value,
      rating: metric.rating as WebVitalRating,
      delta: metric.delta,
      id: metric.id,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
    };
    trackEvent(event);
  });
  return null;
}
