"use client";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.debug("[WebVital]", metric.name, metric.value, metric.rating);
    if (process.env.NODE_ENV === "production" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", JSON.stringify({
        name: metric.name, value: metric.value, rating: metric.rating,
        delta: metric.delta, id: metric.id, url: window.location.href, timestamp: Date.now(),
      }));
    }
  });
  return null;
}
