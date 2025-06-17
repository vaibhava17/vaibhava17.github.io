// src/lib/vitals.js
export function reportWebVitals(metric) {
  if (typeof window !== "undefined") {
    // Send to analytics
    gtag("event", metric.name, {
      event_category: "Web Vitals",
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
