export { entranceAnimations } from "./entrance";
export { exitAnimations } from "./exit";
export { attentionAnimations } from "./attention";
export { hoverAnimations } from "./hover";
export { textAnimations } from "./text";
export { loadingAnimations } from "./loading";

import { entranceAnimations } from "./entrance";
import { exitAnimations } from "./exit";
import { attentionAnimations } from "./attention";
import { hoverAnimations } from "./hover";
import { textAnimations } from "./text";
import { loadingAnimations } from "./loading";

export const allAnimations = {
  ...entranceAnimations,
  ...exitAnimations,
  ...attentionAnimations,
  ...hoverAnimations,
  ...textAnimations,
  ...loadingAnimations,
};