// ── Component Definitions Barrel Export ──────────────────────────────────────
// Re-exports all 16 built-in semantic component definitions.

export { heroComponent } from "./hero";
export { pricingCardComponent } from "./pricing-card";
export { dashboardWidgetComponent } from "./dashboard-widget";
export { sidebarNavComponent } from "./sidebar-nav";
export { modalComponent } from "./modal";
export { primaryActionComponent } from "./primary-action";
export { dangerActionComponent } from "./danger-action";
export { marketingSectionComponent } from "./marketing-section";
export { analyticsPanelComponent } from "./analytics-panel";
export { dataTableComponent } from "./data-table";
export { formGroupComponent } from "./form-group";
export { notificationComponent } from "./notification";
export { profileCardComponent } from "./profile-card";
export { statCardComponent } from "./stat-card";
export { featureGridComponent } from "./feature-grid";
export { testimonialComponent } from "./testimonial";

import type { SemanticComponent } from "../types";
import { heroComponent } from "./hero";
import { pricingCardComponent } from "./pricing-card";
import { dashboardWidgetComponent } from "./dashboard-widget";
import { sidebarNavComponent } from "./sidebar-nav";
import { modalComponent } from "./modal";
import { primaryActionComponent } from "./primary-action";
import { dangerActionComponent } from "./danger-action";
import { marketingSectionComponent } from "./marketing-section";
import { analyticsPanelComponent } from "./analytics-panel";
import { dataTableComponent } from "./data-table";
import { formGroupComponent } from "./form-group";
import { notificationComponent } from "./notification";
import { profileCardComponent } from "./profile-card";
import { statCardComponent } from "./stat-card";
import { featureGridComponent } from "./feature-grid";
import { testimonialComponent } from "./testimonial";

/**
 * All built-in semantic components as an ordered array.
 */
export const builtInComponents: SemanticComponent[] = [
  heroComponent,
  pricingCardComponent,
  dashboardWidgetComponent,
  sidebarNavComponent,
  modalComponent,
  primaryActionComponent,
  dangerActionComponent,
  marketingSectionComponent,
  analyticsPanelComponent,
  dataTableComponent,
  formGroupComponent,
  notificationComponent,
  profileCardComponent,
  statCardComponent,
  featureGridComponent,
  testimonialComponent,
];

/**
 * Built-in components keyed by name for O(1) lookup.
 */
export const builtInComponentMap: Record<string, SemanticComponent> =
  Object.fromEntries(builtInComponents.map((c) => [c.name, c]));