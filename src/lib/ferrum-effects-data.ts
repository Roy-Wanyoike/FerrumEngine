// ============================================================
// FerrumEngine Effects Library - Auto-generated data file
// Effects: 928 | Categories: 11
// Do not edit manually.
// ============================================================

export interface FerrumCSSEffect {
  name: string;
  className: string;
  category: string;
  displayType: string;
  css: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  {
    "id": "core-animations",
    "name": "Core Animations",
    "icon": "Sparkles"
  },
  {
    "id": "hover",
    "name": "Hover",
    "icon": "MousePointer"
  },
  {
    "id": "text",
    "name": "Text",
    "icon": "Type"
  },
  {
    "id": "backgrounds",
    "name": "Backgrounds",
    "icon": "ImageIcon"
  },
  {
    "id": "loaders",
    "name": "Loaders",
    "icon": "Loader2"
  },
  {
    "id": "3d-transforms",
    "name": "3D & Transforms",
    "icon": "Move3D"
  },
  {
    "id": "button-card",
    "name": "Buttons & Cards",
    "icon": "Zap"
  },
  {
    "id": "forms",
    "name": "Forms & Inputs",
    "icon": "Eye"
  },
  {
    "id": "navigation",
    "name": "Navigation & UI",
    "icon": "Box"
  },
  {
    "id": "scroll-micro",
    "name": "Scroll & Micro",
    "icon": "Layers"
  },
  {
    "id": "advanced",
    "name": "Advanced",
    "icon": "Crown"
  }
];

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Fade In",
    "className": "rc-fade-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-in { animation: rc-fade-in 0.6s ease-out both; }\n@keyframes rc-fade-in {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}"
  },
  {
    "name": "Slide In Up",
    "className": "rc-slide-in-up",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-in-up { animation: rc-slide-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-slide-in-up {\n  from { transform: translateY(100%); opacity: 0; }\n  to   { transform: translateY(0);    opacity: 1; }\n}"
  },
  {
    "name": "Slide In Down",
    "className": "rc-slide-in-down",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-in-down { animation: rc-slide-in-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-slide-in-down {\n  from { transform: translateY(-100%); opacity: 0; }\n  to   { transform: translateY(0);    opacity: 1; }\n}"
  },
  {
    "name": "Slide In Left",
    "className": "rc-slide-in-left",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-in-left { animation: rc-slide-in-left 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-slide-in-left {\n  from { transform: translateX(-100%); opacity: 0; }\n  to   { transform: translateX(0);    opacity: 1; }\n}"
  },
  {
    "name": "Slide In Right",
    "className": "rc-slide-in-right",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-in-right { animation: rc-slide-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-slide-in-right {\n  from { transform: translateX(100%); opacity: 0; }\n  to   { transform: translateX(0);   opacity: 1; }\n}"
  },
  {
    "name": "Zoom In",
    "className": "rc-zoom-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-zoom-in { animation: rc-zoom-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-zoom-in {\n  from { transform: scale(0);   opacity: 0; }\n  to   { transform: scale(1);   opacity: 1; }\n}"
  },
  {
    "name": "Bounce In",
    "className": "rc-bounce-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-bounce-in { animation: rc-bounce-in 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both; }\n@keyframes rc-bounce-in {\n  0%   { transform: scale(0.3); opacity: 0; }\n  50%  { transform: scale(1.05); }\n  70%  { transform: scale(0.95); }\n  100% { transform: scale(1);    opacity: 1; }\n}"
  },
  {
    "name": "Flip In X",
    "className": "rc-flip-in-x",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-flip-in-x {\n  backface-visibility: hidden;\n  animation: rc-flip-in-x 0.6s ease-in both;\n}\n@keyframes rc-flip-in-x {\n  from { transform: perspective(400px) rotateX(90deg); opacity: 0; }\n  40%  { transform: perspective(400px) rotateX(-10deg); }\n  70%  { transform: perspective(400px) rotateX(10deg);  }\n  to   { transform: perspective(400px) rotateX(0deg);   opacity: 1; }\n}"
  },
  {
    "name": "Flip In Y",
    "className": "rc-flip-in-y",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-flip-in-y {\n  backface-visibility: hidden;\n  animation: rc-flip-in-y 0.6s ease-in both;\n}\n@keyframes rc-flip-in-y {\n  from { transform: perspective(400px) rotateY(90deg); opacity: 0; }\n  40%  { transform: perspective(400px) rotateY(-10deg); }\n  70%  { transform: perspective(400px) rotateY(10deg);  }\n  to   { transform: perspective(400px) rotateY(0deg);   opacity: 1; }\n}"
  },
  {
    "name": "Fade In Up",
    "className": "rc-fade-in-up",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-in-up { animation: rc-fade-in-up 0.5s ease-out both; }\n@keyframes rc-fade-in-up {\n  from { transform: translateY(30px); opacity: 0; }\n  to   { transform: translateY(0);    opacity: 1; }\n}"
  },
  {
    "name": "Fade In Down",
    "className": "rc-fade-in-down",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-in-down { animation: rc-fade-in-down 0.5s ease-out both; }\n@keyframes rc-fade-in-down {\n  from { transform: translateY(-30px); opacity: 0; }\n  to   { transform: translateY(0);    opacity: 1; }\n}"
  },
  {
    "name": "Fade In Left",
    "className": "rc-fade-in-left",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-in-left { animation: rc-fade-in-left 0.5s ease-out both; }\n@keyframes rc-fade-in-left {\n  from { transform: translateX(-30px); opacity: 0; }\n  to   { transform: translateX(0);    opacity: 1; }\n}"
  },
  {
    "name": "Roll In",
    "className": "rc-roll-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-roll-in { animation: rc-roll-in 0.65s ease-out both; }\n@keyframes rc-roll-in {\n  from { transform: rotateX(90deg) translateZ(-100px); opacity: 0; }\n  to   { transform: rotateX(0deg)   translateZ(0);      opacity: 1; }\n}"
  },
  {
    "name": "Light Speed In",
    "className": "rc-light-speed-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-light-speed-in { animation: rc-light-speed-in 0.6s ease-out both; }\n@keyframes rc-light-speed-in {\n  0%   { transform: translateX(100%) skewX(-30deg); opacity: 0; }\n  60%  { transform: skewX(20deg);                    opacity: 1; }\n  80%  { transform: skewX(-5deg); }\n  100% { transform: translateX(0) skewX(0deg);      opacity: 1; }\n}"
  },
  {
    "name": "Rotate In",
    "className": "rc-rotate-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-rotate-in { animation: rc-rotate-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-rotate-in {\n  from { transform: rotate(-200deg) scale(0); opacity: 0; }\n  to   { transform: rotate(0deg)     scale(1); opacity: 1; }\n}"
  },
  {
    "name": "Rotate In Down Left",
    "className": "rc-rotate-in-down-left",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-rotate-in-down-left {\n  transform-origin: left bottom;\n  animation: rc-rotate-in-down-left 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes rc-rotate-in-down-left {\n  from { transform: rotate(-45deg) translateY(-100%); opacity: 0; }\n  to   { transform: rotate(0deg)   translateY(0);      opacity: 1; }\n}"
  },
  {
    "name": "Rotate In Up Right",
    "className": "rc-rotate-in-up-right",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-rotate-in-up-right {\n  transform-origin: right bottom;\n  animation: rc-rotate-in-up-right 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes rc-rotate-in-up-right {\n  from { transform: rotate(45deg) translateY(100%); opacity: 0; }\n  to   { transform: rotate(0deg)  translateY(0);     opacity: 1; }\n}"
  },
  {
    "name": "Fade In Scale",
    "className": "rc-fade-in-scale",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-in-scale { animation: rc-fade-in-scale 0.6s ease-out both; }\n@keyframes rc-fade-in-scale {\n  from { transform: scale(0.8); filter: blur(4px); opacity: 0; }\n  to   { transform: scale(1);   filter: blur(0);   opacity: 1; }\n}"
  },
  {
    "name": "Drop In",
    "className": "rc-drop-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-drop-in { animation: rc-drop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }\n@keyframes rc-drop-in {\n  0%   { transform: translateY(-300px); opacity: 0; }\n  60%  { transform: translateY(20px);   opacity: 1; }\n  80%  { transform: translateY(-10px); }\n  100% { transform: translateY(0);     opacity: 1; }\n}"
  },
  {
    "name": "Expand In",
    "className": "rc-expand-in",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-expand-in { animation: rc-expand-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n@keyframes rc-expand-in {\n  from { transform: scaleX(0) scaleY(0); opacity: 0; }\n  to   { transform: scaleX(1) scaleY(1); opacity: 1; }\n}"
  },
  {
    "name": "Fade Out",
    "className": "rc-fade-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-out { animation: rc-fade-out 0.6s ease-in both; }\n@keyframes rc-fade-out {\n  from { opacity: 1; }\n  to   { opacity: 0; }\n}"
  },
  {
    "name": "Slide Out Up",
    "className": "rc-slide-out-up",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-out-up { animation: rc-slide-out-up 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n@keyframes rc-slide-out-up {\n  from { transform: translateY(0);    opacity: 1; }\n  to   { transform: translateY(-100%); opacity: 0; }\n}"
  },
  {
    "name": "Slide Out Down",
    "className": "rc-slide-out-down",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-out-down { animation: rc-slide-out-down 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n@keyframes rc-slide-out-down {\n  from { transform: translateY(0);    opacity: 1; }\n  to   { transform: translateY(100%); opacity: 0; }\n}"
  },
  {
    "name": "Slide Out Left",
    "className": "rc-slide-out-left",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-out-left { animation: rc-slide-out-left 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n@keyframes rc-slide-out-left {\n  from { transform: translateX(0);    opacity: 1; }\n  to   { transform: translateX(-100%); opacity: 0; }\n}"
  },
  {
    "name": "Slide Out Right",
    "className": "rc-slide-out-right",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-slide-out-right { animation: rc-slide-out-right 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n@keyframes rc-slide-out-right {\n  from { transform: translateX(0);    opacity: 1; }\n  to   { transform: translateX(100%); opacity: 0; }\n}"
  },
  {
    "name": "Zoom Out",
    "className": "rc-zoom-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-zoom-out { animation: rc-zoom-out 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n@keyframes rc-zoom-out {\n  from { transform: scale(1);   opacity: 1; }\n  to   { transform: scale(0);   opacity: 0; }\n}"
  },
  {
    "name": "Flip Out X",
    "className": "rc-flip-out-x",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-flip-out-x {\n  backface-visibility: hidden;\n  animation: rc-flip-out-x 0.6s ease-in both;\n}\n@keyframes rc-flip-out-x {\n  from { transform: perspective(400px) rotateX(0deg);   opacity: 1; }\n  to   { transform: perspective(400px) rotateX(90deg);  opacity: 0; }\n}"
  },
  {
    "name": "Flip Out Y",
    "className": "rc-flip-out-y",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-flip-out-y {\n  backface-visibility: hidden;\n  animation: rc-flip-out-y 0.6s ease-in both;\n}\n@keyframes rc-flip-out-y {\n  from { transform: perspective(400px) rotateY(0deg);   opacity: 1; }\n  to   { transform: perspective(400px) rotateY(90deg);  opacity: 0; }\n}"
  },
  {
    "name": "Light Speed Out",
    "className": "rc-light-speed-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-light-speed-out { animation: rc-light-speed-out 0.5s ease-in both; }\n@keyframes rc-light-speed-out {\n  0%   { transform: translateX(0) skewX(0deg);   opacity: 1; }\n  100% { transform: translateX(100%) skewX(30deg); opacity: 0; }\n}"
  },
  {
    "name": "Roll Out",
    "className": "rc-roll-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-roll-out { animation: rc-roll-out 0.65s ease-in both; }\n@keyframes rc-roll-out {\n  from { transform: rotateX(0deg)   translateZ(0);      opacity: 1; }\n  to   { transform: rotateX(90deg)  translateZ(-100px); opacity: 0; }\n}"
  },
  {
    "name": "Rotate Out",
    "className": "rc-rotate-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-rotate-out { animation: rc-rotate-out 0.7s ease-in both; }\n@keyframes rc-rotate-out {\n  from { transform: rotate(0deg)  scale(1); opacity: 1; }\n  to   { transform: rotate(200deg) scale(0); opacity: 0; }\n}"
  },
  {
    "name": "Fade Out Scale",
    "className": "rc-fade-out-scale",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fade-out-scale { animation: rc-fade-out-scale 0.5s ease-in both; }\n@keyframes rc-fade-out-scale {\n  from { transform: scale(1);   filter: blur(0);   opacity: 1; }\n  to   { transform: scale(1.2); filter: blur(4px); opacity: 0; }\n}"
  },
  {
    "name": "Shrink Out",
    "className": "rc-shrink-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-shrink-out { animation: rc-shrink-out 0.5s ease-in both; }\n@keyframes rc-shrink-out {\n  from { transform: scale(1); opacity: 1; }\n  to   { transform: scale(0); opacity: 0; }\n}"
  },
  {
    "name": "Fold Out",
    "className": "rc-fold-out",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fold-out {\n  transform-origin: left center;\n  animation: rc-fold-out 0.55s ease-in both;\n}\n@keyframes rc-fold-out {\n  from { transform: perspective(400px) rotateY(0deg);  opacity: 1; }\n  to   { transform: perspective(400px) rotateY(90deg); opacity: 0; }\n}"
  },
  {
    "name": "Fly Out Up",
    "className": "rc-fly-out-up",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-fly-out-up { animation: rc-fly-out-up 0.4s ease-in both; }\n@keyframes rc-fly-out-up {\n  from { transform: translateY(0);     opacity: 1; }\n  to   { transform: translateY(-200%); opacity: 0; }\n}"
  },
  {
    "name": "Bounce",
    "className": "rc-bounce",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-bounce { animation: rc-bounce 1s ease infinite; }\n@keyframes rc-bounce {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40%  { transform: translateY(-20px); }\n  60%  { transform: translateY(-10px); }\n}"
  },
  {
    "name": "Pulse",
    "className": "rc-pulse",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-pulse { animation: rc-pulse 1.2s ease-in-out infinite; }\n@keyframes rc-pulse {\n  0%   { transform: scale(1); }\n  50%  { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}"
  },
  {
    "name": "Shake",
    "className": "rc-shake",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-shake { animation: rc-shake 0.6s ease-in-out infinite; }\n@keyframes rc-shake {\n  0%, 100% { transform: translateX(0); }\n  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }\n  20%, 40%, 60%, 80%     { transform: translateX(6px); }\n}"
  },
  {
    "name": "Swing",
    "className": "rc-swing",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-swing {\n  transform-origin: top center;\n  animation: rc-swing 1s ease-in-out infinite;\n}\n@keyframes rc-swing {\n  20%  { transform: rotate(15deg); }\n  40%  { transform: rotate(-10deg); }\n  60%  { transform: rotate(5deg); }\n  80%  { transform: rotate(-5deg); }\n  100% { transform: rotate(0deg); }\n}"
  },
  {
    "name": "Tada",
    "className": "rc-tada",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-tada { animation: rc-tada 1s ease-in-out infinite; }\n@keyframes rc-tada {\n  0%   { transform: scale(1) rotate(0deg); }\n  10%, 20% { transform: scale(0.9) rotate(-3deg); }\n  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }\n  40%, 60%, 80%     { transform: scale(1.1) rotate(-3deg); }\n  100% { transform: scale(1) rotate(0deg); }\n}"
  },
  {
    "name": "Wobble",
    "className": "rc-wobble",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-wobble { animation: rc-wobble 0.8s ease-in-out infinite; }\n@keyframes rc-wobble {\n  0%   { transform: translateX(0) rotate(0deg); }\n  15%  { transform: translateX(-15px) rotate(-5deg); }\n  30%  { transform: translateX(12px)  rotate(3deg); }\n  45%  { transform: translateX(-8px)  rotate(-3deg); }\n  60%  { transform: translateX(5px)   rotate(2deg); }\n  75%  { transform: translateX(-3px)  rotate(-1deg); }\n  100% { transform: translateX(0)    rotate(0deg); }\n}"
  },
  {
    "name": "Heartbeat",
    "className": "rc-heartbeat",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-heartbeat { animation: rc-heartbeat 1.3s ease-in-out infinite; }\n@keyframes rc-heartbeat {\n  0%   { transform: scale(1); }\n  14%  { transform: scale(1.15); }\n  28%  { transform: scale(1); }\n  42%  { transform: scale(1.15); }\n  70%  { transform: scale(1); }\n}"
  },
  {
    "name": "Shake X",
    "className": "rc-shake-x",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-shake-x { animation: rc-shake-x 0.5s ease-in-out infinite; }\n@keyframes rc-shake-x {\n  0%, 100% { transform: translateX(0); }\n  10%, 50%, 90% { transform: translateX(-8px); }\n  30%, 70%     { transform: translateX(8px); }\n}"
  },
  {
    "name": "Shake Y",
    "className": "rc-shake-y",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-shake-y { animation: rc-shake-y 0.5s ease-in-out infinite; }\n@keyframes rc-shake-y {\n  0%, 100% { transform: translateY(0); }\n  10%, 50%, 90% { transform: translateY(-8px); }\n  30%, 70%     { transform: translateY(8px); }\n}"
  },
  {
    "name": "Jelly",
    "className": "rc-jelly",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-jelly { animation: rc-jelly 0.9s ease-in-out infinite; }\n@keyframes rc-jelly {\n  0%   { transform: scale(1, 1); }\n  25%  { transform: scale(1.25, 0.75); }\n  50%  { transform: scale(0.9, 1.1); }\n  75%  { transform: scale(1.05, 0.95); }\n  100% { transform: scale(1, 1); }\n}"
  },
  {
    "name": "Rubber Band",
    "className": "rc-rubber-band",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-rubber-band { animation: rc-rubber-band 1s ease-in-out infinite; }\n@keyframes rc-rubber-band {\n  0%   { transform: scaleX(1); }\n  20%  { transform: scaleX(1.25) scaleY(0.75); }\n  40%  { transform: scaleX(0.75) scaleY(1.25); }\n  60%  { transform: scaleX(1.15) scaleY(0.85); }\n  80%  { transform: scaleX(0.95) scaleY(1.05); }\n  100% { transform: scaleX(1)    scaleY(1); }\n}"
  },
  {
    "name": "Pulse Glow",
    "className": "rc-pulse-glow",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-pulse-glow { animation: rc-pulse-glow 1.5s ease-in-out infinite; }\n@keyframes rc-pulse-glow {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.5);\n  }\n  50% {\n    box-shadow: 0 0 20px 10px rgba(147, 51, 234, 0.2);\n  }\n}"
  },
  {
    "name": "Wiggle",
    "className": "rc-wiggle",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-wiggle { animation: rc-wiggle 0.4s ease-in-out infinite; }\n@keyframes rc-wiggle {\n  0%, 100% { transform: rotate(0deg); }\n  25%      { transform: rotate(5deg); }\n  75%      { transform: rotate(-5deg); }\n}"
  },
  {
    "name": "Jello",
    "className": "rc-jello",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-jello { animation: rc-jello 1s ease-in-out infinite; }\n@keyframes rc-jello {\n  0%, 100% { transform: skewX(0deg)    skewY(0deg); }\n  15%      { transform: skewX(-12deg)   skewY(-12deg); }\n  30%      { transform: skewX(8deg)     skewY(8deg); }\n  45%      { transform: skewX(-5deg)    skewY(-5deg); }\n  60%      { transform: skewX(3deg)     skewY(3deg); }\n  75%      { transform: skewX(-1deg)    skewY(-1deg); }\n}"
  },
  {
    "name": "Sonar",
    "className": "rc-sonar",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-sonar { animation: rc-sonar 1.6s ease-out infinite; }\n@keyframes rc-sonar {\n  0%   {\n    transform: scale(1);\n    opacity: 0.8;\n    box-shadow: 0 0 0 0 rgba(100, 100, 255, 0.6);\n  }\n  70%  {\n    transform: scale(1.1);\n    opacity: 0;\n    box-shadow: 0 0 0 20px rgba(100, 100, 255, 0);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 0;\n    box-shadow: 0 0 0 0 rgba(100, 100, 255, 0);\n  }\n}"
  },
  {
    "name": "Flash",
    "className": "rc-flash",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-flash { animation: rc-flash 1.2s ease-in-out infinite; }\n@keyframes rc-flash {\n  0%, 100% { opacity: 1; }\n  25%      { opacity: 0; }\n  50%      { opacity: 1; }\n  75%      { opacity: 0; }\n}"
  },
  {
    "name": "Strobe",
    "className": "rc-strobe",
    "category": "core-animations",
    "displayType": "box",
    "css": ".rc-strobe { animation: rc-strobe 0.6s step-end infinite; }\n@keyframes rc-strobe {\n  0%, 100% { opacity: 1; }\n  25%      { opacity: 0; }\n  50%      { opacity: 1; }\n  75%      { opacity: 0; }\n}"
  },
  {
    "name": "Glow",
    "className": "rc-hover-glow",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-glow {\n  transition: box-shadow 0.3s ease;\n}\n.rc-hover-glow:hover {\n  box-shadow: 0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.3), 0 0 45px rgba(0, 255, 136, 0.15);\n}"
  },
  {
    "name": "Scale Up",
    "className": "rc-hover-scale-up",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-scale-up {\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.rc-hover-scale-up:hover {\n  transform: scale(1.1);\n}"
  },
  {
    "name": "Scale Down",
    "className": "rc-hover-scale-down",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-scale-down {\n  transition: transform 0.3s ease;\n}\n.rc-hover-scale-down:hover {\n  transform: scale(0.9);\n}"
  },
  {
    "name": "Rotate",
    "className": "rc-hover-rotate",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-rotate {\n  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.rc-hover-rotate:hover {\n  transform: rotate(10deg);\n}"
  },
  {
    "name": "Skew",
    "className": "rc-hover-skew",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-skew {\n  transition: transform 0.3s ease;\n}\n.rc-hover-skew:hover {\n  transform: skewX(-5deg);\n}"
  },
  {
    "name": "Border Glow",
    "className": "rc-hover-border-glow",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-border-glow {\n  border: 2px solid transparent;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n}\n.rc-hover-border-glow:hover {\n  border-color: #0ff;\n  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5), inset 0 0 12px rgba(0, 255, 255, 0.1);\n}"
  },
  {
    "name": "Shadow Lift",
    "className": "rc-hover-shadow-lift",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-shadow-lift {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.rc-hover-shadow-lift:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n}"
  },
  {
    "name": "Float",
    "className": "rc-hover-float",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-float {\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}\n.rc-hover-float:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);\n}"
  },
  {
    "name": "Tilt",
    "className": "rc-hover-tilt",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-tilt {\n  transition: transform 0.3s ease;\n  transform-style: preserve-3d;\n}\n.rc-hover-tilt:hover {\n  transform: perspective(600px) rotateX(5deg) rotateY(-5deg);\n}"
  },
  {
    "name": "Ripple",
    "className": "rc-hover-ripple",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-ripple {\n  position: relative;\n  overflow: hidden;\n}\n.rc-hover-ripple::before {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.25);\n  transform: translate(-50%, -50%);\n  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;\n  z-index: 1;\n}\n.rc-hover-ripple:hover::before {\n  width: 300%;\n  height: 300%;\n  opacity: 0;\n}"
  },
  {
    "name": "Underline Grow",
    "className": "rc-hover-underline-grow",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-underline-grow {\n  position: relative;\n}\n.rc-hover-underline-grow::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  width: 0;\n  height: 2px;\n  background: linear-gradient(90deg, #667eea, #764ba2);\n  transition: width 0.35s ease, left 0.35s ease;\n}\n.rc-hover-underline-grow:hover::after {\n  width: 100%;\n  left: 0;\n}"
  },
  {
    "name": "Overlay Slide",
    "className": "rc-hover-overlay-slide",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-overlay-slide {\n  position: relative;\n  overflow: hidden;\n}\n.rc-hover-overlay-slide::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.45);\n  transition: left 0.4s ease;\n  z-index: 1;\n}\n.rc-hover-overlay-slide:hover::before {\n  left: 0;\n}"
  },
  {
    "name": "Background Slide",
    "className": "rc-hover-bg-slide",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-bg-slide {\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n}\n.rc-hover-bg-slide::before {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n  background: linear-gradient(to top, #667eea, #764ba2);\n  transition: height 0.4s ease;\n  z-index: -1;\n}\n.rc-hover-bg-slide:hover::before {\n  height: 100%;\n}"
  },
  {
    "name": "Shrink Border",
    "className": "rc-hover-shrink-border",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-shrink-border {\n  box-shadow: 0 0 0 3px #667eea;\n  transition: box-shadow 0.3s ease, transform 0.3s ease;\n}\n.rc-hover-shrink-border:hover {\n  box-shadow: 0 0 0 1px #667eea;\n  transform: scale(1.02);\n}"
  },
  {
    "name": "Expand",
    "className": "rc-hover-expand",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-expand {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.rc-hover-expand:hover {\n  transform: scale(1.05);\n  box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.25);\n}"
  },
  {
    "name": "Neon Pulse",
    "className": "rc-hover-neon-pulse",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-neon-pulse {\n  border: 2px solid transparent;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease, text-shadow 0.3s ease;\n}\n.rc-hover-neon-pulse:hover {\n  border-color: #0f0;\n  box-shadow: 0 0 8px #0f0, 0 0 20px #0f0, 0 0 40px #0f0, 0 0 80px rgba(0, 255, 0, 0.4);\n  text-shadow: 0 0 8px #0f0, 0 0 20px #0f0;\n}"
  },
  {
    "name": "Hover Fill",
    "className": "rc-hover-fill",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-fill {\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  transition: color 0.35s ease;\n}\n.rc-hover-fill::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #667eea;\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);\n  z-index: -1;\n}\n.rc-hover-fill:hover::before {\n  transform: scaleX(1);\n}\n.rc-hover-fill:hover {\n  color: #fff;\n}"
  },
  {
    "name": "Hover Swipe",
    "className": "rc-hover-swipe",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-swipe {\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  transition: color 0.35s ease;\n}\n.rc-hover-swipe::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -110%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(135deg, #f093fb, #f5576c);\n  transform: skewX(-15deg);\n  transition: left 0.5s cubic-bezier(0.65, 0, 0.35, 1);\n  z-index: -1;\n}\n.rc-hover-swipe:hover::before {\n  left: 0;\n}\n.rc-hover-swipe:hover {\n  color: #fff;\n}"
  },
  {
    "name": "Hover Shadow",
    "className": "rc-hover-shadow",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-shadow {\n  transition: box-shadow 0.4s ease;\n}\n.rc-hover-shadow:hover {\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.07),\n    0 2px 4px rgba(0, 0, 0, 0.07),\n    0 4px 8px rgba(0, 0, 0, 0.07),\n    0 8px 16px rgba(0, 0, 0, 0.07),\n    0 16px 32px rgba(0, 0, 0, 0.07),\n    0 32px 64px rgba(0, 0, 0, 0.07);\n}"
  },
  {
    "name": "Hover Blur",
    "className": "rc-hover-blur",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-blur {\n  transition: filter 0.3s ease;\n}\n.rc-hover-blur:hover {\n  filter: blur(2px) brightness(1.2) contrast(1.1);\n}"
  },
  {
    "name": "Hover Skew Reverse",
    "className": "rc-hover-skew-reverse",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-skew-reverse {\n  transform: skewX(10deg);\n  transition: transform 0.35s ease;\n}\n.rc-hover-skew-reverse:hover {\n  transform: skewX(-10deg);\n}"
  },
  {
    "name": "Hover Flip",
    "className": "rc-hover-flip",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-flip {\n  perspective: 800px;\n  transform-style: preserve-3d;\n  backface-visibility: hidden;\n  transition: transform 0.6s ease;\n}\n.rc-hover-flip:hover {\n  transform: rotateY(180deg);\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: #fff;\n}"
  },
  {
    "name": "Hover Slide Right",
    "className": "rc-hover-slide-right",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-slide-right {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.rc-hover-slide-right:hover {\n  transform: translateX(8px);\n  box-shadow: -4px 2px 12px rgba(0, 0, 0, 0.18);\n}"
  },
  {
    "name": "Hover Slide Up",
    "className": "rc-hover-slide-up",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-slide-up {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.rc-hover-slide-up:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);\n}"
  },
  {
    "name": "Hover Morph",
    "className": "rc-hover-morph",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-morph {\n  border-radius: 8px;\n  transition: border-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s ease;\n}\n.rc-hover-morph:hover {\n  border-radius: 50%;\n  transform: scale(0.95);\n}"
  },
  {
    "name": "Hover Shake",
    "className": "rc-hover-shake",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-shake:hover {\n  animation: rc-hover-shake-anim 0.5s ease;\n}\n@keyframes rc-hover-shake-anim {\n  0%, 100% { transform: translateX(0); }\n  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }\n  20%, 40%, 60%, 80% { transform: translateX(4px); }\n}"
  },
  {
    "name": "Hover Glow Text",
    "className": "rc-hover-glow-text",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-glow-text {\n  transition: text-shadow 0.3s ease, color 0.3s ease;\n}\n.rc-hover-glow-text:hover {\n  text-shadow: 0 0 8px #0ff, 0 0 16px #0ff, 0 0 32px #0ff, 0 0 64px rgba(0, 255, 255, 0.4);\n  color: #fff;\n}"
  },
  {
    "name": "Hover 3D Lift",
    "className": "rc-hover-3d-lift",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hover-3d-lift {\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n  transform-style: preserve-3d;\n}\n.rc-hover-3d-lift:hover {\n  transform: perspective(800px) rotateX(3deg) translateY(-8px);\n  box-shadow:\n    0 20px 40px rgba(0, 0, 0, 0.2),\n    0 0 12px rgba(102, 126, 234, 0.15);\n}"
  },
  {
    "name": "Gradient",
    "className": "rc-text-gradient",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-gradient {\n  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}"
  },
  {
    "name": "Shadow Pop",
    "className": "rc-text-shadow-pop",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-shadow-pop {\n  animation: rc-text-shadow-pop-anim 0.5s ease both;\n}\n@keyframes rc-text-shadow-pop-anim {\n  0% {\n    text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);\n    transform: scale(1);\n  }\n  50% {\n    text-shadow: 4px 4px 0 rgba(102, 126, 234, 0.4);\n    transform: scale(1.06);\n  }\n  100% {\n    text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);\n    transform: scale(1);\n  }\n}"
  },
  {
    "name": "Stroke",
    "className": "rc-text-stroke",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-stroke {\n  -webkit-text-stroke: 2px #667eea;\n  -webkit-text-fill-color: transparent;\n}"
  },
  {
    "name": "Glow",
    "className": "rc-text-glow",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-glow {\n  animation: rc-text-glow-anim 2s ease-in-out infinite alternate;\n}\n@keyframes rc-text-glow-anim {\n  0% { text-shadow: 0 0 5px #667eea, 0 0 10px #667eea; }\n  100% { text-shadow: 0 0 10px #667eea, 0 0 20px #667eea, 0 0 40px #764ba2; }\n}"
  },
  {
    "name": "Typewriter",
    "className": "rc-text-typewriter",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-typewriter {\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 2px solid #667eea;\n  width: 0;\n  animation:\n    rc-text-typewriter-type 3s steps(24) forwards,\n    rc-text-typewriter-cursor 0.75s step-end infinite;\n}\n@keyframes rc-text-typewriter-type {\n  0% { width: 0; }\n  100% { width: 100%; }\n}\n@keyframes rc-text-typewriter-cursor {\n  0%, 100% { border-color: #667eea; }\n  50% { border-color: transparent; }\n}"
  },
  {
    "name": "Wave",
    "className": "rc-text-wave",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-wave span {\n  display: inline-block;\n  animation: rc-text-wave-anim 1.4s ease-in-out infinite;\n}\n.rc-text-wave span:nth-child(2)  { animation-delay: 0.1s; }\n.rc-text-wave span:nth-child(3)  { animation-delay: 0.2s; }\n.rc-text-wave span:nth-child(4)  { animation-delay: 0.3s; }\n.rc-text-wave span:nth-child(5)  { animation-delay: 0.4s; }\n.rc-text-wave span:nth-child(6)  { animation-delay: 0.5s; }\n.rc-text-wave span:nth-child(7)  { animation-delay: 0.6s; }\n.rc-text-wave span:nth-child(8)  { animation-delay: 0.7s; }\n.rc-text-wave span:nth-child(9)  { animation-delay: 0.8s; }\n.rc-text-wave span:nth-child(10) { animation-delay: 0.9s; }\n.rc-text-wave span:nth-child(11) { animation-delay: 1.0s; }\n.rc-text-wave span:nth-child(12) { animation-delay: 1.1s; }\n@keyframes rc-text-wave-anim {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}"
  },
  {
    "name": "Blur In",
    "className": "rc-text-blur-in",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-blur-in {\n  animation: rc-text-blur-in-anim 1.2s ease forwards;\n}\n@keyframes rc-text-blur-in-anim {\n  0% { filter: blur(12px); opacity: 0; }\n  100% { filter: blur(0); opacity: 1; }\n}"
  },
  {
    "name": "Highlight",
    "className": "rc-text-highlight",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-highlight {\n  background: linear-gradient(to right, rgba(102, 126, 234, 0.3) 50%, transparent 50%);\n  background-size: 200% 100%;\n  background-position: 100% 0;\n  display: inline;\n  animation: rc-text-highlight-anim 1.5s ease forwards;\n}\n@keyframes rc-text-highlight-anim {\n  0% { background-position: 100% 0; }\n  100% { background-position: 0 0; }\n}"
  },
  {
    "name": "Underline Slide",
    "className": "rc-text-underline-slide",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-underline-slide {\n  position: relative;\n  display: inline-block;\n}\n.rc-text-underline-slide::after {\n  content: '';\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background: #667eea;\n  transform: scaleX(0);\n  transform-origin: right;\n  animation: rc-text-underline-slide-anim 0.8s ease forwards 0.3s;\n}\n@keyframes rc-text-underline-slide-anim {\n  0% { transform: scaleX(0); transform-origin: right; }\n  100% { transform: scaleX(1); transform-origin: left; }\n}"
  },
  {
    "name": "Blink",
    "className": "rc-text-blink",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-blink {\n  animation: rc-text-blink-anim 1s step-end infinite;\n}\n@keyframes rc-text-blink-anim {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0; }\n}"
  },
  {
    "name": "Text Scramble",
    "className": "rc-text-scramble",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-scramble span {\n  display: inline-block;\n  opacity: 0;\n  animation: rc-text-scramble-anim 0.35s ease forwards;\n}\n.rc-text-scramble span:nth-child(1)  { animation-delay: 0.04s; }\n.rc-text-scramble span:nth-child(2)  { animation-delay: 0.08s; }\n.rc-text-scramble span:nth-child(3)  { animation-delay: 0.12s; }\n.rc-text-scramble span:nth-child(4)  { animation-delay: 0.16s; }\n.rc-text-scramble span:nth-child(5)  { animation-delay: 0.20s; }\n.rc-text-scramble span:nth-child(6)  { animation-delay: 0.24s; }\n.rc-text-scramble span:nth-child(7)  { animation-delay: 0.28s; }\n.rc-text-scramble span:nth-child(8)  { animation-delay: 0.32s; }\n.rc-text-scramble span:nth-child(9)  { animation-delay: 0.36s; }\n.rc-text-scramble span:nth-child(10) { animation-delay: 0.40s; }\n.rc-text-scramble span:nth-child(11) { animation-delay: 0.44s; }\n.rc-text-scramble span:nth-child(12) { animation-delay: 0.48s; }\n.rc-text-scramble span:nth-child(13) { animation-delay: 0.52s; }\n.rc-text-scramble span:nth-child(14) { animation-delay: 0.56s; }\n.rc-text-scramble span:nth-child(15) { animation-delay: 0.60s; }\n.rc-text-scramble span:nth-child(16) { animation-delay: 0.64s; }\n@keyframes rc-text-scramble-anim {\n  0%   { opacity: 0; transform: translateY(-8px); }\n  25%  { opacity: 0.6; transform: translateY(2px); }\n  50%  { opacity: 0.2; transform: translateY(-4px); }\n  75%  { opacity: 0.8; transform: translateY(1px); }\n  100% { opacity: 1; transform: translateY(0); }\n}"
  },
  {
    "name": "Text 3D",
    "className": "rc-text-3d",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-3d {\n  color: #444;\n  text-shadow:\n    1px 1px 0 #e0e0e0,\n    2px 2px 0 #d0d0d0,\n    3px 3px 0 #c0c0c0,\n    4px 4px 0 #b0b0b0,\n    5px 5px 0 #a0a0a0,\n    6px 6px 0 #909090,\n    7px 7px 5px rgba(0, 0, 0, 0.25);\n}"
  },
  {
    "name": "Text Neon Flicker",
    "className": "rc-text-neon-flicker",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-neon-flicker {\n  color: #fff;\n  animation: rc-text-neon-flicker-anim 4s infinite alternate;\n}\n@keyframes rc-text-neon-flicker-anim {\n  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {\n    text-shadow:\n      0 0 4px #ff0,\n      0 0 11px #ff0,\n      0 0 19px #ff0,\n      0 0 40px #ff00de,\n      0 0 80px #ff00de;\n  }\n  20%, 24%, 55% {\n    text-shadow: none;\n  }\n}"
  },
  {
    "name": "Text Rainbow",
    "className": "rc-text-rainbow",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-rainbow {\n  background: linear-gradient(\n    90deg,\n    #ff0000, #ff8800, #ffff00,\n    #00ff00, #0088ff, #8800ff,\n    #ff0088, #ff0000\n  );\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: rc-text-rainbow-anim 3s linear infinite;\n}\n@keyframes rc-text-rainbow-anim {\n  0%   { background-position: 0% center; }\n  100% { background-position: 200% center; }\n}"
  },
  {
    "name": "Text Slide Up",
    "className": "rc-text-slide-up",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-slide-up span {\n  display: inline-block;\n  opacity: 0;\n  transform: translateY(100%);\n  animation: rc-text-slide-up-anim 0.5s ease forwards;\n}\n.rc-text-slide-up span:nth-child(1)  { animation-delay: 0.05s; }\n.rc-text-slide-up span:nth-child(2)  { animation-delay: 0.10s; }\n.rc-text-slide-up span:nth-child(3)  { animation-delay: 0.15s; }\n.rc-text-slide-up span:nth-child(4)  { animation-delay: 0.20s; }\n.rc-text-slide-up span:nth-child(5)  { animation-delay: 0.25s; }\n.rc-text-slide-up span:nth-child(6)  { animation-delay: 0.30s; }\n.rc-text-slide-up span:nth-child(7)  { animation-delay: 0.35s; }\n.rc-text-slide-up span:nth-child(8)  { animation-delay: 0.40s; }\n.rc-text-slide-up span:nth-child(9)  { animation-delay: 0.45s; }\n.rc-text-slide-up span:nth-child(10) { animation-delay: 0.50s; }\n.rc-text-slide-up span:nth-child(11) { animation-delay: 0.55s; }\n.rc-text-slide-up span:nth-child(12) { animation-delay: 0.60s; }\n@keyframes rc-text-slide-up-anim {\n  0% {\n    opacity: 0;\n    transform: translateY(100%);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}"
  },
  {
    "name": "Text Glitch",
    "className": "rc-text-glitch",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-glitch {\n  position: relative;\n  display: inline-block;\n}\n.rc-text-glitch::before,\n.rc-text-glitch::after {\n  content: attr(data-text);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n.rc-text-glitch::before {\n  color: #ff0;\n  animation: rc-text-glitch-1 2s infinite linear alternate-reverse;\n}\n.rc-text-glitch::after {\n  color: #0ff;\n  animation: rc-text-glitch-2 2s infinite linear alternate-reverse;\n}\n@keyframes rc-text-glitch-1 {\n  0%   { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 0); }\n  20%  { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }\n  40%  { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 0); }\n  60%  { clip-path: inset(70% 0 5% 0);  transform: translate(2px, 0); }\n  80%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }\n  100% { clip-path: inset(50% 0 20% 0); transform: translate(3px, 0); }\n}\n@keyframes rc-text-glitch-2 {\n  0%   { clip-path: inset(70% 0 10% 0); transform: translate(3px, 0); }\n  20%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }\n  40%  { clip-path: inset(50% 0 20% 0); transform: translate(2px, 0); }\n  60%  { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }\n  80%  { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }\n  100% { clip-path: inset(30% 0 40% 0); transform: translate(-3px, 0); }\n}"
  },
  {
    "name": "Text Reveal",
    "className": "rc-text-reveal",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-reveal {\n  overflow: hidden;\n  display: inline-block;\n}\n.rc-text-reveal span {\n  display: inline-block;\n  transform: translateY(110%);\n  animation: rc-text-reveal-anim 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n}\n.rc-text-reveal span:nth-child(1)  { animation-delay: 0.05s; }\n.rc-text-reveal span:nth-child(2)  { animation-delay: 0.10s; }\n.rc-text-reveal span:nth-child(3)  { animation-delay: 0.15s; }\n.rc-text-reveal span:nth-child(4)  { animation-delay: 0.20s; }\n.rc-text-reveal span:nth-child(5)  { animation-delay: 0.25s; }\n.rc-text-reveal span:nth-child(6)  { animation-delay: 0.30s; }\n.rc-text-reveal span:nth-child(7)  { animation-delay: 0.35s; }\n.rc-text-reveal span:nth-child(8)  { animation-delay: 0.40s; }\n.rc-text-reveal span:nth-child(9)  { animation-delay: 0.45s; }\n.rc-text-reveal span:nth-child(10) { animation-delay: 0.50s; }\n@keyframes rc-text-reveal-anim {\n  0% {\n    transform: translateY(110%);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}"
  },
  {
    "name": "Text Bounce",
    "className": "rc-text-bounce",
    "category": "text",
    "displayType": "text",
    "css": ".rc-text-bounce span {\n  display: inline-block;\n  animation: rc-text-bounce-anim 0.6s ease;\n  animation-fill-mode: both;\n}\n.rc-text-bounce span:nth-child(1)  { animation-delay: 0.00s; }\n.rc-text-bounce span:nth-child(2)  { animation-delay: 0.06s; }\n.rc-text-bounce span:nth-child(3)  { animation-delay: 0.12s; }\n.rc-text-bounce span:nth-child(4)  { animation-delay: 0.18s; }\n.rc-text-bounce span:nth-child(5)  { animation-delay: 0.24s; }\n.rc-text-bounce span:nth-child(6)  { animation-delay: 0.30s; }\n.rc-text-bounce span:nth-child(7)  { animation-delay: 0.36s; }\n.rc-text-bounce span:nth-child(8)  { animation-delay: 0.42s; }\n.rc-text-bounce span:nth-child(9)  { animation-delay: 0.48s; }\n.rc-text-bounce span:nth-child(10) { animation-delay: 0.54s; }\n.rc-text-bounce span:nth-child(11) { animation-delay: 0.60s; }\n.rc-text-bounce span:nth-child(12) { animation-delay: 0.66s; }\n@keyframes rc-text-bounce-anim {\n  0%   { transform: translateY(0); }\n  25%  { transform: translateY(-16px); }\n  50%  { transform: translateY(0); }\n  70%  { transform: translateY(-6px); }\n  100% { transform: translateY(0); }\n}"
  },
  {
    "name": "Gradient Shift",
    "className": "rc-bg-gradient-shift",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-gradient-shift {\n  background: linear-gradient(-45deg, #a855f7, #ec4899, #f97316, #06b6d4);\n  background-size: 400% 400%;\n  animation: rc-bg-gradient-shift 8s ease infinite;\n}\n@keyframes rc-bg-gradient-shift {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}"
  },
  {
    "name": "Mesh Gradient",
    "className": "rc-bg-mesh",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-mesh {\n  background:\n    radial-gradient(at 40% 20%, #a855f7 0px, transparent 50%),\n    radial-gradient(at 80% 0%, #ec4899 0px, transparent 50%),\n    radial-gradient(at 0% 50%, #06b6d4 0px, transparent 50%),\n    radial-gradient(at 80% 50%, #f97316 0px, transparent 50%),\n    radial-gradient(at 0% 100%, #10b981 0px, transparent 50%),\n    radial-gradient(at 80% 100%, #ef4444 0px, transparent 50%);\n  background-color: #1a1a2e;\n  background-size: 200% 200%;\n  animation: rc-mesh-bg 10s ease infinite;\n}\n@keyframes rc-mesh-bg {\n  0% { background-position: 0% 0%, 100% 0%, 0% 50%, 100% 50%, 0% 100%, 100% 100%; }\n  50% { background-position: 100% 0%, 0% 50%, 100% 50%, 0% 100%, 100% 100%, 0% 0%; }\n  100% { background-position: 0% 0%, 100% 0%, 0% 50%, 100% 50%, 0% 100%, 100% 100%; }\n}"
  },
  {
    "name": "Animated Dots",
    "className": "rc-bg-dots",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-dots {\n  background-color: #1a1a2e;\n  background-image: radial-gradient(#a855f7 1.5px, transparent 1.5px);\n  background-size: 20px 20px;\n}"
  },
  {
    "name": "Striped",
    "className": "rc-bg-striped",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-striped {\n  background: repeating-linear-gradient(\n    -45deg,\n    #1a1a2e,\n    #1a1a2e 10px,\n    #2a1a4e 10px,\n    #2a1a4e 20px\n  );\n  background-size: 28.28px 28.28px;\n  animation: rc-bg-stripes-move 1s linear infinite;\n}\n@keyframes rc-bg-stripes-move {\n  0% { background-position: 0 0; }\n  100% { background-position: 28.28px 0; }\n}"
  },
  {
    "name": "Checkerboard",
    "className": "rc-bg-checkerboard",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-checkerboard {\n  background-color: #1a1a2e;\n  background-image:\n    linear-gradient(45deg, #2a1a4e 25%, transparent 25%, transparent 75%, #2a1a4e 75%),\n    linear-gradient(45deg, #2a1a4e 25%, transparent 25%, transparent 75%, #2a1a4e 75%);\n  background-size: 40px 40px;\n  background-position: 0 0, 20px 20px;\n}"
  },
  {
    "name": "Radial Pulse",
    "className": "rc-bg-radial-pulse",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-radial-pulse {\n  background: radial-gradient(circle at center, #a855f7 0%, #302b63 50%, #0f0c29 100%);\n  background-size: 100% 100%;\n  animation: rc-bg-radial-pulse 3s ease-in-out infinite;\n}\n@keyframes rc-bg-radial-pulse {\n  0%, 100% { background-size: 100% 100%; }\n  50% { background-size: 150% 150%; }\n}"
  },
  {
    "name": "Noise Texture",
    "className": "rc-bg-noise-texture",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-noise-texture {\n  background-color: #1a1a2e;\n  position: relative;\n}\n.rc-bg-noise-texture::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  opacity: 0.08;\n  background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");\n  background-repeat: repeat;\n  background-size: 256px 256px;\n  pointer-events: none;\n}"
  },
  {
    "name": "Aurora",
    "className": "rc-bg-aurora",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-aurora {\n  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);\n  position: relative;\n  overflow: hidden;\n}\n.rc-bg-aurora::before {\n  content: '';\n  position: absolute;\n  top: -50%; left: -50%;\n  width: 200%; height: 200%;\n  background:\n    radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, transparent 50%),\n    radial-gradient(ellipse at 30% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),\n    radial-gradient(ellipse at 70% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%);\n  animation: rc-aurora-bg 8s ease infinite;\n}\n@keyframes rc-aurora-bg {\n  0% { transform: translate(0, 0) rotate(0deg); }\n  33% { transform: translate(30px, -30px) rotate(5deg); }\n  66% { transform: translate(-20px, 20px) rotate(-3deg); }\n  100% { transform: translate(0, 0) rotate(0deg); }\n}"
  },
  {
    "name": "Background Liquid",
    "className": "rc-bg-liquid",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-liquid {\n  background: linear-gradient(135deg, #a855f7, #06b6d4, #ec4899, #a855f7);\n  background-size: 200% 200%;\n  animation: rc-bg-liquid 6s ease infinite;\n}\n@keyframes rc-bg-liquid {\n  0% { background-position: 0% 0%; }\n  25% { background-position: 100% 0%; }\n  50% { background-position: 100% 100%; }\n  75% { background-position: 0% 100%; }\n  100% { background-position: 0% 0%; }\n}"
  },
  {
    "name": "Background Waves",
    "className": "rc-bg-waves",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-waves {\n  background:\n    radial-gradient(ellipse at 50% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 60%),\n    radial-gradient(ellipse at 30% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),\n    radial-gradient(ellipse at 70% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),\n    radial-gradient(ellipse at 50% 90%, rgba(168, 85, 247, 0.2) 0%, transparent 55%),\n    linear-gradient(180deg, #0f0c29 0%, #1a1a4e 100%);\n  background-size: 100% 200%, 80% 150%, 80% 150%, 100% 200%, 100% 100%;\n  animation: rc-bg-waves 5s ease-in-out infinite;\n}\n@keyframes rc-bg-waves {\n  0%, 100% { background-position: 50% 0%, 20% 50%, 80% 50%, 50% 0%, center; }\n  50% { background-position: 50% 10%, 30% 40%, 70% 60%, 50% 15%, center; }\n}"
  },
  {
    "name": "Background Plasma",
    "className": "rc-bg-plasma",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-plasma {\n  background:\n    radial-gradient(circle at 20% 50%, #a855f7 0%, transparent 50%),\n    radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%),\n    radial-gradient(circle at 50% 80%, #06b6d4 0%, transparent 50%),\n    linear-gradient(135deg, #1a1a2e, #0f0c29);\n  background-size: 100% 100%;\n  animation: rc-bg-plasma 4s linear infinite;\n  filter: hue-rotate(0deg);\n}\n@keyframes rc-bg-plasma {\n  0% { filter: hue-rotate(0deg); background-position: 0% 0%, 100% 0%, 50% 100%, center; }\n  33% { filter: hue-rotate(120deg); background-position: 100% 100%, 0% 100%, 0% 0%, center; }\n  66% { filter: hue-rotate(240deg); background-position: 100% 0%, 0% 0%, 100% 100%, center; }\n  100% { filter: hue-rotate(360deg); background-position: 0% 0%, 100% 0%, 50% 100%, center; }\n}"
  },
  {
    "name": "Background Matrix Rain",
    "className": "rc-bg-matrix",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-matrix {\n  background-color: #0a0a0a;\n  position: relative;\n  overflow: hidden;\n}\n.rc-bg-matrix::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      0deg,\n      transparent,\n      transparent 2px,\n      rgba(16, 185, 129, 0.03) 2px,\n      rgba(16, 185, 129, 0.03) 4px\n    );\n  animation: rc-matrix-scroll 20s linear infinite;\n}\n.rc-bg-matrix::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      transparent,\n      transparent 24px,\n      rgba(16, 185, 129, 0.06) 24px,\n      rgba(16, 185, 129, 0.06) 25px\n    ),\n    repeating-linear-gradient(\n      0deg,\n      transparent,\n      transparent 24px,\n      rgba(16, 185, 129, 0.06) 24px,\n      rgba(16, 185, 129, 0.06) 25px\n    );\n}\n@keyframes rc-matrix-scroll {\n  0% { transform: translateY(0); }\n  100% { transform: translateY(4px); }\n}"
  },
  {
    "name": "Background Starfield",
    "className": "rc-bg-starfield",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-starfield {\n  background: #0a0a1a;\n  position: relative;\n  overflow: hidden;\n}\n.rc-bg-starfield::before {\n  content: '';\n  position: absolute;\n  width: 2px; height: 2px;\n  background: transparent;\n  box-shadow:\n    25px 15px 0 0 rgba(255,255,255,0.8),\n    80px 40px 0 0 rgba(255,255,255,0.5),\n    150px 10px 0 0 rgba(168,85,247,0.7),\n    200px 60px 0 0 rgba(255,255,255,0.6),\n    50px 90px 0 0 rgba(6,182,212,0.7),\n    120px 70px 0 0 rgba(255,255,255,0.4),\n    180px 30px 0 0 rgba(236,72,153,0.6),\n    30px 50px 0 0 rgba(255,255,255,0.9),\n    90px 85px 0 0 rgba(255,255,255,0.5),\n    160px 95px 0 0 rgba(168,85,247,0.8),\n    70px 25px 0 0 rgba(255,255,255,0.6),\n    220px 50px 0 0 rgba(6,182,212,0.5),\n    10px 70px 0 0 rgba(255,255,255,0.7),\n    140px 45px 0 0 rgba(236,72,153,0.6),\n    190px 80px 0 0 rgba(255,255,255,0.4),\n    60px 100px 0 0 rgba(255,255,255,0.8);\n  animation: rc-starfield-move 8s linear infinite;\n}\n@keyframes rc-starfield-move {\n  0% { transform: translateY(0); }\n  100% { transform: translateY(-100px); }\n}"
  },
  {
    "name": "Background Smoke",
    "className": "rc-bg-smoke",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-smoke {\n  background: linear-gradient(135deg, #1a1a2e, #0f0c29);\n  position: relative;\n  overflow: hidden;\n}\n.rc-bg-smoke::before,\n.rc-bg-smoke::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n}\n.rc-bg-smoke::before {\n  width: 200px; height: 200px;\n  background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%);\n  top: -50px; left: -50px;\n  animation: rc-smoke-drift1 10s ease-in-out infinite;\n}\n.rc-bg-smoke::after {\n  width: 250px; height: 250px;\n  background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%);\n  bottom: -70px; right: -70px;\n  animation: rc-smoke-drift2 12s ease-in-out infinite;\n}\n@keyframes rc-smoke-drift1 {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(60px, 30px) scale(1.2); }\n  50% { transform: translate(20px, 60px) scale(1); }\n  75% { transform: translate(80px, 20px) scale(1.1); }\n}\n@keyframes rc-smoke-drift2 {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  33% { transform: translate(-50px, -40px) scale(1.15); }\n  66% { transform: translate(-30px, -60px) scale(0.95); }\n}"
  },
  {
    "name": "Background Circuit",
    "className": "rc-bg-circuit",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-circuit {\n  background-color: #0a0f1a;\n  position: relative;\n  overflow: hidden;\n}\n.rc-bg-circuit::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      0deg,\n      transparent,\n      transparent 19px,\n      rgba(6, 182, 212, 0.12) 19px,\n      rgba(6, 182, 212, 0.12) 20px\n    ),\n    repeating-linear-gradient(\n      90deg,\n      transparent,\n      transparent 39px,\n      rgba(6, 182, 212, 0.12) 39px,\n      rgba(6, 182, 212, 0.12) 40px\n    );\n  animation: rc-circuit-scan 3s linear infinite;\n}\n.rc-bg-circuit::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(circle at 40px 20px, rgba(6, 182, 212, 0.25) 3px, transparent 3px),\n    radial-gradient(circle at 120px 60px, rgba(168, 85, 247, 0.25) 3px, transparent 3px),\n    radial-gradient(circle at 200px 40px, rgba(6, 182, 212, 0.25) 3px, transparent 3px),\n    radial-gradient(circle at 80px 80px, rgba(168, 85, 247, 0.25) 3px, transparent 3px),\n    radial-gradient(circle at 160px 100px, rgba(6, 182, 212, 0.25) 3px, transparent 3px);\n  animation: rc-circuit-nodes 4s ease-in-out infinite alternate;\n}\n@keyframes rc-circuit-scan {\n  0% { transform: translateY(0); }\n  100% { transform: translateY(20px); }\n}\n@keyframes rc-circuit-nodes {\n  0% { opacity: 0.5; }\n  100% { opacity: 1; }\n}"
  },
  {
    "name": "Background Lava Lamp",
    "className": "rc-bg-lava",
    "category": "backgrounds",
    "displayType": "bg",
    "css": ".rc-bg-lava {\n  background: linear-gradient(180deg, #1a0a2e, #0f0c29);\n  position: relative;\n  overflow: hidden;\n}\n.rc-bg-lava::before,\n.rc-bg-lava::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(40px);\n}\n.rc-bg-lava::before {\n  width: 80px; height: 120px;\n  background: radial-gradient(ellipse, rgba(236, 72, 153, 0.6) 0%, rgba(168, 85, 247, 0.2) 60%, transparent 100%);\n  left: 30%; bottom: -20%;\n  animation: rc-lava-rise1 5s ease-in-out infinite;\n}\n.rc-bg-lava::after {\n  width: 60px; height: 100px;\n  background: radial-gradient(ellipse, rgba(249, 115, 22, 0.5) 0%, rgba(236, 72, 153, 0.2) 60%, transparent 100%);\n  left: 60%; bottom: -20%;\n  animation: rc-lava-rise2 6s ease-in-out infinite;\n  animation-delay: -2s;\n}\n@keyframes rc-lava-rise1 {\n  0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.8; }\n  25% { transform: translateY(-80px) scaleX(1.3) scaleY(0.8); opacity: 1; }\n  50% { transform: translateY(-160px) scaleX(0.7) scaleY(1.2); opacity: 0.6; }\n  75% { transform: translateY(-120px) scaleX(1.2) scaleY(0.9); opacity: 0.4; }\n  100% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.8; }\n}\n@keyframes rc-lava-rise2 {\n  0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.7; }\n  30% { transform: translateY(-100px) scaleX(1.4) scaleY(0.7); opacity: 1; }\n  60% { transform: translateY(-180px) scaleX(0.6) scaleY(1.3); opacity: 0.5; }\n  80% { transform: translateY(-80px) scaleX(1.1) scaleY(1); opacity: 0.3; }\n  100% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.7; }\n}"
  },
  {
    "name": "Spinner",
    "className": "rc-loader-spinner",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-spinner {\n  width: 40px; height: 40px;\n  border: 4px solid rgba(168, 85, 247, 0.2);\n  border-top-color: #a855f7;\n  border-radius: 50%;\n  animation: rc-spinner 0.8s linear infinite;\n}\n@keyframes rc-spinner {\n  to { transform: rotate(360deg); }\n}"
  },
  {
    "name": "Dots",
    "className": "rc-loader-dots",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-dots {\n  display: flex; gap: 6px;\n}\n.rc-loader-dots span {\n  width: 12px; height: 12px;\n  border-radius: 50%;\n  background: #a855f7;\n  animation: rc-dots-bounce 1.2s ease-in-out infinite;\n}\n.rc-loader-dots span:nth-child(2) { animation-delay: 0.15s; }\n.rc-loader-dots span:nth-child(3) { animation-delay: 0.3s; }\n@keyframes rc-dots-bounce {\n  0%, 80%, 100% { transform: scale(0.4); opacity: 0.3; }\n  40% { transform: scale(1); opacity: 1; }\n}"
  },
  {
    "name": "Bars",
    "className": "rc-loader-bars",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-bars {\n  display: flex; gap: 4px; align-items: end; height: 40px;\n}\n.rc-loader-bars span {\n  width: 6px;\n  background: linear-gradient(to top, #a855f7, #ec4899);\n  border-radius: 3px;\n  animation: rc-bars 1s ease-in-out infinite;\n}\n.rc-loader-bars span:nth-child(1) { animation-delay: 0s; }\n.rc-loader-bars span:nth-child(2) { animation-delay: 0.1s; }\n.rc-loader-bars span:nth-child(3) { animation-delay: 0.2s; }\n.rc-loader-bars span:nth-child(4) { animation-delay: 0.3s; }\n.rc-loader-bars span:nth-child(5) { animation-delay: 0.4s; }\n@keyframes rc-bars {\n  0%, 100% { height: 10px; }\n  50% { height: 35px; }\n}"
  },
  {
    "name": "Pulse",
    "className": "rc-loader-pulse",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-pulse {\n  width: 40px; height: 40px;\n  border-radius: 50%;\n  background: #a855f7;\n  animation: rc-loader-pulse 1.2s ease-in-out infinite;\n}\n@keyframes rc-loader-pulse {\n  0%, 100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.6); }\n  50% { transform: scale(1); opacity: 1; box-shadow: 0 0 20px 10px rgba(168, 85, 247, 0); }\n}"
  },
  {
    "name": "Orbit",
    "className": "rc-loader-orbit",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-orbit {\n  width: 40px; height: 40px;\n  position: relative;\n  animation: rc-orbit-spin 2s linear infinite;\n}\n.rc-loader-orbit::before {\n  content: '';\n  position: absolute;\n  top: 0; left: 50%;\n  width: 10px; height: 10px;\n  margin-left: -5px;\n  border-radius: 50%;\n  background: #a855f7;\n  box-shadow: 0 0 10px #a855f7, 0 0 20px rgba(168, 85, 247, 0.5);\n}\n.rc-loader-orbit::after {\n  content: '';\n  position: absolute;\n  inset: 3px;\n  border: 2px dashed rgba(168, 85, 247, 0.3);\n  border-radius: 50%;\n}\n@keyframes rc-orbit-spin {\n  to { transform: rotate(360deg); }\n}"
  },
  {
    "name": "Wave",
    "className": "rc-loader-wave",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-wave {\n  display: flex; gap: 4px; align-items: center; height: 40px;\n}\n.rc-loader-wave span {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  background: #06b6d4;\n  animation: rc-wave 1.4s ease-in-out infinite;\n}\n.rc-loader-wave span:nth-child(1) { animation-delay: 0s; }\n.rc-loader-wave span:nth-child(2) { animation-delay: 0.1s; }\n.rc-loader-wave span:nth-child(3) { animation-delay: 0.2s; }\n.rc-loader-wave span:nth-child(4) { animation-delay: 0.3s; }\n.rc-loader-wave span:nth-child(5) { animation-delay: 0.4s; }\n@keyframes rc-wave {\n  0%, 60%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-15px); }\n}"
  },
  {
    "name": "DNA",
    "className": "rc-loader-dna",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-dna {\n  display: flex; gap: 2px; align-items: center; height: 50px;\n}\n.rc-loader-dna span {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  animation: rc-dna 1.5s ease-in-out infinite;\n}\n.rc-loader-dna span:nth-child(odd) { background: #a855f7; }\n.rc-loader-dna span:nth-child(even) { background: #ec4899; }\n.rc-loader-dna span:nth-child(1) { animation-delay: 0s; }\n.rc-loader-dna span:nth-child(2) { animation-delay: 0.1s; }\n.rc-loader-dna span:nth-child(3) { animation-delay: 0.2s; }\n.rc-loader-dna span:nth-child(4) { animation-delay: 0.3s; }\n.rc-loader-dna span:nth-child(5) { animation-delay: 0.4s; }\n.rc-loader-dna span:nth-child(6) { animation-delay: 0.5s; }\n.rc-loader-dna span:nth-child(7) { animation-delay: 0.6s; }\n@keyframes rc-dna {\n  0%, 100% { transform: translateY(0) scale(0.6); opacity: 0.4; }\n  50% { transform: translateY(-15px) scale(1); opacity: 1; }\n}"
  },
  {
    "name": "Circle Fade",
    "className": "rc-loader-circle-fade",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-circle-fade {\n  width: 40px; height: 40px;\n  position: relative;\n}\n.rc-loader-circle-fade span {\n  position: absolute;\n  width: 100%; height: 100%;\n  border: 3px solid transparent;\n  border-top-color: #a855f7;\n  border-radius: 50%;\n  animation: rc-circle-fade 1.2s linear infinite;\n}\n.rc-loader-circle-fade span:nth-child(2) {\n  width: 70%; height: 70%;\n  top: 15%; left: 15%;\n  border-top-color: #ec4899;\n  animation-delay: 0.15s;\n  animation-direction: reverse;\n}\n@keyframes rc-circle-fade {\n  0% { transform: rotate(0deg); opacity: 1; }\n  50% { opacity: 0.5; }\n  100% { transform: rotate(360deg); opacity: 1; }\n}"
  },
  {
    "name": "Square Spin",
    "className": "rc-loader-square-spin",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-square-spin {\n  width: 30px; height: 30px;\n  border: 3px solid #a855f7;\n  animation: rc-square-spin 1.5s ease-in-out infinite;\n}\n@keyframes rc-square-spin {\n  0% { transform: rotate(0deg); border-radius: 0; }\n  25% { transform: rotate(90deg); border-radius: 50% 0 0 0; }\n  50% { transform: rotate(180deg); border-radius: 50%; }\n  75% { transform: rotate(270deg); border-radius: 0 0 50% 0; }\n  100% { transform: rotate(360deg); border-radius: 0; }\n}"
  },
  {
    "name": "Ring",
    "className": "rc-loader-ring",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-ring {\n  width: 40px; height: 40px;\n  position: relative;\n}\n.rc-loader-ring span {\n  position: absolute;\n  inset: 0;\n  border: 3px solid transparent;\n  border-radius: 50%;\n  animation: rc-ring-spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;\n}\n.rc-loader-ring span:nth-child(1) {\n  border-top-color: #a855f7;\n  border-bottom-color: #a855f7;\n}\n.rc-loader-ring span:nth-child(2) {\n  border-left-color: #ec4899;\n  border-right-color: #ec4899;\n  animation-direction: reverse;\n}\n@keyframes rc-ring-spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}"
  },
  {
    "name": "Loader Cube",
    "className": "rc-loader-cube",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-cube {\n  width: 40px; height: 40px;\n  position: relative;\n  transform-style: preserve-3d;\n  animation: rc-cube-rotate 2s linear infinite;\n}\n.rc-loader-cube span {\n  position: absolute;\n  width: 100%; height: 100%;\n  border: 2px solid rgba(168, 85, 247, 0.6);\n  background: rgba(168, 85, 247, 0.1);\n  border-radius: 4px;\n}\n.rc-loader-cube span:nth-child(1) { transform: rotateY(0deg) translateZ(20px); }\n.rc-loader-cube span:nth-child(2) { transform: rotateY(90deg) translateZ(20px); }\n.rc-loader-cube span:nth-child(3) { transform: rotateY(180deg) translateZ(20px); }\n.rc-loader-cube span:nth-child(4) { transform: rotateY(270deg) translateZ(20px); }\n.rc-loader-cube span:nth-child(5) { transform: rotateX(90deg) translateZ(20px); }\n.rc-loader-cube span:nth-child(6) { transform: rotateX(-90deg) translateZ(20px); }\n@keyframes rc-cube-rotate {\n  0% { transform: rotateX(0deg) rotateY(0deg); }\n  100% { transform: rotateX(360deg) rotateY(360deg); }\n}"
  },
  {
    "name": "Loader Hourglass",
    "className": "rc-loader-hourglass",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-hourglass {\n  width: 40px; height: 40px;\n  position: relative;\n  animation: rc-hourglass-flip 2s ease-in-out infinite;\n}\n.rc-loader-hourglass span {\n  position: absolute;\n  left: 50%; top: 50%;\n  width: 0; height: 0;\n  transform: translate(-50%, -50%);\n}\n.rc-loader-hourglass span:nth-child(1) {\n  border-left: 16px solid transparent;\n  border-right: 16px solid transparent;\n  border-top: 20px solid #a855f7;\n  transform: translate(-50%, -50%) translateY(4px);\n}\n.rc-loader-hourglass span:nth-child(2) {\n  border-left: 16px solid transparent;\n  border-right: 16px solid transparent;\n  border-bottom: 20px solid #ec4899;\n  transform: translate(-50%, -50%) translateY(-4px);\n}\n@keyframes rc-hourglass-flip {\n  0%, 40% { transform: rotate(0deg) scale(1); }\n  50%, 90% { transform: rotate(180deg) scale(1); }\n  100% { transform: rotate(360deg) scale(1); }\n}"
  },
  {
    "name": "Loader Grid",
    "className": "rc-loader-grid",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 12px);\n  grid-template-rows: repeat(3, 12px);\n  gap: 4px;\n}\n.rc-loader-grid span {\n  width: 12px; height: 12px;\n  border-radius: 50%;\n  background: #a855f7;\n  animation: rc-grid-pop 1.4s ease-in-out infinite;\n}\n.rc-loader-grid span:nth-child(1) { animation-delay: 0s; }\n.rc-loader-grid span:nth-child(2) { animation-delay: 0.1s; }\n.rc-loader-grid span:nth-child(3) { animation-delay: 0.2s; }\n.rc-loader-grid span:nth-child(4) { animation-delay: 0.3s; }\n.rc-loader-grid span:nth-child(5) { animation-delay: 0.4s; }\n.rc-loader-grid span:nth-child(6) { animation-delay: 0.5s; }\n.rc-loader-grid span:nth-child(7) { animation-delay: 0.6s; }\n.rc-loader-grid span:nth-child(8) { animation-delay: 0.7s; }\n.rc-loader-grid span:nth-child(9) { animation-delay: 0.8s; }\n@keyframes rc-grid-pop {\n  0%, 70%, 100% { transform: scale(0.3); opacity: 0.2; }\n  35% { transform: scale(1); opacity: 1; }\n}"
  },
  {
    "name": "Loader Ripple",
    "className": "rc-loader-ripple",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-ripple {\n  width: 40px; height: 40px;\n  position: relative;\n}\n.rc-loader-ripple span {\n  position: absolute;\n  inset: 0;\n  border: 2px solid #a855f7;\n  border-radius: 50%;\n  animation: rc-ripple-expand 1.5s ease-out infinite;\n}\n.rc-loader-ripple span:nth-child(2) { animation-delay: 0.5s; }\n.rc-loader-ripple span:nth-child(3) { animation-delay: 1s; }\n@keyframes rc-ripple-expand {\n  0% { transform: scale(0.2); opacity: 1; }\n  100% { transform: scale(1.5); opacity: 0; }\n}"
  },
  {
    "name": "Loader Typing",
    "className": "rc-loader-typing",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-typing {\n  display: flex; gap: 4px; align-items: center; height: 30px;\n}\n.rc-loader-typing span {\n  width: 6px;\n  border-radius: 3px;\n  background: #a855f7;\n  animation: rc-typing-bounce 1.2s ease-in-out infinite;\n}\n.rc-loader-typing span:nth-child(1) { height: 10px; animation-delay: 0s; }\n.rc-loader-typing span:nth-child(2) { height: 20px; animation-delay: 0.15s; }\n.rc-loader-typing span:nth-child(3) { height: 14px; animation-delay: 0.3s; }\n@keyframes rc-typing-bounce {\n  0%, 60%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-8px); }\n}"
  },
  {
    "name": "Loader Pencil",
    "className": "rc-loader-pencil",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-pencil {\n  width: 8px; height: 40px;\n  position: relative;\n  animation: rc-pencil-rotate 1.2s ease-in-out infinite;\n  transform-origin: bottom center;\n}\n.rc-loader-pencil span {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.rc-loader-pencil span:nth-child(1) {\n  width: 8px; height: 28px;\n  background: linear-gradient(to top, #f59e0b, #fbbf24);\n  border-radius: 2px 2px 0 0;\n}\n.rc-loader-pencil span:nth-child(2) {\n  width: 0; height: 0;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 10px solid #a855f7;\n  bottom: -2px;\n}\n@keyframes rc-pencil-rotate {\n  0%, 100% { transform: rotate(0deg); }\n  25% { transform: rotate(30deg); }\n  50% { transform: rotate(0deg); }\n  75% { transform: rotate(-30deg); }\n}"
  },
  {
    "name": "Loader Atom",
    "className": "rc-loader-atom",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-atom {\n  width: 60px; height: 60px;\n  position: relative;\n}\n.rc-loader-atom span {\n  position: absolute;\n  width: 100%; height: 100%;\n  border: 1.5px solid rgba(168, 85, 247, 0.4);\n  border-radius: 50%;\n}\n.rc-loader-atom span::after {\n  content: '';\n  position: absolute;\n  top: -4px; left: 50%;\n  margin-left: -4px;\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  background: #a855f7;\n}\n.rc-loader-atom span:nth-child(1) {\n  animation: rc-atom-orbit-1 1.5s linear infinite;\n}\n.rc-loader-atom span:nth-child(2) {\n  animation: rc-atom-orbit-2 1.5s linear infinite;\n}\n.rc-loader-atom span:nth-child(3) {\n  animation: rc-atom-orbit-3 1.5s linear infinite;\n}\n.rc-loader-atom::after {\n  content: '';\n  position: absolute;\n  top: 50%; left: 50%;\n  width: 10px; height: 10px;\n  margin: -5px 0 0 -5px;\n  border-radius: 50%;\n  background: #ec4899;\n}\n@keyframes rc-atom-orbit-1 {\n  0% { transform: rotateX(60deg) rotateY(0deg); }\n  100% { transform: rotateX(60deg) rotateY(360deg); }\n}\n@keyframes rc-atom-orbit-2 {\n  0% { transform: rotateX(60deg) rotateY(120deg); }\n  100% { transform: rotateX(60deg) rotateY(480deg); }\n}\n@keyframes rc-atom-orbit-3 {\n  0% { transform: rotateX(60deg) rotateY(240deg); }\n  100% { transform: rotateX(60deg) rotateY(600deg); }\n}"
  },
  {
    "name": "Loader Bar Progress",
    "className": "rc-loader-bar-progress",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-bar-progress {\n  width: 80px; height: 6px;\n  background: rgba(168, 85, 247, 0.15);\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n}\n.rc-loader-bar-progress span {\n  position: absolute;\n  top: 0; left: 0;\n  height: 100%;\n  width: 100%;\n  background: linear-gradient(90deg, #a855f7, #ec4899, #a855f7);\n  background-size: 200% 100%;\n  border-radius: 3px;\n  animation: rc-bar-progress 1.5s ease-in-out infinite;\n}\n@keyframes rc-bar-progress {\n  0% { transform: translateX(-100%); background-position: 0% 0; }\n  50% { background-position: 100% 0; }\n  100% { transform: translateX(100%); background-position: 0% 0; }\n}"
  },
  {
    "name": "Loader Clock",
    "className": "rc-loader-clock",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-clock {\n  width: 40px; height: 40px;\n  border: 3px solid rgba(168, 85, 247, 0.3);\n  border-radius: 50%;\n  position: relative;\n}\n.rc-loader-clock span {\n  position: absolute;\n  bottom: 50%; left: 50%;\n  width: 2px; height: 14px;\n  margin-left: -1px;\n  background: #a855f7;\n  border-radius: 1px;\n  transform-origin: bottom center;\n  animation: rc-clock-tick 1.5s steps(12, end) infinite;\n}\n.rc-loader-clock::after {\n  content: '';\n  position: absolute;\n  top: 50%; left: 50%;\n  width: 6px; height: 6px;\n  margin: -3px 0 0 -3px;\n  border-radius: 50%;\n  background: #ec4899;\n}\n@keyframes rc-clock-tick {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}"
  },
  {
    "name": "Loader Bouncing Ball",
    "className": "rc-loader-bounce",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-bounce {\n  width: 24px; height: 40px;\n  position: relative;\n}\n.rc-loader-bounce span {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  width: 24px; height: 24px;\n  margin-left: -12px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #a855f7, #ec4899);\n  animation: rc-bounce-squash 0.6s ease-in-out infinite alternate;\n  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);\n}\n@keyframes rc-bounce-squash {\n  0% { transform: translateY(0) scaleX(1) scaleY(1); }\n  30% { transform: translateY(-30px) scaleX(0.95) scaleY(1.05); }\n  50% { transform: translateY(-32px) scaleX(1) scaleY(1); }\n  80% { transform: translateY(0) scaleX(1.15) scaleY(0.85); }\n  100% { transform: translateY(0) scaleX(1.1) scaleY(0.9); }\n}"
  },
  {
    "name": "Loader Moon",
    "className": "rc-loader-moon",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-moon {\n  width: 30px; height: 30px;\n  position: relative;\n  animation: rc-moon-rotate 2s ease-in-out infinite;\n}\n.rc-loader-moon span {\n  position: absolute;\n  width: 100%; height: 100%;\n  border-radius: 50%;\n  background: #a855f7;\n}\n.rc-loader-moon span:nth-child(2) {\n  background: #0f0c29;\n  animation: rc-moon-shadow 2s ease-in-out infinite;\n}\n@keyframes rc-moon-rotate {\n  0%, 100% { transform: rotate(0deg); }\n  50% { transform: rotate(180deg); }\n}\n@keyframes rc-moon-shadow {\n  0%, 100% { transform: translateX(-40%); }\n  50% { transform: translateX(40%); }\n}"
  },
  {
    "name": "Loader Heartbeat",
    "className": "rc-loader-heartbeat",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-loader-heartbeat {\n  width: 30px; height: 30px;\n  position: relative;\n  animation: rc-heartbeat-pulse 1.2s ease-in-out infinite;\n}\n.rc-loader-heartbeat span {\n  position: absolute;\n  width: 30px; height: 30px;\n  transform: rotate(45deg);\n}\n.rc-loader-heartbeat span::before,\n.rc-loader-heartbeat span::after {\n  content: '';\n  position: absolute;\n  width: 30px; height: 30px;\n  border-radius: 50%;\n  background: #ec4899;\n}\n.rc-loader-heartbeat span::before {\n  top: -15px; left: 0;\n}\n.rc-loader-heartbeat span::after {\n  left: -15px; top: 0;\n}\n@keyframes rc-heartbeat-pulse {\n  0%, 100% { transform: scale(1); }\n  14% { transform: scale(1.2); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.2); }\n  56% { transform: scale(1); }\n}"
  },
  {
    "name": "Flip",
    "className": "roy-flip",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 800px;\nanimation: royFlip 1.2s ease-in-out infinite;\n@keyframes royFlip {\n  0%   { transform: rotateY(0deg); }\n  100% { transform: rotateY(360deg); }\n}"
  },
  {
    "name": "Cube",
    "className": "roy-cube",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 600px;\nanimation: royCube 2.4s ease-in-out infinite;\n@keyframes royCube {\n  0%   { transform: rotateX(0deg)   rotateY(0deg); }\n  25%  { transform: rotateX(90deg)  rotateY(90deg); }\n  50%  { transform: rotateX(180deg) rotateY(180deg); }\n  75%  { transform: rotateX(270deg) rotateY(270deg); }\n  100% { transform: rotateX(360deg) rotateY(360deg); }\n}"
  },
  {
    "name": "Prism",
    "className": "roy-prism",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 700px;\nanimation: royPrism 3s linear infinite;\n@keyframes royPrism {\n  0%   { transform: rotateY(0deg)   rotateX(15deg); }\n  33%  { transform: rotateY(120deg) rotateX(-15deg); }\n  66%  { transform: rotateY(240deg) rotateX(15deg); }\n  100% { transform: rotateY(360deg) rotateX(-15deg); }\n}"
  },
  {
    "name": "Carousel",
    "className": "roy-carousel",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 1000px;\nanimation: royCarousel 4s ease-in-out infinite;\n@keyframes royCarousel {\n  0%   { transform: rotateY(0deg)   translateZ(60px); }\n  25%  { transform: rotateY(90deg)  translateZ(60px); }\n  50%  { transform: rotateY(180deg) translateZ(60px); }\n  75%  { transform: rotateY(270deg) translateZ(60px); }\n  100% { transform: rotateY(360deg) translateZ(60px); }\n}"
  },
  {
    "name": "Card Tilt",
    "className": "roy-card-tilt",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 600px;\nanimation: royCardTilt 2s ease-in-out infinite;\n@keyframes royCardTilt {\n  0%   { transform: rotateX(0deg)    rotateY(0deg); }\n  25%  { transform: rotateX(15deg)   rotateY(-10deg); }\n  50%  { transform: rotateX(0deg)    rotateY(0deg); }\n  75%  { transform: rotateX(-15deg)  rotateY(10deg); }\n  100% { transform: rotateX(0deg)    rotateY(0deg); }\n}"
  },
  {
    "name": "Perspective",
    "className": "roy-perspective",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 500px;\nanimation: royPerspective 2.5s ease-in-out infinite;\n@keyframes royPerspective {\n  0%   { transform: translateZ(0px); }\n  50%  { transform: translateZ(80px) rotateX(10deg); }\n  100% { transform: translateZ(0px); }\n}"
  },
  {
    "name": "Depth Float",
    "className": "roy-depth-float",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 600px;\nanimation: royDepthFloat 3s ease-in-out infinite;\n@keyframes royDepthFloat {\n  0%   { transform: translateZ(0px)   translateY(0px); }\n  50%  { transform: translateZ(50px)  translateY(-20px); }\n  100% { transform: translateZ(0px)   translateY(0px); }\n}"
  },
  {
    "name": "Rotate3D",
    "className": "roy-rotate3d",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 800px;\nanimation: royRotate3D 3s linear infinite;\n@keyframes royRotate3D {\n  0%   { transform: rotate3d(1, 1, 0, 0deg); }\n  100% { transform: rotate3d(1, 1, 0, 360deg); }\n}"
  },
  {
    "name": "3D Book Open",
    "className": "roy-book-open",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 800px;\ntransform-style: preserve-3d;\nanimation: royBookOpen 3s ease-in-out infinite;\n@keyframes royBookOpen {\n  0%   { transform: rotateY(0deg); }\n  15%  { transform: rotateY(0deg); }\n  50%  { transform: rotateY(-160deg); }\n  85%  { transform: rotateY(-160deg); }\n  100% { transform: rotateY(0deg); }\n}"
  },
  {
    "name": "3D Door Open",
    "className": "roy-door-open",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 600px;\ntransform-origin: left center;\nanimation: royDoorOpen 2.8s ease-in-out infinite;\n@keyframes royDoorOpen {\n  0%   { transform: perspective(600px) rotateY(0deg); }\n  30%  { transform: perspective(600px) rotateY(-75deg); }\n  70%  { transform: perspective(600px) rotateY(-75deg); }\n  100% { transform: perspective(600px) rotateY(0deg); }\n}"
  },
  {
    "name": "3D Coin Flip",
    "className": "roy-coin-flip",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 600px;\nanimation: royCoinFlip 2s ease-in-out infinite;\n@keyframes royCoinFlip {\n  0%   { transform: rotateY(0deg)    scaleX(1); }\n  25%  { transform: rotateY(90deg)   scaleX(0.15); }\n  50%  { transform: rotateY(180deg)  scaleX(1); }\n  75%  { transform: rotateY(270deg)  scaleX(0.15); }\n  100% { transform: rotateY(360deg)  scaleX(1); }\n}"
  },
  {
    "name": "3D Swing",
    "className": "roy-swing",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 500px;\ntransform-origin: top center;\nanimation: roySwing 2s ease-in-out infinite;\n@keyframes roySwing {\n  0%   { transform: rotateY(0deg); }\n  20%  { transform: rotateY(30deg); }\n  40%  { transform: rotateY(-25deg); }\n  60%  { transform: rotateY(15deg); }\n  80%  { transform: rotateY(-10deg); }\n  100% { transform: rotateY(0deg); }\n}"
  },
  {
    "name": "3D Helix",
    "className": "roy-helix",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 800px;\nanimation: royHelix 3s linear infinite;\n@keyframes royHelix {\n  0%   { transform: rotateY(0deg)   translateZ(0px)   translateY(0px); }\n  25%  { transform: rotateY(90deg)  translateZ(40px)  translateY(-30px); }\n  50%  { transform: rotateY(180deg) translateZ(0px)   translateY(0px); }\n  75%  { transform: rotateY(270deg) translateZ(-40px) translateY(-30px); }\n  100% { transform: rotateY(360deg) translateZ(0px)   translateY(0px); }\n}"
  },
  {
    "name": "3D Morphing Cube",
    "className": "roy-morphing-cube",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 700px;\nanimation: royMorphingCube 4s ease-in-out infinite;\n@keyframes royMorphingCube {\n  0%   { transform: rotateX(0deg)   rotateY(0deg)   scaleX(1)   scaleY(1); }\n  25%  { transform: rotateX(90deg)  rotateY(45deg)  scaleX(1.5) scaleY(0.7); }\n  50%  { transform: rotateX(180deg) rotateY(180deg) scaleX(0.6) scaleY(1.4); }\n  75%  { transform: rotateX(270deg) rotateY(270deg) scaleX(1.3) scaleY(0.8); }\n  100% { transform: rotateX(360deg) rotateY(360deg) scaleX(1)   scaleY(1); }\n}"
  },
  {
    "name": "3D Orbit",
    "className": "roy-orbit",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 600px;\nanimation: royOrbit 3s linear infinite;\n@keyframes royOrbit {\n  0%   { transform: rotate(0deg)   translateX(50px) rotate(0deg); }\n  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }\n}"
  },
  {
    "name": "3D Tumble",
    "className": "roy-tumble",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 700px;\nanimation: royTumble 2.5s ease-in-out infinite;\n@keyframes royTumble {\n  0%   { transform: rotate3d(1, 0, 0, 0deg)    rotate3d(0, 1, 0, 0deg); }\n  25%  { transform: rotate3d(1, 0, 0, 90deg)   rotate3d(0, 1, 0, 90deg); }\n  50%  { transform: rotate3d(1, 0, 0, 180deg)  rotate3d(0, 1, 0, 180deg); }\n  75%  { transform: rotate3d(1, 0, 0, 270deg)  rotate3d(0, 1, 0, 270deg); }\n  100% { transform: rotate3d(1, 0, 0, 360deg)  rotate3d(0, 1, 0, 360deg); }\n}"
  },
  {
    "name": "Morph Circle",
    "className": "roy-morph-circle",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royMorphCircle 2s ease-in-out infinite;\n@keyframes royMorphCircle {\n  0%, 100% { border-radius: 0; }\n  50%      { border-radius: 50%; }\n}"
  },
  {
    "name": "Morph Diamond",
    "className": "roy-morph-diamond",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royMorphDiamond 2.5s ease-in-out infinite;\n@keyframes royMorphDiamond {\n  0%, 100% { transform: rotate(0deg)   scale(1, 1); }\n  50%      { transform: rotate(45deg)  scale(0.85, 0.85); }\n}"
  },
  {
    "name": "Rotate 90",
    "className": "roy-rotate90",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royRotate90 2s ease-in-out infinite;\n@keyframes royRotate90 {\n  0%, 100% { transform: rotate(0deg); }\n  50%      { transform: rotate(90deg); }\n}"
  },
  {
    "name": "Rotate 180",
    "className": "roy-rotate180",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royRotate180 2s ease-in-out infinite;\n@keyframes royRotate180 {\n  0%, 100% { transform: rotate(0deg); }\n  50%      { transform: rotate(180deg); }\n}"
  },
  {
    "name": "Rotate 360",
    "className": "roy-rotate360",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royRotate360 2s linear infinite;\n@keyframes royRotate360 {\n  0%   { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}"
  },
  {
    "name": "Skew X",
    "className": "roy-skew-x",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: roySkewX 2s ease-in-out infinite;\n@keyframes roySkewX {\n  0%, 100% { transform: skewX(0deg); }\n  25%      { transform: skewX(20deg); }\n  75%      { transform: skewX(-20deg); }\n}"
  },
  {
    "name": "Skew Y",
    "className": "roy-skew-y",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: roySkewY 2s ease-in-out infinite;\n@keyframes roySkewY {\n  0%, 100% { transform: skewY(0deg); }\n  25%      { transform: skewY(15deg); }\n  75%      { transform: skewY(-15deg); }\n}"
  },
  {
    "name": "Scale Rotate",
    "className": "roy-scale-rotate",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royScaleRotate 2s ease-in-out infinite;\n@keyframes royScaleRotate {\n  0%, 100% { transform: scale(1)    rotate(0deg); }\n  50%      { transform: scale(1.2)  rotate(180deg); }\n}"
  },
  {
    "name": "Transform Accordion",
    "className": "roy-accordion",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royAccordion 2.5s ease-in-out infinite;\n@keyframes royAccordion {\n  0%, 100% { transform: scaleY(1); }\n  20%      { transform: scaleY(0.05); }\n  40%      { transform: scaleY(1.05); }\n  60%      { transform: scaleY(0.95); }\n  80%      { transform: scaleY(1.02); }\n}"
  },
  {
    "name": "Transform Fan",
    "className": "roy-fan",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "transform-origin: bottom center;\nanimation: royFan 2.5s ease-in-out infinite;\n@keyframes royFan {\n  0%   { transform: rotate(0deg); }\n  25%  { transform: rotate(-40deg); }\n  50%  { transform: rotate(40deg); }\n  75%  { transform: rotate(-20deg); }\n  100% { transform: rotate(0deg); }\n}"
  },
  {
    "name": "Transform Stretch",
    "className": "roy-stretch",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royStretch 2s ease-in-out infinite;\n@keyframes royStretch {\n  0%, 100% { transform: scaleX(1)    scaleY(1); }\n  30%      { transform: scaleX(1.6)  scaleY(0.75); }\n  60%      { transform: scaleX(0.9)  scaleY(1.1); }\n}"
  },
  {
    "name": "Transform Compress",
    "className": "roy-compress",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royCompress 2s ease-in-out infinite;\n@keyframes royCompress {\n  0%, 100% { transform: scaleY(1); }\n  15%      { transform: scaleY(0.4); }\n  30%      { transform: scaleY(1.15); }\n  45%      { transform: scaleY(0.85); }\n  60%      { transform: scaleY(1.05); }\n  75%      { transform: scaleY(0.97); }\n}"
  },
  {
    "name": "Transform Wobble",
    "className": "roy-wobble",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royWobble 1.5s ease-in-out infinite;\n@keyframes royWobble {\n  0%   { transform: translateX(0)     rotate(0deg); }\n  15%  { transform: translateX(-12px)  rotate(-5deg); }\n  30%  { transform: translateX(10px)   rotate(3deg); }\n  45%  { transform: translateX(-8px)   rotate(-3deg); }\n  60%  { transform: translateX(6px)    rotate(2deg); }\n  75%  { transform: translateX(-3px)   rotate(-1deg); }\n  100% { transform: translateX(0)      rotate(0deg); }\n}"
  },
  {
    "name": "Transform Twist",
    "className": "roy-twist",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "animation: royTwist 2s ease-in-out infinite;\n@keyframes royTwist {\n  0%, 100% { transform: rotateZ(0deg)   scaleX(1); }\n  25%      { transform: rotateZ(10deg)  scaleX(0.7); }\n  50%      { transform: rotateZ(0deg)   scaleX(1.1); }\n  75%      { transform: rotateZ(-10deg) scaleX(0.7); }\n}"
  },
  {
    "name": "Transform Fold",
    "className": "roy-fold",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 500px;\ntransform-origin: top center;\nanimation: royFold 3s ease-in-out infinite;\n@keyframes royFold {\n  0%, 100% { transform: rotateX(0deg); }\n  40%      { transform: rotateX(-120deg); }\n  60%      { transform: rotateX(-120deg); }\n}"
  },
  {
    "name": "Transform Unfold",
    "className": "roy-unfold",
    "category": "3d-transforms",
    "displayType": "box",
    "css": "perspective: 500px;\ntransform-origin: top center;\nanimation: royUnfold 3s ease-in-out infinite;\n@keyframes royUnfold {\n  0%   { transform: rotateX(-120deg); }\n  40%  { transform: rotateX(-120deg); }\n  100% { transform: rotateX(0deg); }\n}"
  },
  {
    "name": "Liquid Fill",
    "className": "roy-liquid-fill",
    "category": "advanced",
    "displayType": "box",
    "css": "background: linear-gradient(to top, #00d2ff 0%, #00d2ff var(--fill, 50%), transparent var(--fill, 50%));\nanimation: royLiquidFill 3s ease-in-out infinite;\n@keyframes royLiquidFill {\n  0%, 100% { --fill: 20%; }\n  50%      { --fill: 80%; }\n}"
  },
  {
    "name": "Smoke",
    "className": "roy-smoke",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: roySmoke 3s ease-out infinite;\nfilter: blur(2px);\n@keyframes roySmoke {\n  0%   { opacity: 0.7; transform: translateY(0)     scale(1);   filter: blur(2px); }\n  100% { opacity: 0;   transform: translateY(-60px) scale(2.5); filter: blur(10px); }\n}"
  },
  {
    "name": "Electric",
    "className": "roy-electric",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royElectric 0.15s linear infinite;\nbox-shadow:\n  0 0 5px  #00e5ff,\n  0 0 10px #00e5ff,\n  0 0 20px #00b8d4,\n  0 0 40px #00b8d4;\n@keyframes royElectric {\n  0%, 100% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #00b8d4; }\n  50%      { box-shadow: 0 0 10px #76ff03, 0 0 25px #76ff03, 0 0 50px #64dd17; }\n}"
  },
  {
    "name": "Holographic",
    "className": "roy-holographic",
    "category": "advanced",
    "displayType": "box",
    "css": "background: linear-gradient(\n  135deg,\n  #ff0080 0%, #ff8c00 16%, #40e0d0 33%,\n  #7b68ee 50%, #ff0080 66%, #ff8c00 83%,\n  #40e0d0 100%\n);\nbackground-size: 400% 400%;\nanimation: royHolographic 4s ease-in-out infinite;\n@keyframes royHolographic {\n  0%   { background-position: 0% 50%; }\n  50%  { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}"
  },
  {
    "name": "Breathing",
    "className": "roy-breathing",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royBreathing 4s ease-in-out infinite;\n@keyframes royBreathing {\n  0%, 100% { transform: scale(1);    opacity: 0.6; }\n  50%      { transform: scale(1.08); opacity: 1; }\n}"
  },
  {
    "name": "Paper Unfold",
    "className": "roy-paper-unfold",
    "category": "advanced",
    "displayType": "box",
    "css": "perspective: 600px;\ntransform-origin: top left;\nanimation: royPaperUnfold 3s ease-in-out infinite;\n@keyframes royPaperUnfold {\n  0%   { transform: rotateY(-180deg); opacity: 0.5; }\n  50%  { transform: rotateY(0deg);    opacity: 1; }\n  100% { transform: rotateY(-180deg); opacity: 0.5; }\n}"
  },
  {
    "name": "Ripple Spread",
    "className": "roy-ripple-spread",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royRippleSpread 2s ease-out infinite;\n@keyframes royRippleSpread {\n  0%   { box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.5); }\n  100% { box-shadow: 0 0 0 30px rgba(0, 150, 255, 0); }\n}"
  },
  {
    "name": "Confetti Burst",
    "className": "roy-confetti-burst",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royConfettiBurst 1.5s ease-out infinite;\n@keyframes royConfettiBurst {\n  0%   { transform: scale(0) rotate(0deg);   opacity: 1; }\n  60%  { transform: scale(1.2) rotate(200deg); opacity: 1; }\n  100% { transform: scale(1) rotate(360deg); opacity: 0.6; }\n}"
  },
  {
    "name": "Magnetic Pull",
    "className": "roy-magnetic-pull",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royMagneticPull 2.5s ease-in-out infinite;\nfilter: drop-shadow(0 0 8px rgba(100, 100, 255, 0.6));\n@keyframes royMagneticPull {\n  0%, 100% { transform: translateX(0)    translateY(0);   filter: drop-shadow(0 0 8px rgba(100, 100, 255, 0.6)); }\n  30%      { transform: translateX(15px) translateY(5px); filter: drop-shadow(0 0 15px rgba(100, 100, 255, 0.9)); }\n  60%      { transform: translateX(-5px) translateY(-2px); }\n}"
  },
  {
    "name": "Glass Shatter",
    "className": "roy-glass-shatter",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royGlassShatter 2s ease-in-out infinite;\n@keyframes royGlassShatter {\n  0%   { clip-path: inset(0 0 0 0); opacity: 1; }\n  10%  { clip-path: polygon(0 0, 60% 0, 40% 40%, 0 50%); opacity: 1; }\n  30%  { clip-path: polygon(60% 0, 100% 0, 100% 50%, 40% 40%); opacity: 0.9; transform: translate(10px, -5px); }\n  50%  { clip-path: polygon(0 50%, 40% 40%, 60% 100%, 0 100%); opacity: 0.9; transform: translate(-8px, 5px); }\n  70%  { clip-path: polygon(40% 40%, 100% 50%, 100% 100%, 60% 100%); opacity: 0.9; transform: translate(6px, 8px); }\n  80%  { clip-path: inset(0 0 0 0); opacity: 1; transform: none; }\n  100% { clip-path: inset(0 0 0 0); opacity: 1; transform: none; }\n}"
  },
  {
    "name": "Neon Outline",
    "className": "roy-neon-outline",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royNeonOutline 1.5s ease-in-out infinite alternate;\n@keyframes royNeonOutline {\n  0% {\n    box-shadow:\n      0 0 5px  #ff00de,\n      0 0 10px #ff00de,\n      inset 0 0 5px #ff00de;\n  }\n  100% {\n    box-shadow:\n      0 0 15px #ff00de,\n      0 0 30px #ff00de,\n      0 0 50px #ff00de,\n      inset 0 0 10px #ff00de;\n  }\n}"
  },
  {
    "name": "Gradient Border Spin",
    "className": "roy-gradient-border-spin",
    "category": "advanced",
    "displayType": "box",
    "css": "border: 3px solid transparent;\nbackground-image: linear-gradient(#1a1a2e, #1a1a2e),\n  linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #00f2fe);\nbackground-origin: border-box;\nbackground-clip: padding-box, border-box;\nbackground-size: 100% 100%, 300% 300%;\nanimation: royGradBorderSpin 3s linear infinite;\n@keyframes royGradBorderSpin {\n  0%   { background-position: 0 0, 0% 50%; }\n  100% { background-position: 0 0, 100% 50%; }\n}"
  },
  {
    "name": "Unique Aurora Text",
    "className": "roy-aurora-text",
    "category": "advanced",
    "displayType": "text",
    "css": "background: linear-gradient(\n  90deg,\n  #00c9ff, #92fe9d, #f7ff00, #ff6b6b, #c471f5, #00c9ff\n);\nbackground-size: 400% 100%;\n-webkit-background-clip: text;\nbackground-clip: text;\n-webkit-text-fill-color: transparent;\nanimation: royAuroraText 5s linear infinite;\n@keyframes royAuroraText {\n  0%   { background-position: 0% 50%; }\n  100% { background-position: 400% 50%; }\n}"
  },
  {
    "name": "Unique Fire",
    "className": "roy-fire",
    "category": "advanced",
    "displayType": "box",
    "css": "background: linear-gradient(\n  to top,\n  #ff4500 0%, #ff6a00 25%, #ffa500 50%, #ffdd00 75%, transparent 100%\n);\nbackground-size: 100% 250%;\nanimation: royFire 1.5s ease-in-out infinite;\nfilter: blur(1px) brightness(1.1);\nbox-shadow: 0 0 20px 5px rgba(255, 69, 0, 0.4), 0 0 60px 10px rgba(255, 106, 0, 0.2);\n@keyframes royFire {\n  0%, 100% { background-position: 0% 100%; }\n  50%      { background-position: 0% 0%; }\n}"
  },
  {
    "name": "Unique Ice",
    "className": "roy-ice",
    "category": "advanced",
    "displayType": "box",
    "css": "background: linear-gradient(\n  135deg,\n  rgba(174, 214, 241, 0.4) 0%,\n  rgba(224, 247, 250, 0.3) 30%,\n  rgba(179, 229, 252, 0.5) 60%,\n  rgba(200, 230, 251, 0.3) 100%\n);\nbackdrop-filter: blur(8px) saturate(1.8);\n-webkit-backdrop-filter: blur(8px) saturate(1.8);\nborder: 1px solid rgba(255, 255, 255, 0.35);\nbox-shadow:\n  0 0 15px rgba(174, 214, 241, 0.3),\n  inset 0 0 30px rgba(255, 255, 255, 0.15);\nanimation: royIce 3s ease-in-out infinite;\n@keyframes royIce {\n  0%, 100% { box-shadow: 0 0 15px rgba(174, 214, 241, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.15); }\n  50%      { box-shadow: 0 0 25px rgba(174, 214, 241, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.3); }\n}"
  },
  {
    "name": "Unique Sand",
    "className": "roy-sand",
    "category": "advanced",
    "displayType": "box",
    "css": "background: #d4a76a;\nborder-radius: 4px;\nanimation: roySand 2.5s ease-out infinite;\n@keyframes roySand {\n  0%   {\n    box-shadow:\n      0 0 0 0 rgba(212, 167, 106, 0.8),\n      0 0 0 0 rgba(194, 148, 90, 0.6),\n      0 0 0 0 rgba(222, 184, 135, 0.4);\n    opacity: 1;\n  }\n  100% {\n    box-shadow:\n      30px -15px 8px -5px rgba(212, 167, 106, 0),\n      -25px -20px 6px -4px rgba(194, 148, 90, 0),\n      10px -30px 10px -3px rgba(222, 184, 135, 0),\n      -15px 10px 5px -6px rgba(210, 180, 140, 0),\n      20px 5px 7px -5px rgba(188, 143, 93, 0);\n    opacity: 0.3;\n  }\n}"
  },
  {
    "name": "Unique Water Drop",
    "className": "roy-water-drop",
    "category": "advanced",
    "displayType": "box",
    "css": "border-radius: 50%;\nanimation: royWaterDrop 2s ease-out infinite;\n@keyframes royWaterDrop {\n  0%   {\n    box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.5);\n    transform: scale(1);\n  }\n  50%  {\n    box-shadow:\n      0 0 0 15px rgba(0, 150, 255, 0.2),\n      0 0 0 30px rgba(0, 150, 255, 0.1);\n    transform: scale(0.95);\n  }\n  100% {\n    box-shadow:\n      0 0 0 30px rgba(0, 150, 255, 0),\n      0 0 0 60px rgba(0, 150, 255, 0);\n    transform: scale(1);\n  }\n}"
  },
  {
    "name": "Unique Glitch Morph",
    "className": "roy-glitch-morph",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royGlitchMorph 3s step-end infinite;\nposition: relative;\n@keyframes royGlitchMorph {\n  0%, 100% {\n    transform: skewX(0deg) scale(1, 1);\n    border-radius: 0;\n    box-shadow: none;\n  }\n  10% {\n    transform: skewX(5deg) scale(1.02, 0.98);\n    border-radius: 10% 0 10% 0;\n    box-shadow: -3px 0 #ff0040, 3px 0 #00ffff;\n  }\n  20% {\n    transform: skewX(-3deg) scale(0.98, 1.02);\n    border-radius: 0 15% 0 15%;\n    box-shadow: 3px 0 #ff0040, -3px 0 #00ffff;\n  }\n  30% {\n    transform: skewX(0deg) scale(1.05, 0.95);\n    border-radius: 25% 10% 25% 10%;\n    box-shadow: 0;\n  }\n  40% {\n    transform: skewX(8deg) scale(0.95, 1.05);\n    border-radius: 10% 25% 10% 25%;\n    box-shadow: -5px 0 #ff0040, 5px 0 #00ffff;\n  }\n  50% {\n    transform: skewX(0deg) scale(1, 1);\n    border-radius: 0;\n    box-shadow: none;\n  }\n}"
  },
  {
    "name": "Unique Pixelate",
    "className": "roy-pixelate",
    "category": "advanced",
    "displayType": "box",
    "css": "background-color: #1a1a2e;\nanimation: royPixelate 3s steps(8) infinite;\nimage-rendering: pixelated;\n@keyframes royPixelate {\n  0%   { box-shadow: 10px 0 0 0 #e94560, 20px 0 0 0 #0f3460, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n  12%  { box-shadow: 0 0 0 0 #e94560, 10px 0 0 0 #16213e, 20px 0 0 0 #e94560, 0 10px 0 0 #0f3460, 10px 10px 0 0 #e94560, 20px 10px 0 0 #16213e; }\n  25%  { box-shadow: 0 0 0 0 #0f3460, 10px 0 0 0 #e94560, 20px 0 0 0 #16213e, 0 10px 0 0 #e94560, 10px 10px 0 0 #0f3460, 20px 10px 0 0 #e94560; }\n  37%  { box-shadow: 0 0 0 0 #16213e, 10px 0 0 0 #0f3460, 20px 0 0 0 #e94560, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n  50%  { box-shadow: 10px 0 0 0 #e94560, 20px 0 0 0 #0f3460, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n  62%  { box-shadow: 0 0 0 0 #e94560, 10px 0 0 0 #16213e, 20px 0 0 0 #e94560, 0 10px 0 0 #0f3460, 10px 10px 0 0 #e94560, 20px 10px 0 0 #16213e; }\n  75%  { box-shadow: 0 0 0 0 #0f3460, 10px 0 0 0 #e94560, 20px 0 0 0 #16213e, 0 10px 0 0 #e94560, 10px 10px 0 0 #0f3460, 20px 10px 0 0 #e94560; }\n  87%  { box-shadow: 0 0 0 0 #16213e, 10px 0 0 0 #0f3460, 20px 0 0 0 #e94560, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n  100% { box-shadow: 10px 0 0 0 #e94560, 20px 0 0 0 #0f3460, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n}"
  },
  {
    "name": "Unique Cyber Grid",
    "className": "roy-cyber-grid",
    "category": "advanced",
    "displayType": "bg",
    "css": "background-color: #0a0a1a;\nbackground-image:\n  linear-gradient(rgba(0, 255, 255, 0.12) 1px, transparent 1px),\n  linear-gradient(90deg, rgba(0, 255, 255, 0.12) 1px, transparent 1px),\n  linear-gradient(rgba(255, 0, 255, 0.06) 1px, transparent 1px),\n  linear-gradient(90deg, rgba(255, 0, 255, 0.06) 1px, transparent 1px);\nbackground-size: 40px 40px, 40px 40px, 10px 10px, 10px 10px;\nanimation: royCyberGrid 4s linear infinite;\n@keyframes royCyberGrid {\n  0%   { background-position: 0 0, 0 0, 0 0, 0 0; }\n  100% { background-position: 40px 40px, 40px 40px, 10px 10px, 10px 10px; }\n}"
  },
  {
    "name": "Unique Morphing Blob",
    "className": "roy-morphing-blob",
    "category": "advanced",
    "displayType": "box",
    "css": "animation: royMorphingBlob 8s ease-in-out infinite;\n@keyframes royMorphingBlob {\n  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }\n  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }\n  50%  { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }\n  75%  { border-radius: 60% 30% 60% 50% / 70% 40% 50% 60%; }\n  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }\n}"
  },
  {
    "name": "Unique Text Shadow Stack",
    "className": "roy-text-shadow-stack",
    "category": "advanced",
    "displayType": "text",
    "css": "color: #ffffff;\nanimation: royTextShadowStack 3s ease-in-out infinite;\n@keyframes royTextShadowStack {\n  0%, 100% {\n    text-shadow:\n      0 1px 0 #cccccc,\n      0 2px 0 #bbbbbb,\n      0 3px 0 #aaaaaa,\n      0 4px 0 #999999,\n      0 5px 8px rgba(0, 0, 0, 0.4);\n  }\n  50% {\n    text-shadow:\n      0 -1px 0 #cccccc,\n      0 -2px 0 #bbbbbb,\n      0 -3px 0 #aaaaaa,\n      0 -4px 0 #999999,\n      0 -5px 8px rgba(0, 0, 0, 0.4);\n  }\n}"
  },
  {
    "name": "Unique Prism Refraction",
    "className": "roy-prism-refraction",
    "category": "advanced",
    "displayType": "box",
    "css": "background: linear-gradient(\n  120deg,\n  rgba(255, 0, 0, 0.6) 0%,\n  rgba(255, 127, 0, 0.6) 17%,\n  rgba(255, 255, 0, 0.6) 33%,\n  rgba(0, 255, 0, 0.6) 50%,\n  rgba(0, 0, 255, 0.6) 67%,\n  rgba(75, 0, 130, 0.6) 83%,\n  rgba(148, 0, 211, 0.6) 100%\n);\nbackground-size: 300% 300%;\nanimation: royPrismRefraction 4s ease-in-out infinite;\nbox-shadow: 0 0 30px rgba(255, 255, 255, 0.15);\n@keyframes royPrismRefraction {\n  0%, 100% { background-position: 0% 50%; }\n  50%      { background-position: 100% 50%; }\n}"
  },
  {
    "name": "Unique Typing Cursor",
    "className": "roy-typing-cursor",
    "category": "advanced",
    "displayType": "text",
    "css": "border-right: 3px solid currentColor;\npadding-right: 4px;\nanimation: royTypingCursor 1s step-end infinite;\n@keyframes royTypingCursor {\n  0%, 100% { border-color: currentColor; }\n  50%      { border-color: transparent; }\n}"
  },
  {
    "name": "Button Shine",
    "className": "btn-shine",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-shine {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.btn-shine::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: -75%;\n    width: 50%;\n    height: 100%;\n    background: linear-gradient(\n        120deg,\n        transparent,\n        rgba(255, 255, 255, 0.35),\n        transparent\n    );\n    transform: skewX(-20deg);\n    transition: none;\n}\n.btn-shine:hover::before {\n    animation: btn-shine-sweep 0.6s ease forwards;\n}\n.btn-shine:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}\n@keyframes btn-shine-sweep {\n    to { left: 125%; }\n}"
  },
  {
    "name": "Button Ripple Click",
    "className": "btn-ripple",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-ripple {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.btn-ripple::after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 0;\n    height: 0;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.35);\n    transform: translate(-50%, -50%);\n    transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;\n    opacity: 0;\n}\n.btn-ripple:active::after {\n    width: 300px;\n    height: 300px;\n    opacity: 1;\n    transition: width 0s, height 0s, opacity 0s;\n}\n.btn-ripple:hover {\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n    transform: translateY(-1px);\n}"
  },
  {
    "name": "Button Fill Left",
    "className": "btn-fill-left",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-fill-left {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: 2px solid #7c3aed;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    z-index: 1;\n    transition: color 0.3s ease, transform 0.2s ease;\n}\n.btn-fill-left::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    transform: translateX(-101%);\n    transition: transform 0.3s ease;\n    z-index: -1;\n}\n.btn-fill-left:hover::before {\n    transform: translateX(0);\n}\n.btn-fill-left:hover {\n    color: #fff;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Button Fill Right",
    "className": "btn-fill-right",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-fill-right {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: 2px solid #7c3aed;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    z-index: 1;\n    transition: color 0.3s ease, transform 0.2s ease;\n}\n.btn-fill-right::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(135deg, #6366f1, #7c3aed);\n    transform: translateX(101%);\n    transition: transform 0.3s ease;\n    z-index: -1;\n}\n.btn-fill-right:hover::before {\n    transform: translateX(0);\n}\n.btn-fill-right:hover {\n    color: #fff;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Button Fill Top",
    "className": "btn-fill-top",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-fill-top {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: 2px solid #7c3aed;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    z-index: 1;\n    transition: color 0.3s ease, transform 0.2s ease;\n}\n.btn-fill-top::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    transform: translateY(-101%);\n    transition: transform 0.3s ease;\n    z-index: -1;\n}\n.btn-fill-top:hover::before {\n    transform: translateY(0);\n}\n.btn-fill-top:hover {\n    color: #fff;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Button Fill Bottom",
    "className": "btn-fill-bottom",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-fill-bottom {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: 2px solid #7c3aed;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    z-index: 1;\n    transition: color 0.3s ease, transform 0.2s ease;\n}\n.btn-fill-bottom::before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(135deg, #6366f1, #7c3aed);\n    transform: translateY(101%);\n    transition: transform 0.3s ease;\n    z-index: -1;\n}\n.btn-fill-bottom:hover::before {\n    transform: translateY(0);\n}\n.btn-fill-bottom:hover {\n    color: #fff;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Button Outline Draw",
    "className": "btn-outline-draw",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-outline-draw {\n    position: relative;\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    z-index: 1;\n    transition: color 0.4s ease;\n}\n.btn-outline-draw::before,\n.btn-outline-draw::after {\n    content: '';\n    position: absolute;\n    border-radius: 8px;\n    transition: transform 0.4s ease;\n}\n/* top + bottom lines */\n.btn-outline-draw::before {\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 100%;\n    border-top: 2px solid #7c3aed;\n    border-bottom: 2px solid #7c3aed;\n    transform: scaleX(0);\n    transition: transform 0.4s ease, border-color 0.3s ease;\n}\n/* left + right lines */\n.btn-outline-draw::after {\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 100%;\n    border-left: 2px solid #7c3aed;\n    border-right: 2px solid #7c3aed;\n    transform: scaleY(0);\n    transition: transform 0.4s ease 0.15s, border-color 0.3s ease 0.15s;\n}\n.btn-outline-draw:hover::before {\n    transform: scaleX(1);\n    border-color: #6366f1;\n}\n.btn-outline-draw:hover::after {\n    transform: scaleY(1);\n    border-color: #6366f1;\n}\n.btn-outline-draw:hover {\n    color: #6366f1;\n}"
  },
  {
    "name": "Button Glow Pulse",
    "className": "btn-glow-pulse",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-glow-pulse {\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    box-shadow: 0 0 0 rgba(124, 58, 237, 0);\n    transition: transform 0.2s ease;\n}\n.btn-glow-pulse:hover {\n    animation: btn-glow-pulse-anim 1.2s ease-in-out infinite;\n}\n@keyframes btn-glow-pulse-anim {\n    0%   { box-shadow: 0 0 5px rgba(124, 58, 237, 0.4), 0 0 10px rgba(99, 102, 241, 0.2); }\n    50%  { box-shadow: 0 0 20px rgba(124, 58, 237, 0.7), 0 0 40px rgba(99, 102, 241, 0.4); }\n    100% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.4), 0 0 10px rgba(99, 102, 241, 0.2); }\n}"
  },
  {
    "name": "Button Skew Fill",
    "className": "btn-skew-fill",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-skew-fill {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    z-index: 1;\n    transition: color 0.35s ease, transform 0.2s ease;\n}\n.btn-skew-fill::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 150%;\n    height: 100%;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    transform: translateX(-110%) skewX(-15deg);\n    transition: transform 0.45s ease;\n    z-index: -1;\n}\n.btn-skew-fill:hover::before {\n    transform: translateX(-20%) skewX(-15deg);\n}\n.btn-skew-fill:hover {\n    color: #fff;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Button Slide Icon",
    "className": "btn-slide-icon",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-slide-icon {\n    position: relative;\n    overflow: hidden;\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    padding-right: 48px;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.btn-slide-icon::after {\n    content: '\\2192';\n    position: absolute;\n    top: 50%;\n    right: 12px;\n    transform: translateY(-50%) translateX(24px);\n    opacity: 0;\n    font-size: 16px;\n    transition: transform 0.3s ease, opacity 0.3s ease;\n    color: #fff;\n}\n.btn-slide-icon:hover::after {\n    transform: translateY(-50%) translateX(0);\n    opacity: 1;\n}\n.btn-slide-icon:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Button Bounce",
    "className": "btn-bounce",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-bounce {\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    transition: box-shadow 0.2s ease;\n}\n.btn-bounce:hover {\n    animation: btn-bounce-key 0.5s ease;\n    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);\n}\n@keyframes btn-bounce-key {\n    0%   { transform: scale(1); }\n    30%  { transform: scale(1.05); }\n    50%  { transform: scale(1.0); }\n    70%  { transform: scale(1.08); }\n    100% { transform: scale(1.06); }\n}"
  },
  {
    "name": "Button Press",
    "className": "btn-press",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-press {\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),\n                box-shadow 0.15s ease;\n    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);\n}\n.btn-press:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);\n}\n.btn-press:active {\n    transform: scale(0.95) translateY(0);\n    box-shadow: 0 1px 4px rgba(99, 102, 241, 0.2);\n}"
  },
  {
    "name": "Button Border Sweep",
    "className": "btn-border-sweep",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-border-sweep {\n    position: relative;\n    padding: 10px 24px;\n    border: 2px solid #c4b5fd;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    overflow: hidden;\n    z-index: 1;\n    transition: color 0.4s ease;\n}\n.btn-border-sweep::before {\n    content: '';\n    position: absolute;\n    top: -2px;\n    left: -100%;\n    width: 100%;\n    height: calc(100% + 4px);\n    background: linear-gradient(90deg, #7c3aed, #6366f1, #818cf8);\n    z-index: -2;\n    transition: left 0.5s ease;\n}\n.btn-border-sweep::after {\n    content: '';\n    position: absolute;\n    top: 2px;\n    left: 0;\n    width: calc(100% - 4px);\n    height: calc(100% - 4px);\n    background: transparent;\n    border-radius: 6px;\n    z-index: -1;\n    transition: background 0.4s ease;\n}\n.btn-border-sweep:hover::before {\n    left: 0;\n}\n.btn-border-sweep:hover::after {\n    background: #fff;\n}\n.btn-border-sweep:hover {\n    color: #7c3aed;\n}"
  },
  {
    "name": "Button Neon Border",
    "className": "btn-neon-border",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-neon-border {\n    padding: 10px 24px;\n    border: 2px solid #7c3aed;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    transition: color 0.3s ease,\n                border-color 0.3s ease,\n                box-shadow 0.3s ease,\n                background 0.3s ease;\n}\n.btn-neon-border:hover {\n    color: #fff;\n    border-color: #a78bfa;\n    background: rgba(124, 58, 237, 0.1);\n    box-shadow:\n        0 0 5px rgba(124, 58, 237, 0.5),\n        0 0 15px rgba(124, 58, 237, 0.3),\n        0 0 30px rgba(99, 102, 241, 0.2),\n        inset 0 0 10px rgba(124, 58, 237, 0.15);\n}"
  },
  {
    "name": "Button Gradient Shift",
    "className": "btn-gradient-shift",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-gradient-shift {\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1, #8b5cf6);\n    background-size: 200% 200%;\n    background-position: 0% 50%;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.btn-gradient-shift:hover {\n    background-position: 100% 50%;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);\n}"
  },
  {
    "name": "Button Underline Center",
    "className": "btn-underline-center",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-underline-center {\n    position: relative;\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: rgba(124, 58, 237, 0.06);\n    cursor: pointer;\n    transition: color 0.3s ease, background 0.3s ease;\n}\n.btn-underline-center::after {\n    content: '';\n    position: absolute;\n    bottom: 4px;\n    left: 50%;\n    width: 0;\n    height: 2px;\n    background: linear-gradient(90deg, #7c3aed, #6366f1);\n    border-radius: 2px;\n    transform: translateX(-50%);\n    transition: width 0.3s ease;\n}\n.btn-underline-center:hover::after {\n    width: 70%;\n}\n.btn-underline-center:hover {\n    color: #6366f1;\n    background: rgba(124, 58, 237, 0.1);\n}"
  },
  {
    "name": "Button Shadow Lift",
    "className": "btn-shadow-lift",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-shadow-lift {\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #fff;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    cursor: pointer;\n    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);\n    transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.btn-shadow-lift:hover {\n    transform: translateY(-4px);\n    box-shadow:\n        0 4px 8px rgba(99, 102, 241, 0.25),\n        0 8px 24px rgba(124, 58, 237, 0.25),\n        0 16px 40px rgba(99, 102, 241, 0.15);\n}"
  },
  {
    "name": "Button Ghost Fill",
    "className": "btn-ghost-fill",
    "category": "button-card",
    "displayType": "button",
    "css": ".btn-ghost-fill {\n    padding: 10px 24px;\n    border: 2px solid #7c3aed;\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 14px;\n    color: #7c3aed;\n    background: transparent;\n    cursor: pointer;\n    transition: background 0.3s ease, color 0.3s ease,\n                border-color 0.3s ease, transform 0.2s ease,\n                box-shadow 0.3s ease;\n}\n.btn-ghost-fill:hover {\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    color: #fff;\n    border-color: transparent;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n}"
  },
  {
    "name": "Card Lift",
    "className": "card-lift",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-lift {\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.card-lift:hover {\n    transform: translateY(-8px);\n    box-shadow:\n        0 12px 24px rgba(0, 0, 0, 0.1),\n        0 4px 8px rgba(0, 0, 0, 0.06);\n}"
  },
  {
    "name": "Card Tilt 3D",
    "className": "card-tilt-3d",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-tilt-3d {\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: transform 0.4s ease, box-shadow 0.4s ease;\n    transform-style: preserve-3d;\n    perspective: 800px;\n}\n.card-tilt-3d:hover {\n    transform: perspective(800px) rotateX(2deg) rotateY(-3deg) translateY(-4px);\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);\n}"
  },
  {
    "name": "Card Flip",
    "className": "card-flip",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-flip {\n    perspective: 1000px;\n    background: transparent;\n    border-radius: 12px;\n    padding: 0;\n    border: none;\n    box-shadow: none;\n    min-height: 200px;\n}\n.card-flip .card-flip-inner {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    min-height: 200px;\n    transition: transform 0.6s ease;\n    transform-style: preserve-3d;\n}\n.card-flip:hover .card-flip-inner {\n    transform: rotateY(180deg);\n}\n.card-flip .card-flip-front,\n.card-flip .card-flip-back {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    backface-visibility: hidden;\n    border-radius: 12px;\n    padding: 24px;\n    box-sizing: border-box;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.card-flip .card-flip-front {\n    background: #fff;\n}\n.card-flip .card-flip-back {\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    color: #fff;\n    transform: rotateY(180deg);\n}"
  },
  {
    "name": "Card Spotlight",
    "className": "card-spotlight",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-spotlight {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n    transition: border-color 0.3s ease, box-shadow 0.3s ease;\n}\n.card-spotlight::before {\n    content: '';\n    position: absolute;\n    top: var(--spot-y, 50%);\n    left: var(--spot-x, 50%);\n    width: 250px;\n    height: 250px;\n    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);\n    transform: translate(-50%, -50%);\n    opacity: 0;\n    transition: opacity 0.3s ease;\n    pointer-events: none;\n    z-index: 1;\n}\n.card-spotlight:hover::before {\n    opacity: 1;\n}\n.card-spotlight:hover {\n    border-color: #c4b5fd;\n    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.1);\n}\n.card-spotlight > * {\n    position: relative;\n    z-index: 2;\n}"
  },
  {
    "name": "Card Reveal",
    "className": "card-reveal",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-reveal {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n    transition: box-shadow 0.3s ease;\n}\n.card-reveal .card-reveal-overlay {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(to top, rgba(124, 58, 237, 0.95) 0%, rgba(99, 102, 241, 0.85) 100%);\n    color: #fff;\n    padding: 24px;\n    box-sizing: border-box;\n    transform: translateY(101%);\n    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n}\n.card-reveal:hover .card-reveal-overlay {\n    transform: translateY(0);\n}\n.card-reveal:hover {\n    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);\n}"
  },
  {
    "name": "Card Border Glow",
    "className": "card-border-glow",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-border-glow {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 2px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: box-shadow 0.3s ease;\n    background-clip: padding-box;\n}\n.card-border-glow::before {\n    content: '';\n    position: absolute;\n    inset: -2px;\n    border-radius: 14px;\n    background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8, #a78bfa, #7c3aed);\n    background-size: 300% 300%;\n    z-index: -1;\n    opacity: 0;\n    transition: opacity 0.4s ease;\n    animation: card-border-glow-rotate 3s linear infinite;\n}\n.card-border-glow:hover::before {\n    opacity: 1;\n}\n.card-border-glow:hover {\n    border-color: transparent;\n    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);\n}\n@keyframes card-border-glow-rotate {\n    0%   { background-position: 0% 50%; }\n    50%  { background-position: 100% 50%; }\n    100% { background-position: 0% 50%; }\n}"
  },
  {
    "name": "Card Split",
    "className": "card-split",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-split {\n    position: relative;\n    background: transparent;\n    border-radius: 12px;\n    padding: 0;\n    border: none;\n    box-shadow: none;\n    min-height: 200px;\n}\n.card-split .card-split-top,\n.card-split .card-split-bottom {\n    position: relative;\n    width: 100%;\n    background: #fff;\n    border: 1px solid #e5e7eb;\n    box-sizing: border-box;\n    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n    overflow: hidden;\n}\n.card-split .card-split-top {\n    border-radius: 12px 12px 0 0;\n    padding: 24px 24px 12px;\n    z-index: 2;\n}\n.card-split .card-split-bottom {\n    border-radius: 0 0 12px 12px;\n    padding: 12px 24px 24px;\n    z-index: 2;\n}\n.card-split .card-split-hidden {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(135deg, #7c3aed, #6366f1);\n    border-radius: 12px;\n    color: #fff;\n    padding: 24px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1;\n}\n.card-split:hover .card-split-top {\n    transform: translateY(-20px) rotateX(8deg);\n    transform-origin: bottom center;\n}\n.card-split:hover .card-split-bottom {\n    transform: translateY(20px) rotateX(-8deg);\n    transform-origin: top center;\n}"
  },
  {
    "name": "Card Fold Corner",
    "className": "card-fold-corner",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-fold-corner {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    padding-top: 40px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: box-shadow 0.3s ease;\n}\n.card-fold-corner::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 0 40px 40px 0;\n    border-color: transparent #e5e7eb transparent transparent;\n    border-top-right-radius: 12px;\n    transition: border-width 0.4s ease, border-color 0.4s ease;\n}\n.card-fold-corner::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 40px;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 40px 40px 0 0;\n    border-color: #f3f0ff transparent transparent transparent;\n    transition: right 0.4s ease, border-width 0.4s ease;\n    z-index: 1;\n}\n.card-fold-corner:hover::before {\n    border-width: 0 60px 60px 0;\n    border-color: transparent #c4b5fd transparent transparent;\n}\n.card-fold-corner:hover::after {\n    right: 60px;\n    border-width: 60px 60px 0 0;\n}\n.card-fold-corner:hover {\n    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.12);\n}"
  },
  {
    "name": "Card Slide Up",
    "className": "card-slide-up",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-slide-up {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n    transition: box-shadow 0.3s ease;\n}\n.card-slide-up .card-slide-up-content {\n    transform: translateY(30px);\n    opacity: 0;\n    transition: transform 0.4s ease, opacity 0.4s ease;\n}\n.card-slide-up:hover .card-slide-up-content {\n    transform: translateY(0);\n    opacity: 1;\n}\n.card-slide-up:hover {\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n}"
  },
  {
    "name": "Card Glass",
    "className": "card-glass",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-glass {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: background 0.4s ease, border-color 0.4s ease,\n                box-shadow 0.4s ease, backdrop-filter 0.4s ease;\n}\n.card-glass::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2));\n    opacity: 0;\n    transition: opacity 0.4s ease;\n    pointer-events: none;\n    z-index: 0;\n}\n.card-glass:hover {\n    background: rgba(255, 255, 255, 0.15);\n    border-color: rgba(255, 255, 255, 0.3);\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n}\n.card-glass:hover::before {\n    opacity: 1;\n}\n.card-glass > * {\n    position: relative;\n    z-index: 1;\n}"
  },
  {
    "name": "Card Expand",
    "className": "card-expand",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-expand {\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: transform 0.35s ease, box-shadow 0.35s ease;\n}\n.card-expand .card-expand-extra {\n    max-height: 0;\n    overflow: hidden;\n    opacity: 0;\n    transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;\n    margin-top: 0;\n}\n.card-expand:hover .card-expand-extra {\n    max-height: 200px;\n    opacity: 1;\n    margin-top: 16px;\n}\n.card-expand:hover {\n    transform: scale(1.02);\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}"
  },
  {
    "name": "Card Skew Reveal",
    "className": "card-skew-reveal",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-skew-reveal {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n    transition: box-shadow 0.3s ease;\n}\n.card-skew-reveal .card-skew-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(135deg, rgba(124, 58, 237, 0.92), rgba(99, 102, 241, 0.88));\n    color: #fff;\n    padding: 24px;\n    box-sizing: border-box;\n    transform: translateX(-110%) skewX(-12deg);\n    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    border-radius: 12px;\n}\n.card-skew-reveal:hover .card-skew-overlay {\n    transform: translateX(0) skewX(0);\n}\n.card-skew-reveal:hover {\n    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);\n}"
  },
  {
    "name": "Card Holographic",
    "className": "card-holographic",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-holographic {\n    position: relative;\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 1px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n    transition: box-shadow 0.3s ease, transform 0.3s ease;\n}\n.card-holographic::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(\n        125deg,\n        rgba(255, 0, 128, 0.2),\n        rgba(255, 165, 0, 0.2),\n        rgba(255, 255, 0, 0.2),\n        rgba(0, 200, 83, 0.2),\n        rgba(0, 176, 255, 0.2),\n        rgba(124, 58, 237, 0.2),\n        rgba(255, 0, 128, 0.2)\n    );\n    background-size: 400% 400%;\n    border-radius: 12px;\n    opacity: 0;\n    transition: opacity 0.4s ease;\n    animation: card-holo-shift 4s ease infinite;\n    pointer-events: none;\n    z-index: 0;\n    mix-blend-mode: overlay;\n}\n.card-holographic:hover::before {\n    opacity: 1;\n}\n.card-holographic:hover {\n    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.18);\n    transform: translateY(-4px);\n}\n.card-holographic > * {\n    position: relative;\n    z-index: 1;\n}\n@keyframes card-holo-shift {\n    0%   { background-position: 0% 50%; }\n    50%  { background-position: 100% 50%; }\n    100% { background-position: 0% 50%; }\n}"
  },
  {
    "name": "Card Pulse Border",
    "className": "card-pulse-border",
    "category": "button-card",
    "displayType": "card",
    "css": ".card-pulse-border {\n    background: #fff;\n    border-radius: 12px;\n    padding: 24px;\n    border: 2px solid #e5e7eb;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n    transition: border-color 0.3s ease;\n}\n.card-pulse-border:hover {\n    animation: card-pulse-border-anim 1.5s ease-in-out infinite;\n}\n@keyframes card-pulse-border-anim {\n    0%   { border-color: #7c3aed; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.3); }\n    50%  { border-color: #a78bfa; box-shadow: 0 0 0 6px rgba(124, 58, 237, 0); }\n    100% { border-color: #7c3aed; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.3); }\n}"
  },
  {
    "name": "Image Zoom In",
    "className": "rc-img-zoom-in",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-zoom-in {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-zoom-in img {\n  transition: transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.rc-img-zoom-in:hover img {\n  transform: scale(1.1);\n}"
  },
  {
    "name": "Image Zoom Out",
    "className": "rc-img-zoom-out",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-zoom-out {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-zoom-out img {\n  transition: transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(1.1);\n}\n.rc-img-zoom-out:hover img {\n  transform: scale(1);\n}"
  },
  {
    "name": "Image Pan Right",
    "className": "rc-img-pan-right",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-pan-right {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-pan-right img {\n  transition: transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(1.15) translateX(-5%);\n}\n.rc-img-pan-right:hover img {\n  transform: scale(1.15) translateX(5%);\n}"
  },
  {
    "name": "Image Pan Left",
    "className": "rc-img-pan-left",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-pan-left {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-pan-left img {\n  transition: transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(1.15) translateX(5%);\n}\n.rc-img-pan-left:hover img {\n  transform: scale(1.15) translateX(-5%);\n}"
  },
  {
    "name": "Image Blur Reveal",
    "className": "rc-img-blur-reveal",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-blur-reveal {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-blur-reveal img {\n  transition: filter 0.5s ease, transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: blur(5px);\n  transform: scale(1.05);\n}\n.rc-img-blur-reveal:hover img {\n  filter: blur(0);\n  transform: scale(1);\n}"
  },
  {
    "name": "Image Grayscale",
    "className": "rc-img-grayscale",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-grayscale {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-grayscale img {\n  transition: filter 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: grayscale(100%);\n}\n.rc-img-grayscale:hover img {\n  filter: grayscale(0%);\n}"
  },
  {
    "name": "Image Sepia",
    "className": "rc-img-sepia",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-sepia {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-sepia img {\n  transition: filter 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: sepia(100%);\n}\n.rc-img-sepia:hover img {\n  filter: sepia(0%);\n}"
  },
  {
    "name": "Image Brightness",
    "className": "rc-img-brightness",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-brightness {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-brightness img {\n  transition: filter 0.4s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: brightness(0.7);\n}\n.rc-img-brightness:hover img {\n  filter: brightness(1.2);\n}"
  },
  {
    "name": "Image Contrast",
    "className": "rc-img-contrast",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-contrast {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-contrast img {\n  transition: filter 0.4s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: contrast(0.7) brightness(0.9);\n}\n.rc-img-contrast:hover img {\n  filter: contrast(1.2) brightness(1);\n}"
  },
  {
    "name": "Image Rotate Zoom",
    "className": "rc-img-rotate-zoom",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-rotate-zoom {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-rotate-zoom img {\n  transition: transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.rc-img-rotate-zoom:hover img {\n  transform: scale(1.1) rotate(3deg);\n}"
  },
  {
    "name": "Image Overlay Slide Up",
    "className": "rc-img-overlay-up",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-overlay-up {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-overlay-up img {\n  transition: transform 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.rc-img-overlay-up:hover img {\n  transform: scale(1.05);\n}\n.rc-img-overlay-up::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 60%);\n  opacity: 0;\n  transform: translateY(100%);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n.rc-img-overlay-up:hover::after {\n  opacity: 1;\n  transform: translateY(0);\n}"
  },
  {
    "name": "Image Overlay Fade",
    "className": "rc-img-overlay-fade",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-overlay-fade {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-overlay-fade img {\n  transition: filter 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.rc-img-overlay-fade:hover img {\n  filter: brightness(0.7);\n}\n.rc-img-overlay-fade::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  transition: opacity 0.4s ease;\n}\n.rc-img-overlay-fade:hover::after {\n  opacity: 1;\n}"
  },
  {
    "name": "Image Split Reveal",
    "className": "rc-img-split-reveal",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-split-reveal {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-split-reveal img {\n  transition: clip-path 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  clip-path: inset(0 0 0 0);\n}\n.rc-img-split-reveal:hover img {\n  clip-path: inset(0 50% 0 50%);\n}\n.rc-img-split-reveal::after {\n  content: attr(data-label);\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 1.25rem;\n  font-weight: 600;\n  background: rgba(0, 0, 0, 0.6);\n  opacity: 0;\n  transition: opacity 0.4s ease 0.15s;\n}\n.rc-img-split-reveal:hover::after {\n  opacity: 1;\n}"
  },
  {
    "name": "Image Shutter",
    "className": "rc-img-shutter",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-shutter {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-shutter img {\n  transition: clip-path 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  clip-path: inset(0 0 0 0);\n}\n.rc-img-shutter:hover img {\n  clip-path: inset(48% 48% 48% 48%);\n}\n.rc-img-shutter::before,\n.rc-img-shutter::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  width: 50%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.85);\n  z-index: 1;\n  transition: transform 0.5s ease;\n}\n.rc-img-shutter::before {\n  left: 0;\n  transform: translateX(-100%);\n}\n.rc-img-shutter::after {\n  content: '';\n  right: 0;\n  left: auto;\n  transform: translateX(100%);\n}\n.rc-img-shutter:hover::before {\n  transform: translateX(0);\n}\n.rc-img-shutter:hover::after {\n  transform: translateX(0);\n}"
  },
  {
    "name": "Image Circle Reveal",
    "className": "rc-img-circle-reveal",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-circle-reveal {\n  overflow: hidden;\n  position: relative;\n}\n.rc-img-circle-reveal img {\n  transition: clip-path 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: grayscale(100%) contrast(1.1);\n  clip-path: circle(0% at 50% 50%);\n}\n.rc-img-circle-reveal:hover img {\n  clip-path: circle(75% at 50% 50%);\n  filter: grayscale(0%) contrast(1);\n}\n.rc-img-circle-reveal::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.3);\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n}\n.rc-img-circle-reveal:hover::after {\n  opacity: 0;\n}"
  },
  {
    "name": "Image Tilt 3D",
    "className": "rc-img-tilt-3d",
    "category": "hover",
    "displayType": "image",
    "css": ".rc-img-tilt-3d {\n  overflow: hidden;\n  position: relative;\n  perspective: 800px;\n}\n.rc-img-tilt-3d img {\n  transition: transform 0.5s ease, box-shadow 0.5s ease;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: rotateX(0) rotateY(0);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.rc-img-tilt-3d:hover img {\n  transform: rotateX(-3deg) rotateY(3deg) scale(1.03);\n  box-shadow: 8px 12px 28px rgba(0, 0, 0, 0.35);\n}"
  },
  {
    "name": "Circle Reveal In",
    "className": "rc-circle-reveal-in",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-circle-reveal-in {\n    animation: rcCircleRevealIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcCircleRevealIn {\n    0%   { clip-path: circle(0% at 50% 50%); }\n    100% { clip-path: circle(75% at 50% 50%); }\n}"
  },
  {
    "name": "Circle Reveal Out",
    "className": "rc-circle-reveal-out",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-circle-reveal-out {\n    animation: rcCircleRevealOut 0.8s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;\n}\n@keyframes rcCircleRevealOut {\n    0%   { clip-path: circle(75% at 50% 50%); }\n    100% { clip-path: circle(0% at 50% 50%); }\n}"
  },
  {
    "name": "Diamond Reveal",
    "className": "rc-diamond-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-diamond-reveal {\n    animation: rcDiamondReveal 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcDiamondReveal {\n    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); }\n    40%  { clip-path: polygon(50% 10%, 90% 50%, 50% 90%, 10% 50%); }\n    100% { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }\n}"
  },
  {
    "name": "Triangle Reveal",
    "className": "rc-triangle-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-triangle-reveal {\n    animation: rcTriangleReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcTriangleReveal {\n    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%); }\n    50%  { clip-path: polygon(50% 15%, 85% 85%, 15% 85%); }\n    100% { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }\n}"
  },
  {
    "name": "Cross Reveal",
    "className": "rc-cross-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-cross-reveal {\n    animation: rcCrossReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcCrossReveal {\n    0%   { clip-path: polygon(\n        40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%,\n        60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%,\n        0% 40%, 40% 40%\n    ); opacity: 0; }\n    50%  { clip-path: polygon(\n        35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%,\n        65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%,\n        0% 35%, 35% 35%\n    ); opacity: 1; }\n    100% { clip-path: polygon(\n        0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%,\n        100% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%,\n        0% 0%, 0% 0%\n    ); opacity: 1; }\n}"
  },
  {
    "name": "Hexagon Reveal",
    "className": "rc-hexagon-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-hexagon-reveal {\n    animation: rcHexagonReveal 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcHexagonReveal {\n    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%,\n                              50% 50%, 50% 50%, 50% 50%); }\n    60%  { clip-path: polygon(50% 15%, 93% 35%, 93% 65%,\n                              50% 85%, 7% 65%, 7% 35%); }\n    100% { clip-path: polygon(50% 0%, 100% 25%, 100% 75%,\n                              50% 100%, 0% 75%, 0% 25%); }\n}"
  },
  {
    "name": "Star Reveal",
    "className": "rc-star-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-star-reveal {\n    animation: rcStarReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcStarReveal {\n    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%,\n                              50% 50%, 50% 50%, 50% 50%,\n                              50% 50%, 50% 50%, 50% 50%); }\n    50%  { clip-path: polygon(50% 20%, 61% 40%, 80% 40%, 65% 55%,\n                              75% 75%, 55% 65%, 50% 85%, 45% 65%,\n                              25% 75%, 35% 55%, 20% 40%, 39% 40%); }\n    100% { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%,\n                              79% 91%, 50% 70%, 21% 91%, 32% 57%,\n                              2% 35%, 39% 35%); }\n}"
  },
  {
    "name": "Slide Left Reveal",
    "className": "rc-slide-left-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-slide-left-reveal {\n    animation: rcSlideLeftReveal 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcSlideLeftReveal {\n    0%   { clip-path: inset(0 100% 0 0); }\n    100% { clip-path: inset(0 0% 0 0); }\n}"
  },
  {
    "name": "Slide Down Reveal",
    "className": "rc-slide-down-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-slide-down-reveal {\n    animation: rcSlideDownReveal 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcSlideDownReveal {\n    0%   { clip-path: inset(100% 0 0 0); }\n    100% { clip-path: inset(0% 0 0 0); }\n}"
  },
  {
    "name": "Wipe Reveal",
    "className": "rc-wipe-reveal",
    "category": "hover",
    "displayType": "box",
    "css": ".rc-wipe-reveal {\n    animation: rcWipeReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n}\n@keyframes rcWipeReveal {\n    0%   { clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); }\n    50%  { clip-path: polygon(0% 0%, 60% 0%, 40% 100%, 0% 100%); }\n    100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }\n}"
  },
  {
    "name": "Skeleton Pulse",
    "className": "rc-skeleton-pulse",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-pulse {\n    background-color: #e0e0e0;\n    animation: rcSkeletonPulse 1.5s ease-in-out infinite;\n    border-radius: 4px;\n}\n@keyframes rcSkeletonPulse {\n    0%, 100% { opacity: 1; }\n    50%      { opacity: 0.4; }\n}"
  },
  {
    "name": "Skeleton Shimmer",
    "className": "rc-skeleton-shimmer",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-shimmer {\n    background-color: #e0e0e0;\n    background-image: linear-gradient(\n        90deg,\n        #e0e0e0 0%,\n        #f0f0f0 20%,\n        #f8f8f8 50%,\n        #f0f0f0 80%,\n        #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonShimmer 1.8s ease-in-out infinite;\n    border-radius: 4px;\n}\n@keyframes rcSkeletonShimmer {\n    0%   { background-position: 200% 0; }\n    100% { background-position: -200% 0; }\n}"
  },
  {
    "name": "Skeleton Wave",
    "className": "rc-skeleton-wave",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-wave {\n    background-color: #e0e0e0;\n    position: relative;\n    overflow: hidden;\n    border-radius: 4px;\n}\n.rc-skeleton-wave::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: -100%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(\n        90deg,\n        transparent 0%,\n        rgba(255, 255, 255, 0.3) 25%,\n        rgba(255, 255, 255, 0.6) 50%,\n        rgba(255, 255, 255, 0.3) 75%,\n        transparent 100%\n    );\n    animation: rcSkeletonWave 2s ease-in-out infinite;\n}\n@keyframes rcSkeletonWave {\n    0%   { left: -100%; }\n    100% { left: 100%; }\n}"
  },
  {
    "name": "Skeleton Text",
    "className": "rc-skeleton-text",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-text {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n.rc-skeleton-text::before,\n.rc-skeleton-text::after {\n    content: '';\n    display: block;\n    background-color: #e0e0e0;\n    border-radius: 4px;\n    height: 14px;\n    background-image: linear-gradient(\n        90deg,\n        #e0e0e0 0%,\n        #f5f5f5 50%,\n        #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonText 1.6s ease-in-out infinite;\n}\n.rc-skeleton-text::before { width: 100%; }\n.rc-skeleton-text::after  { width: 65%; animation-delay: 0.15s; }\n.rc-skeleton-text > * {\n    background-color: #e0e0e0;\n    border-radius: 4px;\n    height: 14px;\n    background-image: linear-gradient(\n        90deg,\n        #e0e0e0 0%,\n        #f5f5f5 50%,\n        #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonText 1.6s ease-in-out infinite;\n}\n@keyframes rcSkeletonText {\n    0%   { background-position: 200% 0; }\n    100% { background-position: -200% 0; }\n}"
  },
  {
    "name": "Skeleton Card",
    "className": "rc-skeleton-card",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-card {\n    background-color: #f5f5f5;\n    border-radius: 8px;\n    padding: 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n    border: 1px solid #e8e8e8;\n}\n.rc-skeleton-card-header {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n.rc-skeleton-card-avatar {\n    width: 44px;\n    height: 44px;\n    border-radius: 50%;\n    background-color: #e0e0e0;\n    background-image: linear-gradient(\n        90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonCard 1.6s ease-in-out infinite;\n    flex-shrink: 0;\n}\n.rc-skeleton-card-lines {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n.rc-skeleton-card-line {\n    height: 12px;\n    border-radius: 4px;\n    background-color: #e0e0e0;\n    background-image: linear-gradient(\n        90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonCard 1.6s ease-in-out infinite;\n}\n.rc-skeleton-card-body {\n    height: 80px;\n    border-radius: 4px;\n    background-color: #e0e0e0;\n    background-image: linear-gradient(\n        90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonCard 1.6s ease-in-out infinite;\n    animation-delay: 0.1s;\n}\n@keyframes rcSkeletonCard {\n    0%   { background-position: 200% 0; }\n    100% { background-position: -200% 0; }\n}"
  },
  {
    "name": "Skeleton Circle",
    "className": "rc-skeleton-circle",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-circle {\n    width: 64px;\n    height: 64px;\n    border-radius: 50%;\n    background-color: #e0e0e0;\n    position: relative;\n    overflow: hidden;\n}\n.rc-skeleton-circle::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: -100%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(\n        90deg,\n        transparent 0%,\n        rgba(255, 255, 255, 0.4) 50%,\n        transparent 100%\n    );\n    animation: rcSkeletonCircle 1.5s ease-in-out infinite;\n}\n@keyframes rcSkeletonCircle {\n    0%   { left: -100%; }\n    100% { left: 100%; }\n}"
  },
  {
    "name": "Skeleton Grid",
    "className": "rc-skeleton-grid",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n}\n.rc-skeleton-grid-item {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n.rc-skeleton-grid-img {\n    width: 100%;\n    aspect-ratio: 1;\n    border-radius: 6px;\n    background-color: #e0e0e0;\n    background-image: linear-gradient(\n        90deg, #e0e0e0 0%, #f0f0f0 40%, #f8f8f8 50%, #f0f0f0 60%, #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonGrid 1.8s ease-in-out infinite;\n}\n.rc-skeleton-grid-line {\n    height: 12px;\n    border-radius: 4px;\n    background-color: #e0e0e0;\n    background-image: linear-gradient(\n        90deg, #e0e0e0 0%, #f0f0f0 40%, #f8f8f8 50%, #f0f0f0 60%, #e0e0e0 100%\n    );\n    background-size: 200% 100%;\n    animation: rcSkeletonGrid 1.8s ease-in-out infinite;\n}\n.rc-skeleton-grid-item:nth-child(2) .rc-skeleton-grid-img,\n.rc-skeleton-grid-item:nth-child(2) .rc-skeleton-grid-line { animation-delay: 0.15s; }\n.rc-skeleton-grid-item:nth-child(3) .rc-skeleton-grid-img,\n.rc-skeleton-grid-item:nth-child(3) .rc-skeleton-grid-line { animation-delay: 0.3s; }\n.rc-skeleton-grid-item:nth-child(4) .rc-skeleton-grid-img,\n.rc-skeleton-grid-item:nth-child(4) .rc-skeleton-grid-line { animation-delay: 0.1s; }\n.rc-skeleton-grid-item:nth-child(5) .rc-skeleton-grid-img,\n.rc-skeleton-grid-item:nth-child(5) .rc-skeleton-grid-line { animation-delay: 0.25s; }\n.rc-skeleton-grid-item:nth-child(6) .rc-skeleton-grid-img,\n.rc-skeleton-grid-item:nth-child(6) .rc-skeleton-grid-line { animation-delay: 0.4s; }\n@keyframes rcSkeletonGrid {\n    0%   { background-position: 200% 0; }\n    100% { background-position: -200% 0; }\n}"
  },
  {
    "name": "Skeleton Gradient",
    "className": "rc-skeleton-gradient",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-gradient {\n    background: linear-gradient(135deg, #d0d0d0 0%, #e8e8e8 50%, #d0d0d0 100%);\n    background-size: 200% 200%;\n    animation: rcSkeletonGradient 2s ease-in-out infinite;\n    border-radius: 4px;\n}\n@keyframes rcSkeletonGradient {\n    0%, 100% { background-position: 0% 50%; }\n    50%      { background-position: 100% 50%; }\n}"
  },
  {
    "name": "Skeleton Blink",
    "className": "rc-skeleton-blink",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-blink {\n    background-color: #e0e0e0;\n    animation: rcSkeletonBlink 1s step-end infinite;\n    border-radius: 4px;\n}\n@keyframes rcSkeletonBlink {\n    0%, 100% { opacity: 1; }\n    50%      { opacity: 0.2; }\n}"
  },
  {
    "name": "Skeleton Fade",
    "className": "rc-skeleton-fade",
    "category": "loaders",
    "displayType": "loader",
    "css": ".rc-skeleton-fade {\n    background-color: #e0e0e0;\n    animation: rcSkeletonFade 2s ease-in-out infinite;\n    border-radius: 4px;\n}\n@keyframes rcSkeletonFade {\n    0%, 100% { opacity: 1; background-color: #e0e0e0; }\n    50%      { opacity: 0.3; background-color: #d0d0d0; }\n}"
  },
  {
    "name": "Toggle Switch",
    "className": "rc-toggle-switch",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-toggle-switch {\n    position: relative;\n    width: 52px;\n    height: 28px;\n    appearance: none;\n    -webkit-appearance: none;\n    background-color: #ccc;\n    border-radius: 28px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    outline: none;\n    border: none;\n}\n.rc-toggle-switch::before {\n    content: '';\n    position: absolute;\n    top: 3px;\n    left: 3px;\n    width: 22px;\n    height: 22px;\n    background-color: #fff;\n    border-radius: 50%;\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),\n                box-shadow 0.3s ease;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.2);\n}\n.rc-toggle-switch:checked {\n    background-color: #4caf50;\n}\n.rc-toggle-switch:checked::before {\n    transform: translateX(24px);\n    box-shadow: 0 1px 5px rgba(0,0,0,0.25);\n}\n.rc-toggle-switch:focus-visible {\n    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);\n}"
  },
  {
    "name": "Checkbox Anim",
    "className": "rc-checkbox-anim",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-checkbox-anim {\n    position: relative;\n    width: 22px;\n    height: 22px;\n    appearance: none;\n    -webkit-appearance: none;\n    background-color: #fff;\n    border: 2px solid #bbb;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.2s ease, border-color 0.2s ease;\n    outline: none;\n}\n.rc-checkbox-anim:checked {\n    background-color: #2196f3;\n    border-color: #2196f3;\n    animation: rcCheckboxPop 0.3s ease;\n}\n.rc-checkbox-anim::before {\n    content: '';\n    position: absolute;\n    top: 3px;\n    left: 6px;\n    width: 6px;\n    height: 10px;\n    border: solid #fff;\n    border-width: 0 2px 2px 0;\n    transform: rotate(45deg) scale(0);\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;\n}\n.rc-checkbox-anim:checked::before {\n    transform: rotate(45deg) scale(1);\n}\n.rc-checkbox-anim:focus-visible {\n    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);\n}\n@keyframes rcCheckboxPop {\n    0%   { transform: scale(1); }\n    50%  { transform: scale(1.15); }\n    100% { transform: scale(1); }\n}"
  },
  {
    "name": "Radio Pulse",
    "className": "rc-radio-pulse",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-radio-pulse {\n    position: relative;\n    width: 22px;\n    height: 22px;\n    appearance: none;\n    -webkit-appearance: none;\n    background-color: #fff;\n    border: 2px solid #bbb;\n    border-radius: 50%;\n    cursor: pointer;\n    transition: border-color 0.2s ease;\n    outline: none;\n}\n.rc-radio-pulse::after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 10px;\n    height: 10px;\n    background-color: #2196f3;\n    border-radius: 50%;\n    transform: translate(-50%, -50%) scale(0);\n    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.rc-radio-pulse:checked {\n    border-color: #2196f3;\n    animation: rcRadioPulseRing 0.4s ease;\n}\n.rc-radio-pulse:checked::after {\n    transform: translate(-50%, -50%) scale(1);\n}\n.rc-radio-pulse:focus-visible {\n    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);\n}\n@keyframes rcRadioPulseRing {\n    0%   { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4); }\n    70%  { box-shadow: 0 0 0 8px rgba(33, 150, 243, 0); }\n    100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }\n}"
  },
  {
    "name": "Input Focus Glow",
    "className": "rc-input-focus-glow",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-input-focus-glow {\n    padding: 10px 14px;\n    border: 2px solid #ddd;\n    border-radius: 8px;\n    font-size: 14px;\n    outline: none;\n    transition: border-color 0.3s ease, box-shadow 0.3s ease;\n    background-color: #fff;\n}\n.rc-input-focus-glow:focus {\n    border-color: #7c4dff;\n    box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.2),\n                0 0 12px rgba(124, 77, 255, 0.15);\n}\n.rc-input-focus-glow::placeholder {\n    color: #aaa;\n    transition: color 0.3s ease;\n}\n.rc-input-focus-glow:focus::placeholder {\n    color: #ccc;\n}"
  },
  {
    "name": "Input Float Label",
    "className": "rc-input-float-label",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-input-float-label-wrapper {\n    position: relative;\n}\n.rc-input-float-label {\n    padding: 18px 14px 6px 14px;\n    border: 2px solid #ddd;\n    border-radius: 8px;\n    font-size: 14px;\n    outline: none;\n    transition: border-color 0.3s ease, box-shadow 0.3s ease;\n    background-color: transparent;\n    width: 100%;\n    box-sizing: border-box;\n}\n.rc-input-float-label::placeholder {\n    color: transparent;\n}\n.rc-input-float-label-label {\n    position: absolute;\n    top: 50%;\n    left: 14px;\n    transform: translateY(-50%);\n    font-size: 14px;\n    color: #999;\n    pointer-events: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    background-color: #fff;\n    padding: 0 4px;\n}\n.rc-input-float-label:focus ~ .rc-input-float-label-label,\n.rc-input-float-label:not(:placeholder-shown) ~ .rc-input-float-label-label {\n    top: 0;\n    font-size: 11px;\n    color: #7c4dff;\n    transform: translateY(-50%);\n}\n.rc-input-float-label:focus {\n    border-color: #7c4dff;\n    box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.15);\n}"
  },
  {
    "name": "Tooltip Fade",
    "className": "rc-tooltip-fade",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-tooltip-fade-wrapper {\n    position: relative;\n    display: inline-block;\n}\n.rc-tooltip-fade {\n    position: absolute;\n    bottom: calc(100% + 8px);\n    left: 50%;\n    transform: translateX(-50%) translateY(4px);\n    background-color: #333;\n    color: #fff;\n    padding: 6px 12px;\n    border-radius: 6px;\n    font-size: 13px;\n    white-space: nowrap;\n    opacity: 0;\n    visibility: hidden;\n    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;\n    pointer-events: none;\n    z-index: 10;\n}\n.rc-tooltip-fade::after {\n    content: '';\n    position: absolute;\n    top: 100%;\n    left: 50%;\n    transform: translateX(-50%);\n    border: 5px solid transparent;\n    border-top-color: #333;\n}\n.rc-tooltip-fade-wrapper:hover .rc-tooltip-fade {\n    opacity: 1;\n    visibility: visible;\n    transform: translateX(-50%) translateY(0);\n}"
  },
  {
    "name": "Accordion Slide",
    "className": "rc-accordion-slide",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-accordion-slide {\n    overflow: hidden;\n    max-height: 0;\n    opacity: 0;\n    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n                opacity 0.3s ease,\n                padding 0.3s ease;\n    padding: 0 16px;\n}\n.rc-accordion-trigger:checked ~ .rc-accordion-slide,\n.rc-accordion-slide.rc-open {\n    max-height: 500px;\n    opacity: 1;\n    padding: 16px;\n}\n.rc-accordion-trigger {\n    display: none;\n}\n.rc-accordion-trigger-label {\n    display: block;\n    padding: 14px 16px;\n    cursor: pointer;\n    font-weight: 600;\n    background-color: #f5f5f5;\n    border-radius: 8px;\n    transition: background-color 0.2s ease;\n    user-select: none;\n}\n.rc-accordion-trigger-label:hover {\n    background-color: #eee;\n}\n.rc-accordion-trigger:checked ~ .rc-accordion-trigger-label {\n    border-radius: 8px 8px 0 0;\n    background-color: #e8e8e8;\n}\n.rc-accordion-trigger-label::after {\n    content: '+';\n    float: right;\n    font-size: 18px;\n    line-height: 1;\n    transition: transform 0.3s ease;\n}\n.rc-accordion-trigger:checked ~ .rc-accordion-trigger-label::after {\n    content: '\\2212';\n    transform: rotate(180deg);\n}"
  },
  {
    "name": "Tab Underline",
    "className": "rc-tab-underline",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-tab-underline-group {\n    position: relative;\n    display: flex;\n    gap: 0;\n    border-bottom: 2px solid #e0e0e0;\n}\n.rc-tab-underline {\n    padding: 10px 20px;\n    cursor: pointer;\n    font-size: 14px;\n    font-weight: 500;\n    color: #777;\n    background: none;\n    border: none;\n    outline: none;\n    position: relative;\n    transition: color 0.3s ease;\n}\n.rc-tab-underline::after {\n    content: '';\n    position: absolute;\n    bottom: -2px;\n    left: 50%;\n    width: 0;\n    height: 2px;\n    background-color: #2196f3;\n    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.rc-tab-underline:hover {\n    color: #333;\n}\n.rc-tab-underline:hover::after {\n    width: 100%;\n    left: 0;\n}\n.rc-tab-underline.rc-active,\n.rc-tab-underline:active {\n    color: #2196f3;\n}\n.rc-tab-underline.rc-active::after,\n.rc-tab-underline:active::after {\n    width: 100%;\n    left: 0;\n}"
  },
  {
    "name": "Dropdown Slide",
    "className": "rc-dropdown-slide",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-dropdown-slide-wrapper {\n    position: relative;\n    display: inline-block;\n}\n.rc-dropdown-slide {\n    position: absolute;\n    top: calc(100% + 4px);\n    left: 0;\n    min-width: 180px;\n    background-color: #fff;\n    border: 1px solid #e0e0e0;\n    border-radius: 8px;\n    box-shadow: 0 8px 24px rgba(0,0,0,0.1);\n    padding: 6px 0;\n    opacity: 0;\n    visibility: hidden;\n    transform: translateY(-8px);\n    transition: opacity 0.25s ease,\n                transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),\n                visibility 0.25s;\n    z-index: 20;\n}\n.rc-dropdown-slide-wrapper:focus-within .rc-dropdown-slide,\n.rc-dropdown-slide-wrapper:hover .rc-dropdown-slide {\n    opacity: 1;\n    visibility: visible;\n    transform: translateY(0);\n}\n.rc-dropdown-slide-item {\n    display: block;\n    width: 100%;\n    padding: 8px 16px;\n    border: none;\n    background: none;\n    text-align: left;\n    font-size: 14px;\n    cursor: pointer;\n    color: #333;\n    transition: background-color 0.15s ease;\n}\n.rc-dropdown-slide-item:hover {\n    background-color: #f0f4ff;\n}\n.rc-dropdown-slide-item:first-child {\n    border-radius: 8px 8px 0 0;\n}\n.rc-dropdown-slide-item:last-child {\n    border-radius: 0 0 8px 8px;\n}"
  },
  {
    "name": "Notification Slide In",
    "className": "rc-notification-slide-in",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-notification-slide-in {\n    position: relative;\n    padding: 14px 20px;\n    background-color: #fff;\n    border-radius: 8px;\n    box-shadow: 0 4px 16px rgba(0,0,0,0.12);\n    border-left: 4px solid #4caf50;\n    animation: rcNotificationSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;\n    max-width: 360px;\n}\n@keyframes rcNotificationSlideIn {\n    0% {\n        opacity: 0;\n        transform: translateX(100%);\n    }\n    100% {\n        opacity: 1;\n        transform: translateX(0);\n    }\n}\n.rc-notification-slide-in.rc-exit {\n    animation: rcNotificationSlideOut 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;\n}\n@keyframes rcNotificationSlideOut {\n    0% {\n        opacity: 1;\n        transform: translateX(0);\n    }\n    100% {\n        opacity: 0;\n        transform: translateX(100%);\n    }\n}"
  },
  {
    "name": "Progress Bar Fill",
    "className": "rc-progress-bar-fill",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-progress-bar-fill-track {\n    width: 100%;\n    height: 10px;\n    background-color: #e8e8e8;\n    border-radius: 10px;\n    overflow: hidden;\n    position: relative;\n}\n.rc-progress-bar-fill {\n    height: 100%;\n    background: linear-gradient(90deg, #4caf50, #66bb6a);\n    border-radius: 10px;\n    width: 0%;\n    transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    position: relative;\n    overflow: hidden;\n}\n.rc-progress-bar-fill::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(\n        90deg,\n        transparent 0%,\n        rgba(255, 255, 255, 0.3) 50%,\n        transparent 100%\n    );\n    background-size: 200% 100%;\n    animation: rcProgressStripe 1s linear infinite;\n}\n.rc-progress-bar-fill.rc-animated {\n    width: 75%;\n}\n@keyframes rcProgressStripe {\n    0%   { background-position: -200% 0; }\n    100% { background-position: 200% 0; }\n}"
  },
  {
    "name": "Ripple Click",
    "className": "rc-ripple-click",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-ripple-click {\n    position: relative;\n    overflow: hidden;\n    cursor: pointer;\n    -webkit-tap-highlight-color: transparent;\n}\n.rc-ripple-click::after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 0;\n    height: 0;\n    border-radius: 50%;\n    background-color: rgba(255, 255, 255, 0.35);\n    transform: translate(-50%, -50%) scale(0);\n    transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;\n    opacity: 0;\n    pointer-events: none;\n}\n.rc-ripple-click:active::after {\n    width: 300px;\n    height: 300px;\n    opacity: 1;\n    transition: width 0s, height 0s, opacity 0s;\n}\n.rc-ripple-click:not(:active)::after {\n    transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;\n}"
  },
  {
    "name": "Blur In",
    "className": "rc-blur-in",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-blur-in {\n  0% { filter: blur(12px); }\n  100% { filter: blur(0px); }\n}\n.rc-blur-in {\n  animation: rc-blur-in 0.8s ease-out both;\n}"
  },
  {
    "name": "Blur Out",
    "className": "rc-blur-out",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-blur-out {\n  0% { filter: blur(0px); }\n  100% { filter: blur(14px); }\n}\n.rc-blur-out {\n  animation: rc-blur-out 0.8s ease-in both;\n}"
  },
  {
    "name": "Grayscale In",
    "className": "rc-grayscale-in",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-grayscale-in {\n  0% { filter: grayscale(1); }\n  100% { filter: grayscale(0); }\n}\n.rc-grayscale-in {\n  animation: rc-grayscale-in 1s ease-out both;\n}"
  },
  {
    "name": "Grayscale Out",
    "className": "rc-grayscale-out",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-grayscale-out {\n  0% { filter: grayscale(0); }\n  100% { filter: grayscale(1); }\n}\n.rc-grayscale-out {\n  animation: rc-grayscale-out 1s ease-in both;\n}"
  },
  {
    "name": "Sepia In",
    "className": "rc-sepia-in",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-sepia-in {\n  0% { filter: sepia(1); }\n  100% { filter: sepia(0); }\n}\n.rc-sepia-in {\n  animation: rc-sepia-in 1.2s ease-out both;\n}"
  },
  {
    "name": "Sepia Out",
    "className": "rc-sepia-out",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-sepia-out {\n  0% { filter: sepia(0); }\n  100% { filter: sepia(1); }\n}\n.rc-sepia-out {\n  animation: rc-sepia-out 1.2s ease-in both;\n}"
  },
  {
    "name": "Saturate Pulse",
    "className": "rc-saturate-pulse",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-saturate-pulse {\n  0%, 100% { filter: saturate(1); }\n  50% { filter: saturate(2.5); }\n}\n.rc-saturate-pulse {\n  animation: rc-saturate-pulse 2s ease-in-out infinite;\n}"
  },
  {
    "name": "Hue Rotate",
    "className": "rc-hue-rotate",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-hue-rotate {\n  0% { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}\n.rc-hue-rotate {\n  animation: rc-hue-rotate 4s linear infinite;\n}"
  },
  {
    "name": "Invert Flash",
    "className": "rc-invert-flash",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-invert-flash {\n  0%, 40%, 60%, 100% { filter: invert(0); }\n  45%, 55% { filter: invert(1); }\n}\n.rc-invert-flash {\n  animation: rc-invert-flash 2s ease-in-out infinite;\n}"
  },
  {
    "name": "Brightness Pulse",
    "className": "rc-brightness-pulse",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-brightness-pulse {\n  0%, 100% { filter: brightness(1); }\n  50% { filter: brightness(1.4); }\n}\n.rc-brightness-pulse {\n  animation: rc-brightness-pulse 2.5s ease-in-out infinite;\n}"
  },
  {
    "name": "Contrast Switch",
    "className": "rc-contrast-switch",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-contrast-switch {\n  0%, 45%, 55%, 100% { filter: contrast(1); }\n  50% { filter: contrast(1.8); }\n}\n.rc-contrast-switch {\n  animation: rc-contrast-switch 3s ease-in-out infinite;\n}"
  },
  {
    "name": "Vintage",
    "className": "rc-vintage",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-vintage {\n  0%, 100% {\n    filter: sepia(0.5) contrast(1.1) brightness(0.95);\n  }\n  50% {\n    filter: sepia(0.7) contrast(1.15) brightness(0.85);\n  }\n}\n.rc-vintage {\n  animation: rc-vintage 4s ease-in-out infinite;\n}"
  },
  {
    "name": "Rain",
    "className": "rc-rain",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-rain-fall {\n  0% { transform: translateY(-100%); }\n  100% { transform: translateY(100vh); }\n}\n.rc-rain {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%);\n}\n.rc-rain::before,\n.rc-rain::after {\n  content: '';\n  position: absolute;\n  top: -100%;\n  width: 2px;\n  height: 80px;\n  background: linear-gradient(to bottom, transparent, rgba(174, 194, 224, 0.5), transparent);\n  border-radius: 0 0 2px 2px;\n}\n.rc-rain::before {\n  left: 15%;\n  box-shadow:\n    80px 0 rgba(174, 194, 224, 0.4),\n    160px 0 rgba(174, 194, 224, 0.3),\n    240px 0 rgba(174, 194, 224, 0.5),\n    320px 0 rgba(174, 194, 224, 0.2),\n    400px 0 rgba(174, 194, 224, 0.4),\n    480px 0 rgba(174, 194, 224, 0.3),\n    560px 0 rgba(174, 194, 224, 0.5),\n    640px 0 rgba(174, 194, 224, 0.2),\n    720px 0 rgba(174, 194, 224, 0.4),\n    800px 0 rgba(174, 194, 224, 0.3);\n  animation: rc-rain-fall 0.7s linear infinite;\n}\n.rc-rain::after {\n  left: 45%;\n  box-shadow:\n    60px 0 rgba(174, 194, 224, 0.3),\n    140px 0 rgba(174, 194, 224, 0.5),\n    220px 0 rgba(174, 194, 224, 0.2),\n    300px 0 rgba(174, 194, 224, 0.4),\n    380px 0 rgba(174, 194, 224, 0.3),\n    460px 0 rgba(174, 194, 224, 0.5),\n    540px 0 rgba(174, 194, 224, 0.2),\n    620px 0 rgba(174, 194, 224, 0.4),\n    700px 0 rgba(174, 194, 224, 0.3),\n    780px 0 rgba(174, 194, 224, 0.5);\n  animation: rc-rain-fall 0.9s linear infinite;\n  animation-delay: -0.3s;\n}"
  },
  {
    "name": "Snow",
    "className": "rc-snow",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-snow-fall {\n  0% { transform: translateY(-10%) translateX(0); opacity: 1; }\n  50% { transform: translateY(50vh) translateX(20px); opacity: 0.8; }\n  100% { transform: translateY(100vh) translateX(-10px); opacity: 0; }\n}\n.rc-snow {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #2c3e6b 0%, #4a6fa1 40%, #6b8cae 100%);\n}\n.rc-snow::before,\n.rc-snow::after {\n  content: '';\n  position: absolute;\n  top: -5%;\n  width: 6px;\n  height: 6px;\n  background: white;\n  border-radius: 50%;\n  opacity: 0.9;\n  box-shadow:\n    30px 15px 0 1px rgba(255,255,255,0.7),\n    70px 40px 0 2px rgba(255,255,255,0.5),\n    120px 10px 0 0px rgba(255,255,255,0.8),\n    180px 60px 0 1px rgba(255,255,255,0.4),\n    240px 25px 0 2px rgba(255,255,255,0.6),\n    300px 50px 0 0px rgba(255,255,255,0.7),\n    370px 5px 0 1px rgba(255,255,255,0.5),\n    440px 35px 0 2px rgba(255,255,255,0.3),\n    520px 55px 0 0px rgba(255,255,255,0.6),\n    600px 20px 0 1px rgba(255,255,255,0.8);\n}\n.rc-snow::before {\n  left: 10%;\n  animation: rc-snow-fall 4s linear infinite;\n}\n.rc-snow::after {\n  left: 55%;\n  box-shadow:\n    40px 30px 0 1px rgba(255,255,255,0.6),\n    90px 10px 0 2px rgba(255,255,255,0.4),\n    150px 45px 0 0px rgba(255,255,255,0.7),\n    210px 20px 0 1px rgba(255,255,255,0.5),\n    280px 55px 0 2px rgba(255,255,255,0.3),\n    350px 15px 0 0px rgba(255,255,255,0.8),\n    420px 40px 0 1px rgba(255,255,255,0.6),\n    500px 8px 0 2px rgba(255,255,255,0.4),\n    570px 50px 0 0px rgba(255,255,255,0.7),\n    650px 28px 0 1px rgba(255,255,255,0.5);\n  animation: rc-snow-fall 5s linear infinite;\n  animation-delay: -2s;\n}"
  },
  {
    "name": "Lightning",
    "className": "rc-lightning",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-lightning-flash {\n  0%, 88%, 92%, 96%, 100% { opacity: 0; }\n  89% { opacity: 0.8; }\n  91% { opacity: 0.1; }\n  93% { opacity: 0.6; }\n  95% { opacity: 0; }\n}\n.rc-lightning {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #1a1a2e 0%, #2d2d44 100%);\n}\n.rc-lightning::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(200,200,255,0.4) 30%, transparent 70%);\n  opacity: 0;\n  animation: rc-lightning-flash 6s ease-in-out infinite;\n}\n.rc-lightning::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 48%;\n  width: 4%;\n  height: 100%;\n  background: linear-gradient(to bottom,\n    transparent 5%,\n    rgba(180,180,255,0.9) 10%,\n    transparent 12%,\n    rgba(200,200,255,0.7) 20%,\n    transparent 22%,\n    rgba(180,180,255,0.8) 35%,\n    transparent 37%,\n    rgba(200,200,255,0.6) 50%,\n    transparent 52%,\n    rgba(180,180,255,0.7) 65%,\n    transparent 67%,\n    rgba(200,200,255,0.5) 80%,\n    transparent 82%\n  );\n  opacity: 0;\n  animation: rc-lightning-flash 6s ease-in-out infinite;\n  animation-delay: 0.05s;\n}"
  },
  {
    "name": "Clouds",
    "className": "rc-clouds",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-cloud-drift-1 {\n  0% { transform: translateX(-120%); }\n  100% { transform: translateX(calc(100vw + 50%)); }\n}\n@keyframes rc-cloud-drift-2 {\n  0% { transform: translateX(calc(100vw + 30%)); }\n  100% { transform: translateX(-150%); }\n}\n.rc-clouds {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #87CEEB 0%, #b0d4e8 60%, #d4e8f0 100%);\n}\n.rc-clouds::before {\n  content: '';\n  position: absolute;\n  top: 15%;\n  left: -150px;\n  width: 180px;\n  height: 60px;\n  background: rgba(255,255,255,0.9);\n  border-radius: 50px;\n  box-shadow:\n    -25px -20px 0 10px rgba(255,255,255,0.9),\n    30px -15px 0 15px rgba(255,255,255,0.85),\n    70px -10px 0 5px rgba(255,255,255,0.9),\n    -60px -5px 0 8px rgba(255,255,255,0.8);\n  animation: rc-cloud-drift-1 20s linear infinite;\n}\n.rc-clouds::after {\n  content: '';\n  position: absolute;\n  top: 35%;\n  left: -120px;\n  width: 140px;\n  height: 45px;\n  background: rgba(255,255,255,0.75);\n  border-radius: 40px;\n  box-shadow:\n    -20px -18px 0 8px rgba(255,255,255,0.75),\n    25px -12px 0 12px rgba(255,255,255,0.7),\n    60px -8px 0 4px rgba(255,255,255,0.75);\n  animation: rc-cloud-drift-2 25s linear infinite;\n}"
  },
  {
    "name": "Fireflies",
    "className": "rc-fireflies",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-firefly-1 {\n  0%, 100% { transform: translate(0, 0); opacity: 0.2; }\n  20% { transform: translate(30px, -40px); opacity: 1; }\n  40% { transform: translate(-20px, -60px); opacity: 0.3; }\n  60% { transform: translate(40px, -20px); opacity: 0.9; }\n  80% { transform: translate(-10px, -50px); opacity: 0.4; }\n}\n@keyframes rc-firefly-2 {\n  0%, 100% { transform: translate(0, 0); opacity: 0.5; }\n  25% { transform: translate(-35px, -25px); opacity: 0.2; }\n  50% { transform: translate(20px, -55px); opacity: 1; }\n  75% { transform: translate(-15px, -35px); opacity: 0.3; }\n}\n.rc-fireflies {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #0d1b0e 0%, #1a2f1a 50%, #0d1b0e 100%);\n}\n.rc-fireflies::before,\n.rc-fireflies::after {\n  content: '';\n  position: absolute;\n  width: 4px;\n  height: 4px;\n  background: #e8ff6b;\n  border-radius: 50%;\n  box-shadow:\n    0 0 6px 2px rgba(232,255,107,0.6),\n    0 0 12px 4px rgba(232,255,107,0.3);\n}\n.rc-fireflies::before {\n  top: 30%;\n  left: 20%;\n  box-shadow:\n    0 0 6px 2px rgba(232,255,107,0.6),\n    0 0 12px 4px rgba(232,255,107,0.3),\n    120px 40px 0 1px rgba(232,255,107,0.8),\n    120px 40px 6px 3px rgba(232,255,107,0.4),\n    250px -30px 0 0px rgba(232,255,107,0.6),\n    250px -30px 6px 2px rgba(232,255,107,0.3),\n    400px 60px 0 1px rgba(232,255,107,0.7),\n    400px 60px 6px 3px rgba(232,255,107,0.35),\n    550px -10px 0 0px rgba(232,255,107,0.5),\n    550px -10px 6px 2px rgba(232,255,107,0.25);\n  animation: rc-firefly-1 6s ease-in-out infinite;\n}\n.rc-fireflies::after {\n  top: 55%;\n  left: 40%;\n  box-shadow:\n    0 0 6px 2px rgba(232,255,107,0.5),\n    0 0 12px 4px rgba(232,255,107,0.25),\n    100px -50px 0 1px rgba(232,255,107,0.7),\n    100px -50px 6px 3px rgba(232,255,107,0.35),\n    220px 30px 0 0px rgba(232,255,107,0.6),\n    220px 30px 6px 2px rgba(232,255,107,0.3),\n    380px -40px 0 1px rgba(232,255,107,0.8),\n    380px -40px 6px 3px rgba(232,255,107,0.4),\n    500px 50px 0 0px rgba(232,255,107,0.5),\n    500px 50px 6px 2px rgba(232,255,107,0.25);\n  animation: rc-firefly-2 8s ease-in-out infinite;\n}"
  },
  {
    "name": "Ocean Waves",
    "className": "rc-ocean-waves",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-wave-1 {\n  0%, 100% { transform: translateX(0) translateY(0); }\n  50% { transform: translateX(-25%) translateY(5px); }\n}\n@keyframes rc-wave-2 {\n  0%, 100% { transform: translateX(0) translateY(0); }\n  50% { transform: translateX(25%) translateY(-5px); }\n}\n.rc-ocean-waves {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #1a3a5c 0%, #2a6496 40%, #3a8fd4 100%);\n}\n.rc-ocean-waves::before {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: -50%;\n  width: 200%;\n  height: 50%;\n  background: radial-gradient(ellipse at 25% 100%, rgba(58,143,212,0.6) 0%, transparent 50%),\n              radial-gradient(ellipse at 75% 100%, rgba(58,143,212,0.4) 0%, transparent 50%);\n  border-radius: 40% 40% 0 0 / 30% 30% 0 0;\n  animation: rc-wave-1 5s ease-in-out infinite;\n}\n.rc-ocean-waves::after {\n  content: '';\n  position: absolute;\n  bottom: -5%;\n  left: -50%;\n  width: 200%;\n  height: 45%;\n  background: radial-gradient(ellipse at 30% 100%, rgba(42,100,150,0.7) 0%, transparent 50%),\n              radial-gradient(ellipse at 70% 100%, rgba(42,100,150,0.5) 0%, transparent 50%);\n  border-radius: 45% 45% 0 0 / 25% 25% 0 0;\n  animation: rc-wave-2 6s ease-in-out infinite;\n}"
  },
  {
    "name": "Sunset",
    "className": "rc-sunset",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-sunset-glow {\n  0%, 100% {\n    background: linear-gradient(to bottom,\n      #1a0533 0%, #4a1942 20%, #c94b4b 45%,\n      #f09819 65%, #ff512f 80%, #dd2476 100%);\n  }\n  50% {\n    background: linear-gradient(to bottom,\n      #0d0221 0%, #2a0845 20%, #6441a5 35%,\n      #e85d75 55%, #f5af19 75%, #f12711 100%);\n  }\n}\n.rc-sunset {\n  position: relative;\n  overflow: hidden;\n  animation: rc-sunset-glow 8s ease-in-out infinite;\n  background: linear-gradient(to bottom,\n    #1a0533 0%, #4a1942 20%, #c94b4b 45%,\n    #f09819 65%, #ff512f 80%, #dd2476 100%);\n}\n.rc-sunset::before {\n  content: '';\n  position: absolute;\n  bottom: 15%;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 80px;\n  height: 80px;\n  background: radial-gradient(circle, #fff6a0 0%, #f5af19 40%, rgba(245,175,25,0) 70%);\n  border-radius: 50%;\n  box-shadow: 0 0 60px 30px rgba(245,175,25,0.3), 0 0 120px 60px rgba(255,81,47,0.15);\n}\n.rc-sunset::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 20%;\n  background: linear-gradient(to bottom, rgba(13,2,33,0) 0%, rgba(13,2,33,0.7) 100%);\n}"
  },
  {
    "name": "Northern Lights",
    "className": "rc-northern-lights",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-aurora-shift {\n  0%, 100% {\n    background: linear-gradient(135deg,\n      rgba(0,20,40,1) 0%,\n      rgba(0,100,80,0.4) 20%,\n      rgba(0,200,150,0.3) 35%,\n      rgba(100,0,200,0.2) 50%,\n      rgba(0,150,100,0.3) 65%,\n      rgba(0,20,40,1) 100%);\n  }\n  33% {\n    background: linear-gradient(120deg,\n      rgba(0,20,40,1) 0%,\n      rgba(50,0,150,0.3) 25%,\n      rgba(0,220,180,0.4) 40%,\n      rgba(0,100,200,0.3) 55%,\n      rgba(80,0,180,0.2) 70%,\n      rgba(0,20,40,1) 100%);\n  }\n  66% {\n    background: linear-gradient(150deg,\n      rgba(0,20,40,1) 0%,\n      rgba(0,180,120,0.3) 15%,\n      rgba(120,0,220,0.3) 30%,\n      rgba(0,200,160,0.4) 50%,\n      rgba(0,80,180,0.3) 70%,\n      rgba(0,20,40,1) 100%);\n  }\n}\n.rc-northern-lights {\n  position: relative;\n  overflow: hidden;\n  animation: rc-aurora-shift 10s ease-in-out infinite;\n  background: #001428;\n}\n.rc-northern-lights::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(ellipse 120% 40% at 30% 30%, rgba(0,200,150,0.15) 0%, transparent 100%),\n    radial-gradient(ellipse 100% 30% at 70% 25%, rgba(100,0,200,0.1) 0%, transparent 100%),\n    radial-gradient(ellipse 80% 35% at 50% 40%, rgba(0,150,200,0.12) 0%, transparent 100%);\n  animation: rc-aurora-shift 10s ease-in-out infinite;\n  animation-delay: -3s;\n}"
  },
  {
    "name": "Fog",
    "className": "rc-fog",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-fog-drift-1 {\n  0%, 100% { transform: translateX(-5%); opacity: 0.5; }\n  50% { transform: translateX(5%); opacity: 0.8; }\n}\n@keyframes rc-fog-drift-2 {\n  0%, 100% { transform: translateX(5%); opacity: 0.4; }\n  50% { transform: translateX(-8%); opacity: 0.7; }\n}\n.rc-fog {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(to bottom, #8e9eab 0%, #b8c6d0 50%, #a8b8c2 100%);\n}\n.rc-fog::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -10%;\n  width: 120%;\n  height: 60%;\n  background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 60%),\n              radial-gradient(ellipse at 60% 60%, rgba(255,255,255,0.4) 0%, transparent 50%),\n              radial-gradient(ellipse at 90% 40%, rgba(255,255,255,0.35) 0%, transparent 55%);\n  animation: rc-fog-drift-1 8s ease-in-out infinite;\n}\n.rc-fog::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: -10%;\n  width: 120%;\n  height: 55%;\n  background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.45) 0%, transparent 55%),\n              radial-gradient(ellipse at 70% 40%, rgba(255,255,255,0.5) 0%, transparent 60%),\n              radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.3) 0%, transparent 50%);\n  animation: rc-fog-drift-2 10s ease-in-out infinite;\n}"
  },
  {
    "name": "Stars Twinkle",
    "className": "rc-stars-twinkle",
    "category": "backgrounds",
    "displayType": "bg",
    "css": "@keyframes rc-twinkle-1 {\n  0%, 100% { opacity: 0.3; }\n  50% { opacity: 1; }\n}\n@keyframes rc-twinkle-2 {\n  0%, 100% { opacity: 0.6; }\n  30% { opacity: 0.2; }\n  70% { opacity: 1; }\n}\n.rc-stars-twinkle {\n  position: relative;\n  overflow: hidden;\n  background: #0a0a1a;\n}\n.rc-stars-twinkle::before,\n.rc-stars-twinkle::after {\n  content: '';\n  position: absolute;\n  width: 2px;\n  height: 2px;\n  background: white;\n  border-radius: 50%;\n  box-shadow:\n    40px 20px 0 0 rgba(255,255,255,0.8),\n    100px 60px 0 1px rgba(255,255,255,0.6),\n    170px 15px 0 0 rgba(255,255,255,0.9),\n    230px 80px 0 0px rgba(255,255,255,0.5),\n    300px 30px 0 1px rgba(255,255,255,0.7),\n    380px 70px 0 0px rgba(255,255,255,0.8),\n    450px 10px 0 0px rgba(255,255,255,0.6),\n    520px 55px 0 1px rgba(255,255,255,0.9),\n    590px 40px 0 0px rgba(255,255,255,0.5),\n    670px 25px 0 1px rgba(255,255,255,0.7),\n    740px 65px 0 0px rgba(255,255,255,0.8),\n    810px 45px 0 0px rgba(255,255,255,0.6),\n    880px 5px 0 1px rgba(255,255,255,0.9),\n    950px 75px 0 0px rgba(255,255,255,0.5),\n    1020px 35px 0 0px rgba(255,255,255,0.7);\n}\n.rc-stars-twinkle::before {\n  top: 10%;\n  left: 5%;\n  animation: rc-twinkle-1 3s ease-in-out infinite;\n}\n.rc-stars-twinkle::after {\n  top: 40%;\n  left: 8%;\n  box-shadow:\n    50px 40px 0 1px rgba(255,255,255,0.7),\n    120px 10px 0 0px rgba(255,255,255,0.9),\n    190px 55px 0 0px rgba(255,255,255,0.5),\n    260px 25px 0 1px rgba(255,255,255,0.8),\n    330px 65px 0 0px rgba(255,255,255,0.6),\n    410px 5px 0 0px rgba(255,255,255,0.9),\n    480px 50px 0 1px rgba(255,255,255,0.7),\n    560px 20px 0 0px rgba(255,255,255,0.8),\n    630px 70px 0 0px rgba(255,255,255,0.5),\n    700px 35px 0 1px rgba(255,255,255,0.9),\n    780px 15px 0 0px rgba(255,255,255,0.6),\n    850px 60px 0 0px rgba(255,255,255,0.8),\n    930px 30px 0 1px rgba(255,255,255,0.7),\n    1000px 50px 0 0px rgba(255,255,255,0.5),\n    1070px 10px 0 0px rgba(255,255,255,0.9);\n  animation: rc-twinkle-2 4s ease-in-out infinite;\n}"
  },
  {
    "name": "Status Pulse Green",
    "className": "rc-status-pulse-green",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-pulse-ring-green {\n  0% { transform: scale(0.8); opacity: 1; }\n  100% { transform: scale(2.5); opacity: 0; }\n}\n.rc-status-pulse-green {\n  position: relative;\n  width: 14px;\n  height: 14px;\n}\n.rc-status-pulse-green::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #22c55e;\n  border-radius: 50%;\n  z-index: 1;\n}\n.rc-status-pulse-green::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #22c55e;\n  border-radius: 50%;\n  animation: rc-pulse-ring-green 1.5s ease-out infinite;\n}"
  },
  {
    "name": "Status Pulse Red",
    "className": "rc-status-pulse-red",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-pulse-ring-red {\n  0% { transform: scale(0.8); opacity: 1; }\n  100% { transform: scale(2.5); opacity: 0; }\n}\n.rc-status-pulse-red {\n  position: relative;\n  width: 14px;\n  height: 14px;\n}\n.rc-status-pulse-red::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #ef4444;\n  border-radius: 50%;\n  z-index: 1;\n}\n.rc-status-pulse-red::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #ef4444;\n  border-radius: 50%;\n  animation: rc-pulse-ring-red 1.5s ease-out infinite;\n}"
  },
  {
    "name": "Status Pulse Yellow",
    "className": "rc-status-pulse-yellow",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-pulse-ring-yellow {\n  0% { transform: scale(0.8); opacity: 1; }\n  100% { transform: scale(2.5); opacity: 0; }\n}\n.rc-status-pulse-yellow {\n  position: relative;\n  width: 14px;\n  height: 14px;\n}\n.rc-status-pulse-yellow::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #eab308;\n  border-radius: 50%;\n  z-index: 1;\n}\n.rc-status-pulse-yellow::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #eab308;\n  border-radius: 50%;\n  animation: rc-pulse-ring-yellow 1.5s ease-out infinite;\n}"
  },
  {
    "name": "Status Breathing Blue",
    "className": "rc-status-breathing-blue",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-breathe-blue {\n  0%, 100% {\n    box-shadow: 0 0 4px 1px rgba(59,130,246,0.3);\n    background: #3b82f6;\n  }\n  50% {\n    box-shadow: 0 0 16px 6px rgba(59,130,246,0.5), 0 0 32px 12px rgba(59,130,246,0.15);\n    background: #60a5fa;\n  }\n}\n.rc-status-breathing-blue {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: #3b82f6;\n  animation: rc-breathe-blue 3s ease-in-out infinite;\n}"
  },
  {
    "name": "Status Progress Ring",
    "className": "rc-status-progress-ring",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-progress-spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n.rc-status-progress-ring {\n  position: relative;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: conic-gradient(\n    #3b82f6 0deg,\n    #3b82f6 270deg,\n    rgba(59,130,246,0.15) 270deg,\n    rgba(59,130,246,0.15) 360deg\n  );\n  animation: rc-progress-spin 2s linear infinite;\n}\n.rc-status-progress-ring::after {\n  content: '';\n  position: absolute;\n  inset: 3px;\n  border-radius: 50%;\n  background: #1e293b;\n}"
  },
  {
    "name": "Status Loading Bar",
    "className": "rc-status-loading-bar",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-loading-slide {\n  0% { transform: translateX(-100%); }\n  50% { transform: translateX(0%); }\n  100% { transform: translateX(100%); }\n}\n@keyframes rc-loading-bg-pulse {\n  0%, 100% { opacity: 0.3; }\n  50% { opacity: 0.5; }\n}\n.rc-status-loading-bar {\n  position: relative;\n  width: 120px;\n  height: 4px;\n  background: rgba(59,130,246,0.2);\n  border-radius: 4px;\n  overflow: hidden;\n  animation: rc-loading-bg-pulse 2s ease-in-out infinite;\n}\n.rc-status-loading-bar::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 50%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, #3b82f6, transparent);\n  border-radius: 4px;\n  animation: rc-loading-slide 1.5s ease-in-out infinite;\n}"
  },
  {
    "name": "Status Notification Badge",
    "className": "rc-status-notification-badge",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-badge-bounce {\n  0%, 100% { transform: scale(1); }\n  30% { transform: scale(1.25); }\n  50% { transform: scale(0.95); }\n  70% { transform: scale(1.1); }\n}\n@keyframes rc-badge-ring {\n  0% { transform: scale(1); opacity: 0.6; }\n  100% { transform: scale(2); opacity: 0; }\n}\n.rc-status-notification-badge {\n  position: relative;\n  width: 20px;\n  height: 20px;\n  background: #ef4444;\n  border-radius: 50%;\n  animation: rc-badge-bounce 1.5s ease-in-out infinite;\n}\n.rc-status-notification-badge::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border: 2px solid #ef4444;\n  border-radius: 50%;\n  animation: rc-badge-ring 1.5s ease-out infinite;\n}"
  },
  {
    "name": "Status Dot Bounce",
    "className": "rc-status-dot-bounce",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-dot-bounce {\n  0%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-10px); }\n}\n.rc-status-dot-bounce {\n  position: relative;\n  width: 40px;\n  height: 14px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.rc-status-dot-bounce::before {\n  content: '';\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background: #3b82f6;\n  border-radius: 50%;\n  box-shadow:\n    14px 0 0 0 #3b82f6,\n    28px 0 0 0 #3b82f6;\n  animation: rc-dot-bounce 1.4s ease-in-out infinite;\n}"
  },
  {
    "name": "Status Signal Wave",
    "className": "rc-status-signal-wave",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-signal-expand {\n  0% { transform: scale(0.5); opacity: 1; }\n  100% { transform: scale(2.5); opacity: 0; }\n}\n.rc-status-signal-wave {\n  position: relative;\n  width: 24px;\n  height: 24px;\n}\n.rc-status-signal-wave::before {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 8px;\n  height: 8px;\n  margin: -4px 0 0 -4px;\n  background: #22c55e;\n  border-radius: 50%;\n  z-index: 1;\n}\n.rc-status-signal-wave::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 8px;\n  height: 8px;\n  margin: -4px 0 0 -4px;\n  border: 2px solid #22c55e;\n  border-radius: 50%;\n  animation: rc-signal-expand 2s ease-out infinite;\n}"
  },
  {
    "name": "Status Heartbeat",
    "className": "rc-status-heartbeat",
    "category": "advanced",
    "displayType": "box",
    "css": "@keyframes rc-heart-beat {\n  0%, 100% { transform: scale(1); }\n  14% { transform: scale(1.3); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.2); }\n  56% { transform: scale(1); }\n}\n.rc-status-heartbeat {\n  position: relative;\n  width: 20px;\n  height: 18px;\n}\n.rc-status-heartbeat::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 10px;\n  height: 16px;\n  background: #ef4444;\n  border-radius: 10px 10px 0 0;\n  transform: translateX(-50%) rotate(-45deg);\n  transform-origin: 0 100%;\n  animation: rc-heart-beat 1.5s ease-in-out infinite;\n}\n.rc-status-heartbeat::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 50%;\n  width: 10px;\n  height: 16px;\n  background: #ef4444;\n  border-radius: 10px 10px 0 0;\n  transform: translateX(50%) rotate(45deg);\n  transform-origin: 100% 100%;\n  animation: rc-heart-beat 1.5s ease-in-out infinite;\n}"
  },
  {
    "name": "Scroll Fade Up",
    "className": "rc-scroll-fade-up",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-fade-up {\n  animation: rc-scroll-fade-up 0.7s ease-out both;\n}\n@keyframes rc-scroll-fade-up {\n  from {\n    opacity: 0;\n    transform: translateY(40px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}"
  },
  {
    "name": "Scroll Fade Left",
    "className": "rc-scroll-fade-left",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-fade-left {\n  animation: rc-scroll-fade-left 0.7s ease-out both;\n}\n@keyframes rc-scroll-fade-left {\n  from {\n    opacity: 0;\n    transform: translateX(-50px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}"
  },
  {
    "name": "Scroll Fade Right",
    "className": "rc-scroll-fade-right",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-fade-right {\n  animation: rc-scroll-fade-right 0.7s ease-out both;\n}\n@keyframes rc-scroll-fade-right {\n  from {\n    opacity: 0;\n    transform: translateX(50px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}"
  },
  {
    "name": "Scroll Zoom In",
    "className": "rc-scroll-zoom-in",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-zoom-in {\n  animation: rc-scroll-zoom-in 0.6s ease-out both;\n}\n@keyframes rc-scroll-zoom-in {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}"
  },
  {
    "name": "Scroll Slide In Stagger",
    "className": "rc-scroll-slide-stagger",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-slide-stagger {\n  animation: rc-scroll-slide-stagger 0.8s ease-out both;\n  animation-delay: 0.1s;\n}\n@keyframes rc-scroll-slide-stagger {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  60% {\n    opacity: 0.8;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}"
  },
  {
    "name": "Scroll Flip In",
    "className": "rc-scroll-flip-in",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-flip-in {\n  animation: rc-scroll-flip-in 0.7s ease-out both;\n  backface-visibility: visible;\n}\n@keyframes rc-scroll-flip-in {\n  from {\n    opacity: 0;\n    transform: perspective(400px) rotateY(90deg);\n  }\n  to {\n    opacity: 1;\n    transform: perspective(400px) rotateY(0deg);\n  }\n}"
  },
  {
    "name": "Scroll Rotate In",
    "className": "rc-scroll-rotate-in",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-rotate-in {\n  animation: rc-scroll-rotate-in 0.8s ease-out both;\n}\n@keyframes rc-scroll-rotate-in {\n  from {\n    opacity: 0;\n    transform: rotate(-200deg) scale(0.6);\n  }\n  to {\n    opacity: 1;\n    transform: rotate(0deg) scale(1);\n  }\n}"
  },
  {
    "name": "Scroll Scale Bounce",
    "className": "rc-scroll-scale-bounce",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-scale-bounce {\n  animation: rc-scroll-scale-bounce 0.8s ease-out both;\n}\n@keyframes rc-scroll-scale-bounce {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  70% {\n    transform: scale(0.95);\n  }\n  100% {\n    transform: scale(1);\n  }\n}"
  },
  {
    "name": "Scroll Blur Clear",
    "className": "rc-scroll-blur-clear",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-blur-clear {\n  animation: rc-scroll-blur-clear 0.7s ease-out both;\n}\n@keyframes rc-scroll-blur-clear {\n  from {\n    opacity: 0;\n    filter: blur(10px);\n    transform: scale(1.05);\n  }\n  to {\n    opacity: 1;\n    filter: blur(0px);\n    transform: scale(1);\n  }\n}"
  },
  {
    "name": "Scroll Clip Reveal",
    "className": "rc-scroll-clip-reveal",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-scroll-clip-reveal {\n  animation: rc-scroll-clip-reveal 0.7s ease-out both;\n}\n@keyframes rc-scroll-clip-reveal {\n  from {\n    opacity: 0;\n    clip-path: circle(0% at 50% 50%);\n  }\n  to {\n    opacity: 1;\n    clip-path: circle(75% at 50% 50%);\n  }\n}"
  },
  {
    "name": "Ease Linear",
    "className": "rc-ease-linear",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-linear {\n  animation: rc-ease-linear-move 1s linear both;\n}\n@keyframes rc-ease-linear-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease In Quad",
    "className": "rc-ease-in-quad",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-in-quad {\n  animation: rc-ease-in-quad-move 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}\n@keyframes rc-ease-in-quad-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease Out Quad",
    "className": "rc-ease-out-quad",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-out-quad {\n  animation: rc-ease-out-quad-move 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n}\n@keyframes rc-ease-out-quad-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease In Out Quad",
    "className": "rc-ease-in-out-quad",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-in-out-quad {\n  animation: rc-ease-in-out-quad-move 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;\n}\n@keyframes rc-ease-in-out-quad-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease In Cubic",
    "className": "rc-ease-in-cubic",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-in-cubic {\n  animation: rc-ease-in-cubic-move 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) both;\n}\n@keyframes rc-ease-in-cubic-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease Out Cubic",
    "className": "rc-ease-out-cubic",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-out-cubic {\n  animation: rc-ease-out-cubic-move 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}\n@keyframes rc-ease-out-cubic-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease In Out Cubic",
    "className": "rc-ease-in-out-cubic",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-in-out-cubic {\n  animation: rc-ease-in-out-cubic-move 1s cubic-bezier(0.645, 0.045, 0.355, 1) both;\n}\n@keyframes rc-ease-in-out-cubic-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease In Back",
    "className": "rc-ease-in-back",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-in-back {\n  animation: rc-ease-in-back-move 1s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;\n}\n@keyframes rc-ease-in-back-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease Out Back",
    "className": "rc-ease-out-back",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-out-back {\n  animation: rc-ease-out-back-move 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n@keyframes rc-ease-out-back-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Ease In Out Back",
    "className": "rc-ease-in-out-back",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-in-out-back {\n  animation: rc-ease-in-out-back-move 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;\n}\n@keyframes rc-ease-in-out-back-move {\n  from { opacity: 0; transform: translateX(0); }\n  to { opacity: 1; transform: translateX(60px); }\n}"
  },
  {
    "name": "Elastic Out",
    "className": "rc-ease-elastic-out",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-elastic-out {\n  animation: rc-ease-elastic-out-move 1s ease-out both;\n}\n@keyframes rc-ease-elastic-out-move {\n  0% {\n    opacity: 0;\n    transform: translateX(0) scaleX(1);\n  }\n  40% {\n    opacity: 1;\n    transform: translateX(60px) scaleX(1.1);\n  }\n  55% {\n    transform: translateX(60px) scaleX(0.95);\n  }\n  70% {\n    transform: translateX(60px) scaleX(1.02);\n  }\n  85% {\n    transform: translateX(60px) scaleX(0.99);\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(60px) scaleX(1);\n  }\n}"
  },
  {
    "name": "Bounce Out",
    "className": "rc-ease-bounce-out",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-ease-bounce-out {\n  animation: rc-ease-bounce-out-move 1s ease-out both;\n}\n@keyframes rc-ease-bounce-out-move {\n  0% {\n    opacity: 0;\n    transform: translateX(0) translateY(0);\n  }\n  20% {\n    opacity: 1;\n    transform: translateX(60px) translateY(0);\n  }\n  40% {\n    transform: translateX(60px) translateY(-20px);\n  }\n  55% {\n    transform: translateX(60px) translateY(0);\n  }\n  68% {\n    transform: translateX(60px) translateY(-10px);\n  }\n  78% {\n    transform: translateX(60px) translateY(0);\n  }\n  88% {\n    transform: translateX(60px) translateY(-4px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(60px) translateY(0);\n  }\n}"
  },
  {
    "name": "Glassmorphism",
    "className": "rc-preset-glassmorphism",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-glassmorphism {\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n}"
  },
  {
    "name": "Neumorphism",
    "className": "rc-preset-neumorphism",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-neumorphism {\n  background: #e0e5ec;\n  border-radius: 16px;\n  border: none;\n  box-shadow:\n    8px 8px 16px #a3b1c6,\n    -8px -8px 16px #ffffff;\n}"
  },
  {
    "name": "Claymorphism",
    "className": "rc-preset-claymorphism",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-claymorphism {\n  background: #f08080;\n  border-radius: 32px;\n  border: none;\n  box-shadow:\n    inset -6px -6px 12px rgba(0, 0, 0, 0.15),\n    inset 6px 6px 12px rgba(255, 255, 255, 0.35),\n    8px 8px 20px rgba(0, 0, 0, 0.2);\n}"
  },
  {
    "name": "Brutalism",
    "className": "rc-preset-brutalism",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-brutalism {\n  background: #ffff00;\n  border: 4px solid #000000;\n  border-radius: 0;\n  box-shadow: 8px 8px 0 #000000;\n  font-weight: 900;\n  text-transform: uppercase;\n}"
  },
  {
    "name": "Retro/Pixel",
    "className": "rc-preset-retro-pixel",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-retro-pixel {\n  background: #2c2c54;\n  border: none;\n  border-radius: 0;\n  color: #ffdd59;\n  font-family: 'Courier New', Courier, monospace;\n  box-shadow:\n    4px 0 0 0 #2c2c54, -4px 0 0 0 #2c2c54,\n    0 4px 0 0 #2c2c54, 0 -4px 0 0 #2c2c54,\n    4px 4px 0 0 #2c2c54, -4px 4px 0 0 #2c2c54,\n    4px -4px 0 0 #2c2c54, -4px -4px 0 0 #2c2c54;\n  outline: 4px solid #ffdd59;\n}"
  },
  {
    "name": "Cyberpunk",
    "className": "rc-preset-cyberpunk",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-cyberpunk {\n  background: #0a0a12;\n  border: 2px solid #00f0ff;\n  border-radius: 4px;\n  box-shadow:\n    0 0 8px rgba(0, 240, 255, 0.4),\n    0 0 20px rgba(0, 240, 255, 0.15),\n    inset 0 0 12px rgba(0, 240, 255, 0.05);\n  color: #00f0ff;\n}"
  },
  {
    "name": "Minimalism",
    "className": "rc-preset-minimalism",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-minimalism {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  color: #374151;\n}"
  },
  {
    "name": "Elevation",
    "className": "rc-preset-elevation",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-elevation {\n  background: #ffffff;\n  border: none;\n  border-radius: 12px;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.07),\n    0 4px 8px rgba(0, 0, 0, 0.05),\n    0 12px 24px rgba(0, 0, 0, 0.04),\n    0 20px 40px rgba(0, 0, 0, 0.03);\n}"
  },
  {
    "name": "Gradient Border",
    "className": "rc-preset-gradient-border",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-gradient-border {\n  position: relative;\n  background: #ffffff;\n  border-radius: 12px;\n  border: none;\n}\n.rc-preset-gradient-border::before {\n  content: '';\n  position: absolute;\n  inset: -3px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);\n  z-index: -1;\n}"
  },
  {
    "name": "Dark Glass",
    "className": "rc-preset-dark-glass",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-dark-glass {\n  background: rgba(0, 0, 0, 0.35);\n  backdrop-filter: blur(16px) saturate(180%);\n  -webkit-backdrop-filter: blur(16px) saturate(180%);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  color: #f3f4f6;\n}"
  },
  {
    "name": "Soft UI",
    "className": "rc-preset-soft-ui",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-soft-ui {\n  --soft-bg: #e8ecf1;\n  --soft-shadow-dark: #c8ccd2;\n  --soft-shadow-light: #ffffff;\n  background: var(--soft-bg);\n  border: none;\n  border-radius: 20px;\n  box-shadow:\n    6px 6px 14px var(--soft-shadow-dark),\n    -6px -6px 14px var(--soft-shadow-light),\n    inset 2px 2px 4px rgba(255, 255, 255, 0.6),\n    inset -2px -2px 4px rgba(0, 0, 0, 0.04);\n}"
  },
  {
    "name": "Neobrutalism",
    "className": "rc-preset-neobrutalism",
    "category": "advanced",
    "displayType": "preset",
    "css": ".rc-preset-neobrutalism {\n  background: #fef3c7;\n  border: 3px solid #1e293b;\n  border-radius: 8px;\n  box-shadow: 6px 6px 0 #1e293b;\n  color: #1e293b;\n  font-weight: 700;\n}"
  },
  {
    "name": "Fade Through",
    "className": "rc-fade-through",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-fade-through {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  animation: rcFadeThrough 0.6s ease-in-out;\n  pointer-events: all;\n}\n\n@keyframes rcFadeThrough {\n  0% { opacity: 0; }\n  40% { opacity: 1; }\n  60% { opacity: 1; }\n  100% { opacity: 0; }\n}"
  },
  {
    "name": "Slide Over Left",
    "className": "rc-slide-over-left",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-slide-over-left {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  transform: translateX(100%);\n  animation: rcSlideOverLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n  pointer-events: all;\n}\n\n@keyframes rcSlideOverLeft {\n  0% { transform: translateX(100%); }\n  100% { transform: translateX(0); }\n}"
  },
  {
    "name": "Slide Over Right",
    "className": "rc-slide-over-right",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-slide-over-right {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  transform: translateX(-100%);\n  animation: rcSlideOverRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n  pointer-events: all;\n}\n\n@keyframes rcSlideOverRight {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(0); }\n}"
  },
  {
    "name": "Slide Over Up",
    "className": "rc-slide-over-up",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-slide-over-up {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  transform: translateY(100%);\n  animation: rcSlideOverUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n  pointer-events: all;\n}\n\n@keyframes rcSlideOverUp {\n  0% { transform: translateY(100%); }\n  100% { transform: translateY(0); }\n}"
  },
  {
    "name": "Zoom Fade",
    "className": "rc-zoom-fade",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-zoom-fade {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  opacity: 0;\n  transform: scale(0.92);\n  animation: rcZoomFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n  pointer-events: all;\n}\n\n@keyframes rcZoomFade {\n  0% { opacity: 0; transform: scale(0.92); }\n  100% { opacity: 1; transform: scale(1); }\n}"
  },
  {
    "name": "Flip Transition",
    "className": "rc-flip-transition",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-flip-transition {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  transform: perspective(1200px) rotateY(-90deg);\n  transform-origin: left center;\n  animation: rcFlipTransition 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n  pointer-events: all;\n  backface-visibility: hidden;\n}\n\n@keyframes rcFlipTransition {\n  0% { transform: perspective(1200px) rotateY(-90deg); }\n  100% { transform: perspective(1200px) rotateY(0deg); }\n}"
  },
  {
    "name": "Dissolve",
    "className": "rc-dissolve",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-dissolve {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  opacity: 0;\n  filter: blur(20px);\n  animation: rcDissolve 0.65s ease-out forwards;\n  pointer-events: all;\n}\n\n@keyframes rcDissolve {\n  0% { opacity: 0; filter: blur(20px); }\n  100% { opacity: 1; filter: blur(0px); }\n}"
  },
  {
    "name": "CurtaIn",
    "className": "rc-curtain-in",
    "category": "scroll-micro",
    "displayType": "box",
    "css": ".rc-curtain-in {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  background: #fff;\n  pointer-events: all;\n}\n\n.rc-curtain-in::before,\n.rc-curtain-in::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  background: #fff;\n  animation: rcCurtainIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n}\n\n.rc-curtain-in::before {\n  left: 0;\n  clip-path: inset(0 50% 0 0);\n  animation-name: rcCurtainLeft;\n}\n\n.rc-curtain-in::after {\n  right: 0;\n  clip-path: inset(0 0 0 50%);\n  animation-name: rcCurtainRight;\n}\n\n@keyframes rcCurtainLeft {\n  0% { clip-path: inset(0 0 0 0); }\n  100% { clip-path: inset(0 50% 0 0); }\n}\n\n@keyframes rcCurtainRight {\n  0% { clip-path: inset(0 0 0 0); }\n  100% { clip-path: inset(0 0 0 50%); }\n}"
  },
  {
    "name": "Focus Visible Ring",
    "className": "rc-focus-visible-ring",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-focus-visible-ring:focus-visible {\n  outline: 3px solid #2563eb;\n  outline-offset: 2px;\n  border-radius: 4px;\n  transition: outline-color 0.15s ease;\n}\n\n.rc-focus-visible-ring:focus:not(:focus-visible) {\n  outline: none;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-focus-visible-ring:focus-visible {\n    transition: none;\n  }\n}"
  },
  {
    "name": "Skip Link",
    "className": "rc-skip-link",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-skip-link {\n  position: absolute;\n  left: -9999px;\n  top: auto;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  z-index: 99999;\n  background: #1d4ed8;\n  color: #fff;\n  padding: 8px 16px;\n  font-size: 1rem;\n  font-weight: 600;\n  border-radius: 0 0 8px 0;\n  text-decoration: none;\n  transition: none;\n}\n\n.rc-skip-link:focus {\n  left: 0;\n  top: 0;\n  width: auto;\n  height: auto;\n  overflow: auto;\n  padding: 12px 24px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-skip-link {\n    transition: none;\n  }\n}"
  },
  {
    "name": "Reduced Motion Fade",
    "className": "rc-reduced-motion-fade",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-reduced-motion-fade {\n  opacity: 0;\n  animation: rcRmFade 0.5s ease forwards;\n}\n\n@keyframes rcRmFade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-reduced-motion-fade {\n    animation: none;\n    opacity: 1;\n  }\n}"
  },
  {
    "name": "Reduced Motion Slide",
    "className": "rc-reduced-motion-slide",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-reduced-motion-slide {\n  transform: translateY(20px);\n  opacity: 0;\n  animation: rcRmSlide 0.5s ease forwards;\n}\n\n@keyframes rcRmSlide {\n  0% { transform: translateY(20px); opacity: 0; }\n  100% { transform: translateY(0); opacity: 1; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-reduced-motion-slide {\n    animation: none;\n    transform: none;\n    opacity: 1;\n  }\n}"
  },
  {
    "name": "High Contrast Border",
    "className": "rc-high-contrast-border",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-high-contrast-border {\n  border: 3px solid #000;\n  min-height: 1px;\n  min-width: 1px;\n}\n\n@media (prefers-contrast: high) {\n  .rc-high-contrast-border {\n    border-width: 4px;\n    border-color: #fff;\n    outline: 3px solid #000;\n    outline-offset: -1px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-high-contrast-border {\n    transition: none;\n  }\n}"
  },
  {
    "name": "Screen Reader Only",
    "className": "rc-sr-only",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.rc-sr-only.focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  padding: inherit;\n  margin: inherit;\n  overflow: visible;\n  clip: auto;\n  white-space: normal;\n}"
  },
  {
    "name": "Motion Safe Bounce",
    "className": "rc-motion-safe-bounce",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-motion-safe-bounce {\n  animation: rcMsBounce 0.6s ease;\n}\n\n@keyframes rcMsBounce {\n  0%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-15px); }\n  50% { transform: translateY(-8px); }\n  70% { transform: translateY(-3px); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-motion-safe-bounce {\n    animation: none;\n    transform: none;\n  }\n}"
  },
  {
    "name": "Motion Safe Pulse",
    "className": "rc-motion-safe-pulse",
    "category": "advanced",
    "displayType": "box",
    "css": ".rc-motion-safe-pulse {\n  animation: rcMsPulse 1s ease-in-out 2;\n}\n\n@keyframes rcMsPulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.08); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .rc-motion-safe-pulse {\n    animation: none;\n    transform: none;\n}\n}"
  },
  {
    "name": "Icon Spin",
    "className": "rc-icon-spin",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-spin {\n  animation: rcIconSpin 1s linear infinite;\n}\n\n@keyframes rcIconSpin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}"
  },
  {
    "name": "Icon Bounce",
    "className": "rc-icon-bounce",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-bounce {\n  animation: rcIconBounce 0.8s ease infinite;\n}\n\n@keyframes rcIconBounce {\n  0%, 100% { transform: translateY(0); }\n  20% { transform: translateY(-30%); }\n  40% { transform: translateY(0); }\n  55% { transform: translateY(-15%); }\n  70% { transform: translateY(0); }\n  82% { transform: translateY(-6%); }\n}"
  },
  {
    "name": "Icon Pulse",
    "className": "rc-icon-pulse",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-pulse {\n  animation: rcIconPulse 1s ease-in-out infinite;\n}\n\n@keyframes rcIconPulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n}"
  },
  {
    "name": "Icon Shake",
    "className": "rc-icon-shake",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-shake {\n  animation: rcIconShake 0.6s ease-in-out;\n}\n\n@keyframes rcIconShake {\n  0%, 100% { transform: translateX(0); }\n  15% { transform: translateX(-25%); }\n  30% { transform: translateX(20%); }\n  45% { transform: translateX(-15%); }\n  60% { transform: translateX(10%); }\n  75% { transform: translateX(-5%); }\n}"
  },
  {
    "name": "Icon Flip",
    "className": "rc-icon-flip",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-flip {\n  animation: rcIconFlip 0.6s ease-in-out;\n  backface-visibility: hidden;\n}\n\n@keyframes rcIconFlip {\n  0% { transform: perspective(400px) rotateY(0); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}"
  },
  {
    "name": "Icon Swing",
    "className": "rc-icon-swing",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-swing {\n  animation: rcIconSwing 0.8s ease-in-out;\n  transform-origin: top center;\n}\n\n@keyframes rcIconSwing {\n  0% { transform: rotate(0deg); }\n  20% { transform: rotate(15deg); }\n  40% { transform: rotate(-10deg); }\n  60% { transform: rotate(5deg); }\n  80% { transform: rotate(-2deg); }\n  100% { transform: rotate(0deg); }\n}"
  },
  {
    "name": "Icon Tada",
    "className": "rc-icon-tada",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-tada {\n  animation: rcIconTada 1s ease;\n}\n\n@keyframes rcIconTada {\n  0% { transform: scale(1) rotate(0deg); }\n  10%, 20% { transform: scale(0.9) rotate(-3deg); }\n  30%, 50%, 70%, 90% { transform: scale(1.15) rotate(3deg); }\n  40%, 60%, 80% { transform: scale(1.15) rotate(-3deg); }\n  100% { transform: scale(1) rotate(0deg); }\n}"
  },
  {
    "name": "Icon Wobble",
    "className": "rc-icon-wobble",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-wobble {\n  animation: rcIconWobble 0.8s ease;\n}\n\n@keyframes rcIconWobble {\n  0% { transform: translateX(0) rotate(0deg); }\n  15% { transform: translateX(-25%) rotate(-5deg); }\n  30% { transform: translateX(20%) rotate(3deg); }\n  45% { transform: translateX(-15%) rotate(-3deg); }\n  60% { transform: translateX(10%) rotate(2deg); }\n  75% { transform: translateX(-5%) rotate(-1deg); }\n  100% { transform: translateX(0) rotate(0deg); }\n}"
  },
  {
    "name": "Icon Fade In",
    "className": "rc-icon-fade-in",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-fade-in {\n  animation: rcIconFadeIn 0.5s ease forwards;\n}\n\n@keyframes rcIconFadeIn {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}"
  },
  {
    "name": "Icon Drop In",
    "className": "rc-icon-drop-in",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-drop-in {\n  animation: rcIconDropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n}\n\n@keyframes rcIconDropIn {\n  0% { opacity: 0; transform: translateY(-40px); }\n  60% { opacity: 1; transform: translateY(5px); }\n  80% { transform: translateY(-3px); }\n  100% { opacity: 1; transform: translateY(0); }\n}"
  },
  {
    "name": "Icon Rubber Band",
    "className": "rc-icon-rubber-band",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-rubber-band {\n  animation: rcIconRubberBand 0.8s ease;\n}\n\n@keyframes rcIconRubberBand {\n  0% { transform: scaleX(1) scaleY(1); }\n  30% { transform: scaleX(1.25) scaleY(0.75); }\n  40% { transform: scaleX(0.75) scaleY(1.25); }\n  50% { transform: scaleX(1.15) scaleY(0.85); }\n  65% { transform: scaleX(0.95) scaleY(1.05); }\n  75% { transform: scaleX(1.05) scaleY(0.95); }\n  100% { transform: scaleX(1) scaleY(1); }\n}"
  },
  {
    "name": "Icon Beat",
    "className": "rc-icon-beat",
    "category": "advanced",
    "displayType": "icon",
    "css": ".rc-icon-beat {\n  animation: rcIconBeat 1s ease-in-out infinite;\n}\n\n@keyframes rcIconBeat {\n  0%, 100% { transform: scale(1); }\n  14% { transform: scale(1.2); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.2); }\n  70% { transform: scale(1); }\n}"
  }
,
  {
  "name": "3d Book",
  "className": "rc-3d-book",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-3d-book {\n  perspective: 800px;\n  width: 60px;\n  height: 80px;\n  position: relative;\n  transform-style: preserve-3d;\n  transform: rotateY(-25deg);\n  transition: transform 0.6s ease;\n}"
},
  {
  "name": "3d Gallery",
  "className": "rc-3d-gallery",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-3d-gallery {\n  perspective: 1000px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  transform-style: preserve-3d;\n  animation: roy-3d-gallery-rotate 8s linear infinite;\n}"
},
  {
  "name": "3d Poster",
  "className": "rc-3d-poster",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-3d-poster {\n  perspective: 1000px;\n  width: 80px;\n  height: 100px;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent),\n    linear-gradient(135deg, #8b5cf6, #ec4899);\n  border-radius: 6px;\n  box-shadow:\n    0 10px 30px rgba(139, 92, 246, 0.4),\n    0 0 0 1px rgba(255, 255, 255, 0.1);\n  transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);\n  transition: transform 0.5s ease;\n}"
},
  {
  "name": "Accordion 3d",
  "className": "rc-accordion-3d",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-accordion-3d {\n  perspective: 800px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  transform-style: preserve-3d;\n}"
},
  {
  "name": "Apple Bounce Settle",
  "className": "rc-apple-bounce-settle",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-apple-bounce-settle {\n  animation: roy-apple-bounce-settle 1.2s cubic-bezier(0.28, 0.84, 0.42, 1) both;\n}"
},
  {
  "name": "Apple Elastic Scale",
  "className": "rc-apple-elastic-scale",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-apple-elastic-scale {\n  animation: roy-apple-elastic 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;\n}"
},
  {
  "name": "Apple Flip Spring",
  "className": "rc-apple-flip-spring",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-apple-flip-spring {\n  perspective: 1000px;\n  animation: roy-apple-flip-spring 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  transform-style: preserve-3d;\n}"
},
  {
  "name": "Apple Frosted Vibrancy",
  "className": "rc-apple-frosted-vibrancy",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-frosted-vibrancy {\n  background: rgba(255, 255, 255, 0.55);\n  backdrop-filter: blur(30px) saturate(180%);\n  -webkit-backdrop-filter: blur(30px) saturate(180%);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 14px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.6) inset,\n    0 10px 30px rgba(0, 0, 0, 0.15);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Apple Material Thick",
  "className": "rc-apple-material-thick",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-material-thick {\n  background: rgba(245, 245, 247, 0.75);\n  backdrop-filter: blur(40px) saturate(200%);\n  -webkit-backdrop-filter: blur(40px) saturate(200%);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.5) inset,\n    0 20px 50px rgba(0, 0, 0, 0.2);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Apple Material Thin",
  "className": "rc-apple-material-thin",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-material-thin {\n  background: rgba(250, 250, 252, 0.5);\n  backdrop-filter: blur(12px) saturate(120%);\n  -webkit-backdrop-filter: blur(12px) saturate(120%);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Apple Sidebar Material",
  "className": "rc-apple-sidebar-material",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-sidebar-material {\n  background: linear-gradient(\n    180deg,\n    rgba(245, 245, 247, 0.7) 0%,\n    rgba(235, 235, 240, 0.6) 100%\n  );\n  backdrop-filter: blur(40px) saturate(150%);\n  -webkit-backdrop-filter: blur(40px) saturate(150%);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  box-shadow:\n    inset 1px 0 0 rgba(255, 255, 255, 0.5),\n    0 6px 20px rgba(0, 0, 0, 0.1);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Apple Squish In",
  "className": "rc-apple-squish-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-apple-squish-in {\n  animation: roy-apple-squish-in 0.7s cubic-bezier(0.32, 0.72, 0, 1) both;\n}"
},
  {
  "name": "Apple Squish Out",
  "className": "rc-apple-squish-out",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-apple-squish-out {\n  animation: roy-apple-squish-out 0.55s cubic-bezier(0.32, 0.72, 0, 1) both;\n}"
},
  {
  "name": "Apple Ultra Thin",
  "className": "rc-apple-ultra-thin",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-ultra-thin {\n  background: rgba(255, 255, 255, 0.4);\n  backdrop-filter: blur(8px) saturate(110%);\n  -webkit-backdrop-filter: blur(8px) saturate(110%);\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  border-radius: 10px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.5) inset,\n    0 2px 8px rgba(0, 0, 0, 0.06);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Apple Vibrancy Dark",
  "className": "rc-apple-vibrancy-dark",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-vibrancy-dark {\n  background: rgba(30, 30, 32, 0.55);\n  backdrop-filter: blur(24px) saturate(180%) brightness(0.95);\n  -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(0.95);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 14px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.08) inset,\n    0 10px 30px rgba(0, 0, 0, 0.4);\n  color: #f5f5f7;\n}"
},
  {
  "name": "Apple Vibrancy Light",
  "className": "rc-apple-vibrancy-light",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-apple-vibrancy-light {\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(20px) saturate(180%) brightness(1.05);\n  -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(1.05);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 14px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.7) inset,\n    0 10px 30px rgba(0, 0, 0, 0.1);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Ascii Rain",
  "className": "rc-ascii-rain",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-ascii-rain {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse at 50% 0%, #001a0a 0%, #000305 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
},
  {
  "name": "BG Animated Gradient",
  "className": "rc-bg-animated-gradient",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-animated-gradient {\n  background: linear-gradient(-45deg, #065f46, #10b981, #06b6d4, #8b5cf6);\n  background-size: 400% 400%;\n  animation: roy-gradient-shift 8s ease infinite;\n}"
},
  {
  "name": "BG Concentric",
  "className": "rc-bg-concentric",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-concentric {\n  background: repeating-radial-gradient(\n    circle at center,\n    #10b981 0,\n    #10b981 8px,\n    #0f172a 8px,\n    #0f172a 16px\n  );\n}"
},
  {
  "name": "BG Conic Gradient",
  "className": "rc-bg-conic-gradient",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-conic-gradient {\n  background: conic-gradient(\n    from 0deg at 50% 50%,\n    #10b981,\n    #06b6d4,\n    #8b5cf6,\n    #ec4899,\n    #f59e0b,\n    #10b981\n  );\n  animation: roy-conic-hue 6s linear infinite;\n}"
},
  {
  "name": "BG Diagonal Stripes",
  "className": "rc-bg-diagonal-stripes",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-diagonal-stripes {\n  background-color: #0f172a;\n  background-image: repeating-linear-gradient(\n    -60deg,\n    #06b6d4 0,\n    #06b6d4 12px,\n    #0e7490 12px,\n    #0e7490 24px\n  );\n  background-size: 200% 200%;\n  animation: roy-diagonal-shift 6s linear infinite;\n}"
},
  {
  "name": "BG Dot Pattern",
  "className": "rc-bg-dot-pattern",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-dot-pattern {\n  background-color: #0f172a;\n  background-image: radial-gradient(circle, #10b981 1px, transparent 1px);\n  background-size: 24px 24px;\n}"
},
  {
  "name": "BG Gradient Pulse",
  "className": "rc-bg-gradient-pulse",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-gradient-pulse {\n  background-color: #0f172a;\n  background-image:\n    radial-gradient(circle at 50% 50%, #10b981 0%, rgba(16, 185, 129, 0) 40%),\n    radial-gradient(circle at 30% 70%, #06b6d4 0%, rgba(6, 182, 212, 0) 40%),\n    radial-gradient(circle at 70% 30%, #8b5cf6 0%, rgba(139, 92, 246, 0) 40%);\n  animation: roy-gradient-pulse 4s ease-in-out infinite;\n}"
},
  {
  "name": "BG Gradient Sweep",
  "className": "rc-bg-gradient-sweep",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-gradient-sweep {\n  background: linear-gradient(\n    90deg,\n    #0f172a 0%,\n    #10b981 25%,\n    #06b6d4 50%,\n    #10b981 75%,\n    #0f172a 100%\n  );\n  background-size: 200% 100%;\n  animation: roy-gradient-sweep 4s linear infinite;\n}"
},
  {
  "name": "BG Grid Lines",
  "className": "rc-bg-grid-lines",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-grid-lines {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px);\n  background-size: 48px 48px;\n}"
},
  {
  "name": "BG Hexagon",
  "className": "rc-bg-hexagon",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-hexagon {\n  background-color: #0f172a;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 16.18V50.5L28 66.68L0 50.5V16.18L28 0z' fill='none' stroke='%2310b981' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M28 33.32L56 49.5V83.82L28 100L0 83.82V49.5L28 33.32z' fill='none' stroke='%2310b981' stroke-width='1' opacity='0.5'/%3E%3C/svg%3E\");\n  background-size: 56px 100px;\n}"
},
  {
  "name": "BG Lava Lamp",
  "className": "rc-bg-lava-lamp",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-lava-lamp {\n  background-color: #1a0b2e;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "BG Mesh Gradient",
  "className": "rc-bg-mesh-gradient",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-mesh-gradient {\n  background-color: #0f172a;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "BG Noise",
  "className": "rc-bg-noise",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-noise {\n  position: relative;\n  background-color: #0f172a;\n}"
},
  {
  "name": "BG Plaid",
  "className": "rc-bg-plaid",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-plaid {\n  background-color: #0f172a;\n  background-image:\n    repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(16, 185, 129, 0.4) 18px, rgba(16, 185, 129, 0.4) 20px),\n    repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(16, 185, 129, 0.4) 18px, rgba(16, 185, 129, 0.4) 20px),\n    repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(6, 182, 212, 0.3) 24px, rgba(6, 182, 212, 0.3) 26px),\n    repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(6, 182, 212, 0.3) 24px, rgba(6, 182, 212, 0.3) 26px);\n}"
},
  {
  "name": "BG Radial Rays",
  "className": "rc-bg-radial-rays",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-radial-rays {\n  background-color: #0f172a;\n  background-image: repeating-conic-gradient(\n    from 0deg at 50% 50%,\n    #10b981 0deg 4deg,\n    transparent 4deg 12deg\n  );\n}"
},
  {
  "name": "BG Stripes",
  "className": "rc-bg-stripes",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-stripes {\n  background: repeating-linear-gradient(\n    45deg,\n    #10b981,\n    #10b981 10px,\n    #0f172a 10px,\n    #0f172a 20px\n  );\n}"
},
  {
  "name": "BG Sunburst",
  "className": "rc-bg-sunburst",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-sunburst {\n  background-color: #1a1205;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "BG Sunset",
  "className": "rc-bg-sunset",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-sunset {\n  background: linear-gradient(\n    180deg,\n    #0c1e2e 0%,\n    #5b2c6f 25%,\n    #c2185b 50%,\n    #f59e0b 75%,\n    #fde68a 100%\n  );\n  background-size: 100% 200%;\n  animation: roy-sunset-shift 8s ease-in-out infinite;\n}"
},
  {
  "name": "BG Triangles",
  "className": "rc-bg-triangles",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-triangles {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(45deg, #10b981 25%, transparent 25%),\n    linear-gradient(-45deg, #06b6d4 25%, transparent 25%),\n    linear-gradient(45deg, transparent 75%, #06b6d4 75%),\n    linear-gradient(-45deg, transparent 75%, #10b981 75%);\n  background-size: 40px 40px;\n  background-position: 0 0, 0 20px, 20px -20px, -20px 0;\n}"
},
  {
  "name": "BG Zigzag",
  "className": "rc-bg-zigzag",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-bg-zigzag {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(135deg, #10b981 25%, transparent 25%) -10px 0,\n    linear-gradient(225deg, #10b981 25%, transparent 25%) -10px 0,\n    linear-gradient(315deg, #10b981 25%, transparent 25%),\n    linear-gradient(45deg, #10b981 25%, transparent 25%);\n  background-size: 20px 20px;\n}"
},
  {
  "name": "Blink",
  "className": "rc-blink",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-blink {\n  animation: roy-blink 1.4s steps(2, start) infinite;\n}"
},
  {
  "name": "Blueprint",
  "className": "rc-blueprint",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-blueprint {\n  width: 100%;\n  min-height: 240px;\n  background:\n    linear-gradient(0deg,\n      transparent 0 calc(100% - 1px), rgba(180,220,255,0.4) calc(100% - 1px) 100%),\n    linear-gradient(90deg,\n      transparent 0 calc(100% - 1px), rgba(180,220,255,0.4) calc(100% - 1px) 100%),\n    repeating-linear-gradient(0deg, transparent 0 19px, rgba(180,220,255,0.18) 19px 20px),\n    repeating-linear-gradient(90deg, transparent 0 19px, rgba(180,220,255,0.18) 19px 20px),\n    repeating-linear-gradient(0deg, transparent 0 99px, rgba(180,220,255,0.35) 99px 100px),\n    repeating-linear-gradient(90deg, transparent 0 99px, rgba(180,220,255,0.35) 99px 100px),\n    #0a3d7a;\n  background-size: 20px 20px, 20px 20px, 20px 20px, 20px 20px, 100px 100px, 100px 100px, 100% 100%;\n  position: relative;\n  border-radius: 4px;\n  overflow: hidden;\n  color: #cfe8ff;\n}"
},
  {
  "name": "Blur In Up",
  "className": "rc-blur-in-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-blur-in-up {\n  animation: roy-blur-in-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;\n}"
},
  {
  "name": "Blur Out Down",
  "className": "rc-blur-out-down",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-blur-out-down {\n  animation: roy-blur-out-down 0.85s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}"
},
  {
  "name": "Book Open",
  "className": "rc-book-open",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-book-open {\n  perspective: 1000px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  transform-style: preserve-3d;\n  background: transparent;\n}"
},
  {
  "name": "Border Animated Dash",
  "className": "rc-border-animated-dash",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-animated-dash {\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border: 3px dashed #10b981;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #d1fae5;\n  font-size: 12px;\n  font-weight: 600;\n  animation: roy-border-dash-glow 1.6s ease-in-out infinite;\n}"
},
  {
  "name": "Border Banner",
  "className": "rc-border-banner",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-banner {\n  width: 140px;\n  height: 80px;\n  background: linear-gradient(135deg, #f59e0b, #ef4444);\n  clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  padding-right: 16px;\n  box-sizing: border-box;\n}"
},
  {
  "name": "Border Clip Path",
  "className": "rc-border-clip-path",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-clip-path {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n}"
},
  {
  "name": "Border Corner Brackets",
  "className": "rc-border-corner-brackets",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-corner-brackets {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  background-image:\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4);\n  background-position:\n    top left, top left,\n    top right, top right,\n    bottom left, bottom left,\n    bottom right, bottom right;\n  background-size:\n    22px 3px, 3px 22px,\n    22px 3px, 3px 22px,\n    22px 3px, 3px 22px,\n    22px 3px, 3px 22px;\n  background-repeat: no-repeat;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #67e8f9;\n  font-size: 12px;\n  font-weight: 600;\n}"
},
  {
  "name": "Border Dashed Draw",
  "className": "rc-border-dashed-draw",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-dashed-draw {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #a78bfa;\n  font-size: 12px;\n  font-weight: 600;\n}"
},
  {
  "name": "Border Double Glow",
  "className": "rc-border-double-glow",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-double-glow {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border: 1px solid #10b981;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #6ee7b7;\n  font-size: 12px;\n  font-weight: 600;\n  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5), 0 0 24px rgba(16, 185, 129, 0.3), inset 0 0 12px rgba(16, 185, 129, 0.2);\n}"
},
  {
  "name": "Border Frame",
  "className": "rc-border-frame",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-frame {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #1e293b;\n  border: 3px double #f59e0b;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fde68a;\n  font-size: 12px;\n  font-weight: 600;\n  outline: 1px solid #f59e0b;\n  outline-offset: 4px;\n}"
},
  {
  "name": "Border Gradient Animated",
  "className": "rc-border-gradient-animated",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-gradient-animated {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #e2e8f0;\n  font-size: 12px;\n  font-weight: 600;\n}"
},
  {
  "name": "Border Inset Glow",
  "className": "rc-border-inset-glow",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-inset-glow {\n  width: 140px;\n  height: 80px;\n  background: #0a0a0a;\n  border: 1px solid rgba(6, 182, 212, 0.5);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #67e8f9;\n  font-size: 12px;\n  font-weight: 600;\n  box-shadow:\n    inset 0 0 22px rgba(6, 182, 212, 0.4),\n    inset 0 0 4px rgba(6, 182, 212, 0.7);\n}"
},
  {
  "name": "Border Marching Ants",
  "className": "rc-border-marching-ants",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-marching-ants {\n  width: 140px;\n  height: 80px;\n  background-color: #0f172a;\n  background-image:\n    repeating-linear-gradient(90deg, #f59e0b 0 6px, transparent 6px 12px),\n    repeating-linear-gradient(90deg, #f59e0b 0 6px, transparent 6px 12px),\n    repeating-linear-gradient(0deg, #f59e0b 0 6px, transparent 6px 12px),\n    repeating-linear-gradient(0deg, #f59e0b 0 6px, transparent 6px 12px);\n  background-position: 0 0, 0 100%, 0 0, 100% 0;\n  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;\n  background-size: 12px 2px, 12px 2px, 2px 12px, 2px 12px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fde68a;\n  font-size: 12px;\n  font-weight: 600;\n  animation: roy-border-march 0.7s linear infinite;\n}"
},
  {
  "name": "Border Neon Pulse",
  "className": "rc-border-neon-pulse",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-neon-pulse {\n  width: 140px;\n  height: 80px;\n  background: #0a0a0a;\n  border: 2px solid #ec4899;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #f9a8d4;\n  font-size: 12px;\n  font-weight: 600;\n  animation: roy-border-neon 1.5s ease-in-out infinite;\n}"
},
  {
  "name": "Border Polaroid",
  "className": "rc-border-polaroid",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-polaroid {\n  width: 140px;\n  height: 110px;\n  background: #fff;\n  padding: 8px 8px 30px;\n  box-sizing: border-box;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(-4deg);\n}"
},
  {
  "name": "Border Ribbon",
  "className": "rc-border-ribbon",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-ribbon {\n  width: 140px;\n  height: 90px;\n  background: #ef4444;\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 52% 78%, 0 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  padding-bottom: 14px;\n  box-sizing: border-box;\n}"
},
  {
  "name": "Border Sticker",
  "className": "rc-border-sticker",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-sticker {\n  width: 140px;\n  height: 80px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border: 6px solid #fff;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.3);\n  transform: rotate(-3deg);\n}"
},
  {
  "name": "Border Torn Paper",
  "className": "rc-border-torn-paper",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-border-torn-paper {\n  width: 140px;\n  height: 80px;\n  background: #f8fafc;\n  color: #1e293b;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  clip-path: polygon(\n    0% 6%, 5% 0%, 12% 6%, 20% 1%, 28% 5%, 35% 0%, 42% 4%, 50% 1%, 58% 5%, 65% 0%, 72% 4%, 80% 1%, 88% 5%, 95% 0%, 100% 6%,\n    100% 94%, 95% 100%, 88% 94%, 80% 99%, 72% 95%, 65% 100%, 58% 96%, 50% 99%, 42% 95%, 35% 100%, 28% 96%, 20% 99%, 12% 95%, 5% 100%, 0% 94%\n  );\n  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));\n}"
},
  {
  "name": "Bounce In Down",
  "className": "rc-bounce-in-down",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-bounce-in-down {\n  animation: roy-bounce-in-down 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}"
},
  {
  "name": "Bounce In Left",
  "className": "rc-bounce-in-left",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-bounce-in-left {\n  animation: roy-bounce-in-left 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}"
},
  {
  "name": "Bounce In Right",
  "className": "rc-bounce-in-right",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-bounce-in-right {\n  animation: roy-bounce-in-right 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}"
},
  {
  "name": "Bounce In Up",
  "className": "rc-bounce-in-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-bounce-in-up {\n  animation: roy-bounce-in-up 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}"
},
  {
  "name": "Bounce Out",
  "className": "rc-bounce-out",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-bounce-out {\n  animation: roy-bounce-out 1s ease-in both;\n}"
},
  {
  "name": "Bounce Rotate",
  "className": "rc-bounce-rotate",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-bounce-rotate {\n  animation: roy-bounce-rotate 1.1s cubic-bezier(0.28, 1.42, 0.55, 1) both;\n}"
},
  {
  "name": "Breathe",
  "className": "rc-breathe",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-breathe {\n  animation: roy-breathe 4s ease-in-out infinite;\n}"
},
  {
  "name": "Button 3d Push",
  "className": "rc-btn-3d-push",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-3d-push {\n  position: relative;\n  background: #84cc16;\n  color: #1a2e05;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 10px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 14px;\n  box-shadow: 0 5px 0 #65a30d, 0 7px 14px rgba(0, 0, 0, 0.25);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}"
},
  {
  "name": "Button Arrow Slide",
  "className": "rc-btn-arrow-slide",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-arrow-slide {\n  background: #f97316;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: gap 0.3s ease, background 0.3s ease;\n}"
},
  {
  "name": "Button Border Draw",
  "className": "rc-btn-border-draw",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-border-draw {\n  position: relative;\n  background: transparent;\n  color: #10b981;\n  border: 2px solid transparent;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  z-index: 1;\n}"
},
  {
  "name": "Button Border Glow",
  "className": "rc-btn-border-glow",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-border-glow {\n  background: #1e293b;\n  color: #14b8a6;\n  border: 2px solid rgba(20, 184, 166, 0.35);\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Button Bounce",
  "className": "rc-btn-bounce",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-bounce {\n  background: #f59e0b;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n}"
},
  {
  "name": "Button Expand",
  "className": "rc-btn-expand",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-expand {\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  letter-spacing: 0;\n  transition: all 0.4s ease;\n}"
},
  {
  "name": "Button Fill Slide",
  "className": "rc-btn-fill-slide",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-fill-slide {\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  background: transparent;\n  color: #10b981;\n  border: 2px solid #10b981;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: color 0.4s ease;\n}"
},
  {
  "name": "Button Flip",
  "className": "rc-btn-flip",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-flip {\n  background: #ec4899;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transform-style: preserve-3d;\n  transition: transform 0.6s ease, background 0.3s ease;\n}"
},
  {
  "name": "Button Glow",
  "className": "rc-btn-glow",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-glow {\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Button Gradient",
  "className": "rc-btn-gradient",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-gradient {\n  background: linear-gradient(45deg, #10b981, #06b6d4, #8b5cf6, #ec4899, #10b981);\n  background-size: 300% 300%;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  animation: roy-btn-gradient 5s ease infinite;\n  transition: transform 0.3s ease;\n}"
},
  {
  "name": "Button Icon Slide",
  "className": "rc-btn-icon-slide",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-icon-slide {\n  background: #d946ef;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  gap: 0;\n  transition: padding 0.3s ease, gap 0.3s ease;\n}"
},
  {
  "name": "Button Lift",
  "className": "rc-btn-lift",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-lift {\n  background: #14b8a6;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 4px 10px rgba(20, 184, 166, 0.25);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}"
},
  {
  "name": "Button Liquid",
  "className": "rc-btn-liquid",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-liquid {\n  background: #06b6d4;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 30px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: border-radius 0.4s ease, background 0.4s ease;\n}"
},
  {
  "name": "Button Morph",
  "className": "rc-btn-morph",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-morph {\n  background: #8b5cf6;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);\n}"
},
  {
  "name": "Button Neon",
  "className": "rc-btn-neon",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-neon {\n  background: #0a0a0a;\n  color: #06b6d4;\n  border: 2px solid #06b6d4;\n  padding: 10px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  box-shadow: 0 0 5px #06b6d4, inset 0 0 5px rgba(6, 182, 212, 0.4);\n  text-shadow: 0 0 5px #06b6d4;\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Button Outline Fill",
  "className": "rc-btn-outline-fill",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-outline-fill {\n  position: relative;\n  background: transparent;\n  color: #f43f5e;\n  border: 2px solid #f43f5e;\n  padding: 10px 24px;\n  border-radius: 30px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  overflow: hidden;\n  z-index: 1;\n  transition: color 0.4s ease;\n}"
},
  {
  "name": "Button Press",
  "className": "rc-btn-press",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-press {\n  background: #8b5cf6;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 6px 0 #6d28d9, 0 8px 14px rgba(0, 0, 0, 0.25);\n  transition: transform 0.1s ease, box-shadow 0.1s ease;\n}"
},
  {
  "name": "Button Pulse",
  "className": "rc-btn-pulse",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-pulse {\n  background: #ef4444;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: background 0.3s ease;\n}"
},
  {
  "name": "Button Ripple",
  "className": "rc-btn-ripple",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-ripple {\n  position: relative;\n  overflow: hidden;\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n}"
},
  {
  "name": "Button Rotate",
  "className": "rc-btn-rotate",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-rotate {\n  background: #f59e0b;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: transform 0.3s ease, background 0.3s ease;\n}"
},
  {
  "name": "Button Shadow Push",
  "className": "rc-btn-shadow-push",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-shadow-push {\n  background: #ef4444;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 14px;\n  box-shadow: 5px 5px 0 #7f1d1d;\n  transition: transform 0.12s ease, box-shadow 0.12s ease;\n}"
},
  {
  "name": "Button Shine Sweep",
  "className": "rc-btn-shine-sweep",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-shine-sweep {\n  position: relative;\n  overflow: hidden;\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n}"
},
  {
  "name": "Button Skew",
  "className": "rc-btn-skew",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-skew {\n  background: #ec4899;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: transform 0.3s ease, background 0.3s ease;\n}"
},
  {
  "name": "Button Slide Bg",
  "className": "rc-btn-slide-bg",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-slide-bg {\n  position: relative;\n  overflow: hidden;\n  background: #0f172a;\n  color: #f59e0b;\n  border: 2px solid #f59e0b;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  z-index: 1;\n  transition: color 0.4s ease;\n}"
},
  {
  "name": "Button Sparkle",
  "className": "rc-btn-sparkle",
  "category": "button-card",
  "displayType": "button",
  "css": ".rc-btn-sparkle {\n  position: relative;\n  background: #1e293b;\n  color: #fde68a;\n  border: 1px solid #f59e0b;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: color 0.3s ease, box-shadow 0.3s ease;\n}"
},
  {
  "name": "Card Flip",
  "className": "rc-card-flip",
  "category": "3d-transforms",
  "displayType": "card",
  "css": ".rc-card-flip {\n  perspective: 1000px;\n  width: 200px;\n  height: 120px;\n}"
},
  {
  "name": "Card Flip Back",
  "className": "rc-card-flip-back",
  "category": "3d-transforms",
  "displayType": "card",
  "css": ".rc-card-flip-back {\n  position: absolute;\n  inset: 0;\n  backface-visibility: hidden;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
},
  {
  "name": "Card Flip Inner",
  "className": "rc-card-flip-inner",
  "category": "3d-transforms",
  "displayType": "card",
  "css": ".rc-card-flip-inner {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n  transform-style: preserve-3d;\n}"
},
  {
  "name": "Card Glassmorphism",
  "className": "rc-card-glassmorphism",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-glassmorphism {\n  background: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 16px;\n  padding: 24px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n  color: #f1f5f9;\n}"
},
  {
  "name": "Card Gradient Border",
  "className": "rc-card-gradient-border",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-gradient-border {\n  position: relative;\n  background: #0f172a;\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n}"
},
  {
  "name": "Card Hover Border",
  "className": "rc-card-hover-border",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-border {\n  position: relative;\n  background: #1e293b;\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n}"
},
  {
  "name": "Card Hover Color",
  "className": "rc-card-hover-color",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-color {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease;\n}"
},
  {
  "name": "Card Hover Fade",
  "className": "rc-card-hover-fade",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-fade {\n  position: relative;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  overflow: hidden;\n}"
},
  {
  "name": "Card Hover Flip",
  "className": "rc-card-hover-flip",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-flip {\n  background: #1e293b;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transform-style: preserve-3d;\n  transition: transform 0.7s ease, background 0.4s ease, color 0.4s ease;\n}"
},
  {
  "name": "Card Hover Glow",
  "className": "rc-card-hover-glow",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-glow {\n  background: #0f172a;\n  border: 1px solid rgba(16, 185, 129, 0.2);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: box-shadow 0.4s ease, border-color 0.4s ease;\n}"
},
  {
  "name": "Card Hover Lift",
  "className": "rc-card-hover-lift",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-lift {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;\n}"
},
  {
  "name": "Card Hover Press",
  "className": "rc-card-hover-press",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-press {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.3);\n  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;\n}"
},
  {
  "name": "Card Hover Push",
  "className": "rc-card-hover-push",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-push {\n  position: relative;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transform-style: preserve-3d;\n  transition: transform 0.35s ease;\n}"
},
  {
  "name": "Card Hover Reveal",
  "className": "rc-card-hover-reveal",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-reveal {\n  position: relative;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  overflow: hidden;\n}"
},
  {
  "name": "Card Hover Rotate",
  "className": "rc-card-hover-rotate",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-rotate {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  perspective: 800px;\n  transform-style: preserve-3d;\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}"
},
  {
  "name": "Card Hover Skew",
  "className": "rc-card-hover-skew",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-skew {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease;\n}"
},
  {
  "name": "Card Hover Slide",
  "className": "rc-card-hover-slide",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-slide {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;\n}"
},
  {
  "name": "Card Hover Swing",
  "className": "rc-card-hover-swing",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-swing {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transform-origin: top center;\n  transition: transform 0.3s ease;\n}"
},
  {
  "name": "Card Hover Tada",
  "className": "rc-card-hover-tada",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-tada {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.3s ease;\n}"
},
  {
  "name": "Card Hover Wobble",
  "className": "rc-card-hover-wobble",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-wobble {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.3s ease;\n}"
},
  {
  "name": "Card Hover Zoom",
  "className": "rc-card-hover-zoom",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-hover-zoom {\n  background: linear-gradient(135deg, #134e4a, #1e293b);\n  border: 1px solid rgba(20, 184, 166, 0.25);\n  border-radius: 16px;\n  padding: 24px;\n  color: #ccfbf1;\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}"
},
  {
  "name": "Card Neon",
  "className": "rc-card-neon",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-neon {\n  background: #0f172a;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  border-radius: 16px;\n  padding: 24px;\n  color: #d1fae5;\n  animation: roy-card-neon 2s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Card Shuffle",
  "className": "rc-card-shuffle",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-shuffle {\n  position: relative;\n  width: 200px;\n  height: 220px;\n  perspective: 1000px;\n}"
},
  {
  "name": "Card Spotlight",
  "className": "rc-card-spotlight",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-card-spotlight {\n  position: relative;\n  overflow: hidden;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n}"
},
  {
  "name": "Clip Path Hexagon",
  "className": "rc-clip-path-hexagon",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-clip-path-hexagon {\n  width: 160px;\n  height: 160px;\n  background:\n    conic-gradient(from 30deg, #f59e0b, #ef4444, #ec4899, #8b5cf6, #f59e0b);\n  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);\n  display: grid;\n  place-items: center;\n  animation: roy-b10-cph-spin 6s linear infinite;\n}"
},
  {
  "name": "Clip Path Star",
  "className": "rc-clip-path-star",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-clip-path-star {\n  width: 170px;\n  height: 170px;\n  background: linear-gradient(135deg, #fbbf24, #f59e0b 40%, #b45309);\n  clip-path: polygon(\n    50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,\n    50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%\n  );\n  display: grid;\n  place-items: center;\n  animation: roy-b10-cps-twinkle 1.8s ease-in-out infinite;\n}"
},
  {
  "name": "Cube Face",
  "className": "rc-cube-face",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-cube-face {\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  border: 2px solid rgba(16, 185, 129, 0.5);\n  background: rgba(16, 185, 129, 0.08);\n  border-radius: 4px;\n}"
},
  {
  "name": "Cube Rotate",
  "className": "rc-cube-rotate",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-cube-rotate {\n  width: 60px;\n  height: 60px;\n  transform-style: preserve-3d;\n  animation: roy-cube-rotate 6s linear infinite;\n}"
},
  {
  "name": "Cursor Arrow Bounce",
  "className": "rc-cursor-arrow-bounce",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-arrow-bounce {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #2a1a08, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Blob",
  "className": "rc-cursor-blob",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-blob {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #111827, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Crosshair",
  "className": "rc-cursor-crosshair",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-crosshair {\n  position: relative;\n  background:\n    linear-gradient(0deg, transparent 49.5%, rgba(148, 163, 184, 0.08) 49.5% 50.5%, transparent 50.5%),\n    linear-gradient(90deg, transparent 49.5%, rgba(148, 163, 184, 0.08) 49.5% 50.5%, transparent 50.5%),\n    radial-gradient(circle at 50% 50%, #1a0f1f, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Firefly",
  "className": "rc-cursor-firefly",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-firefly {\n  position: relative;\n  background: linear-gradient(135deg, #0a0f1f, #1a0f2e);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Glow Dot",
  "className": "rc-cursor-glow-dot",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-glow-dot {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #111827, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Gradient Trail",
  "className": "rc-cursor-gradient-trail",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-gradient-trail {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #1a0f2e, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Magnetic",
  "className": "rc-cursor-magnetic",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-magnetic {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0b1020, #111827);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: 10px;\n  cursor: pointer;\n  transition:\n    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),\n    border-color 0.3s ease,\n    box-shadow 0.3s ease;\n}"
},
  {
  "name": "Cursor Pulse Ring",
  "className": "rc-cursor-pulse-ring",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-pulse-ring {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #1f0f2e, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Ring",
  "className": "rc-cursor-ring",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-ring {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #0c1426, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Ripple",
  "className": "rc-cursor-ripple",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-ripple {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #0c2a1f, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Spotlight",
  "className": "rc-cursor-spotlight",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-spotlight {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e1b4b);\n  overflow: hidden;\n}"
},
  {
  "name": "Cursor Trail",
  "className": "rc-cursor-trail",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-cursor-trail {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #1a0f2e, #0b1020);\n  overflow: hidden;\n}"
},
  {
  "name": "Deep Sea",
  "className": "rc-deep-sea",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-deep-sea {\n  position: relative;\n  width: 220px;\n  height: 180px;\n  border-radius: 8px;\n  overflow: hidden;\n  background: linear-gradient(180deg, #1a5f7a 0%, #0d3f56 40%, #061f2e 80%, #02101a 100%);\n}"
},
  {
  "name": "Depth Shadow",
  "className": "rc-depth-shadow",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-depth-shadow {\n  box-shadow:\n    1px 1px 0 #065f46,\n    2px 2px 0 #059669,\n    3px 3px 0 #047857,\n    4px 4px 0 #10b981,\n    5px 5px 0 rgba(16, 185, 129, 0.6),\n    6px 6px 0 rgba(16, 185, 129, 0.4),\n    7px 7px 0 rgba(16, 185, 129, 0.2),\n    8px 8px 20px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Door Open",
  "className": "rc-door-open",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-door-open {\n  perspective: 800px;\n  width: 60px;\n  height: 80px;\n  position: relative;\n  background: rgba(16, 185, 129, 0.1);\n  border: 2px solid rgba(16, 185, 129, 0.3);\n  border-radius: 4px;\n}"
},
  {
  "name": "Drawer Slide",
  "className": "rc-drawer-slide",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-drawer-slide {\n  perspective: 800px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  background: rgba(16, 185, 129, 0.08);\n  border: 2px solid rgba(16, 185, 129, 0.25);\n  border-radius: 6px;\n}"
},
  {
  "name": "Fade In Bl",
  "className": "rc-fade-in-bl",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-in-bl {\n  animation: roy-fade-in-bl 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;\n}"
},
  {
  "name": "Fade In Br",
  "className": "rc-fade-in-br",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-in-br {\n  animation: roy-fade-in-br 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;\n}"
},
  {
  "name": "Fade In Right",
  "className": "rc-fade-in-right",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-in-right {\n  animation: roy-fade-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n}"
},
  {
  "name": "Fade Out Down",
  "className": "rc-fade-out-down",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-out-down {\n  animation: roy-fade-out-down 0.7s ease-in both;\n}"
},
  {
  "name": "Fade Out Left",
  "className": "rc-fade-out-left",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-out-left {\n  animation: roy-fade-out-left 0.7s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}"
},
  {
  "name": "Fade Out Right",
  "className": "rc-fade-out-right",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-out-right {\n  animation: roy-fade-out-right 0.7s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}"
},
  {
  "name": "Fade Out Up",
  "className": "rc-fade-out-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-fade-out-up {\n  animation: roy-fade-out-up 0.7s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}"
},
  {
  "name": "Filter Blur Focus",
  "className": "rc-filter-blur-focus",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-blur-focus {\n  background: linear-gradient(135deg, #f7797d 0%, #fbd786 50%, #c6ffdd 100%);\n  filter: blur(8px) saturate(1.2);\n  animation: roy-filter-blur-focus 3s ease-in-out infinite;\n}"
},
  {
  "name": "Filter Cinematic",
  "className": "rc-filter-cinematic",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-cinematic {\n  background: linear-gradient(135deg, #f12711 0%, #f5af19 40%, #2193b0 80%, #6dd5ed 100%);\n  filter: contrast(1.25) saturate(1.3) brightness(0.92) hue-rotate(-8deg) sepia(0.18);\n}"
},
  {
  "name": "Filter Contrast",
  "className": "rc-filter-contrast",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-contrast {\n  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 50%, #bdc3c7 100%);\n  filter: contrast(2.4) brightness(1.05);\n}"
},
  {
  "name": "Filter Dramatic",
  "className": "rc-filter-dramatic",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-dramatic {\n  background: linear-gradient(135deg, #ee9ca7 0%, #ffdde1 30%, #ff758c 60%, #ff7e5f 100%);\n  filter: contrast(1.6) saturate(1.5) brightness(0.82);\n}"
},
  {
  "name": "Filter Dreamy",
  "className": "rc-filter-dreamy",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-dreamy {\n  background: linear-gradient(135deg, #c471f5 0%, #fa71cd 40%, #89f7fe 100%);\n  filter: blur(1.2px) brightness(1.18) saturate(1.4) contrast(0.92);\n}"
},
  {
  "name": "Filter Duotone",
  "className": "rc-filter-duotone",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-duotone {\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #fbc2eb 100%);\n  filter: grayscale(1) sepia(1) hue-rotate(180deg) saturate(3) contrast(1.3);\n}"
},
  {
  "name": "Filter Emboss",
  "className": "rc-filter-emboss",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-emboss {\n  background: linear-gradient(135deg, #414d0b 0%, #727a17 50%, #d7e850 100%);\n  filter: grayscale(1) brightness(1.1) contrast(1.4)\n    drop-shadow(2px 2px 1px rgba(255,255,255,0.5))\n    drop-shadow(-2px -2px 1px rgba(0,0,0,0.6));\n}"
},
  {
  "name": "Filter Glitch",
  "className": "rc-filter-glitch",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-glitch {\n  background: linear-gradient(135deg, #00f260 0%, #0575e6 50%, #f7971e 100%);\n  animation: roy-filter-glitch 1.2s steps(2, end) infinite;\n}"
},
  {
  "name": "Filter Grayscale Hover",
  "className": "rc-filter-grayscale-hover",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-grayscale-hover {\n  background: linear-gradient(135deg, #fc466b 0%, #3f5efb 50%, #fc466b 100%);\n  filter: grayscale(1) brightness(0.85);\n  transition: filter 0.5s ease;\n}"
},
  {
  "name": "Filter Halftone",
  "className": "rc-filter-halftone",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-halftone {\n  background:\n    radial-gradient(circle, rgba(0,0,0,0.85) 1px, transparent 1.6px) 0 0 / 5px 5px,\n    linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%);\n  filter: contrast(1.4) saturate(1.3);\n}"
},
  {
  "name": "Filter Hue Rotate",
  "className": "rc-filter-hue-rotate",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-hue-rotate {\n  background: linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%);\n  animation: roy-filter-hue-rotate 4s linear infinite;\n}"
},
  {
  "name": "Filter Invert",
  "className": "rc-filter-invert",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-invert {\n  background: linear-gradient(135deg, #ff6a00 0%, #ee0979 50%, #ff6a00 100%);\n  filter: invert(1) hue-rotate(180deg);\n}"
},
  {
  "name": "Filter Saturate",
  "className": "rc-filter-saturate",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-saturate {\n  background: linear-gradient(135deg, #c94b4b 0%, #4b134f 50%, #c94b4b 100%);\n  filter: saturate(3.2) contrast(1.1);\n}"
},
  {
  "name": "Filter Sepia",
  "className": "rc-filter-sepia",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-sepia {\n  background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 50%, #fef9d7 100%);\n  filter: sepia(0.85) contrast(1.1) brightness(1.05);\n}"
},
  {
  "name": "Filter Vintage",
  "className": "rc-filter-vintage",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-filter-vintage {\n  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 40%, #ff9ff3 80%, #48dbfb 100%);\n  filter: sepia(0.55) saturate(0.8) contrast(0.9) brightness(0.95) hue-rotate(-10deg);\n}"
},
  {
  "name": "Flip X",
  "className": "rc-flip-x",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-flip-x {\n  perspective: 800px;\n  transition: transform 0.6s ease;\n  transform-style: preserve-3d;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 12px;\n}"
},
  {
  "name": "Flip Y",
  "className": "rc-flip-y",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-flip-y {\n  perspective: 800px;\n  transition: transform 0.6s ease;\n  transform-style: preserve-3d;\n  background: linear-gradient(135deg, #06b6d4, #8b5cf6);\n  border-radius: 12px;\n}"
},
  {
  "name": "Float",
  "className": "rc-float",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-float {\n  animation: roy-float 3s ease-in-out infinite;\n}"
},
  {
  "name": "Fold",
  "className": "rc-fold",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-fold {\n  perspective: 800px;\n  width: 80px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 6px;\n  transition: transform 0.8s ease;\n  transform-origin: top center;\n}"
},
  {
  "name": "Form Checkbox Custom",
  "className": "rc-form-checkbox-custom",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-checkbox-custom {\n  position: relative;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: 2px solid #10b981;\n  border-radius: 7px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
},
  {
  "name": "Form Error Shake",
  "className": "rc-form-error-shake",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-error-shake {\n  position: relative;\n  width: 160px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(239,68,68,0.08);\n  border: 1px solid #ef4444;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  color: #fca5a5;\n  animation: roy-form-error-shake 0.5s ease-in-out infinite;\n}"
},
  {
  "name": "Form Focus Glow",
  "className": "rc-form-focus-glow",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-focus-glow {\n  position: relative;\n  width: 170px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.55);\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Form Label Float",
  "className": "rc-form-label-float",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-label-float {\n  position: relative;\n  width: 170px;\n  height: 48px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 10px;\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Form Placeholder Shimmer",
  "className": "rc-form-placeholder-shimmer",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-placeholder-shimmer {\n  position: relative;\n  width: 180px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  overflow: hidden;\n}"
},
  {
  "name": "Form Radio Custom",
  "className": "rc-form-radio-custom",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-radio-custom {\n  position: relative;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: 2px solid #10b981;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
},
  {
  "name": "Form Search Expand",
  "className": "rc-form-search-expand",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-search-expand {\n  position: relative;\n  width: 56px;\n  height: 40px;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  padding: 0 14px;\n  font: 12px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.6);\n  overflow: hidden;\n  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.4s ease;\n}"
},
  {
  "name": "Form Success Check",
  "className": "rc-form-success-check",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-success-check {\n  position: relative;\n  width: 160px;\n  height: 40px;\n  padding: 0 14px 0 38px;\n  background: rgba(16,185,129,0.1);\n  border: 1px solid #10b981;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  color: #6ee7b7;\n}"
},
  {
  "name": "Form Toggle Switch",
  "className": "rc-form-toggle-switch",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-toggle-switch {\n  position: relative;\n  width: 54px;\n  height: 28px;\n  background: rgba(255,255,255,0.08);\n  border: 1px solid rgba(255,255,255,0.2);\n  border-radius: 14px;\n  transition: background 0.3s ease, border-color 0.3s ease;\n}"
},
  {
  "name": "Form Underline Draw",
  "className": "rc-form-underline-draw",
  "category": "forms",
  "displayType": "box",
  "css": ".rc-form-underline-draw {\n  position: relative;\n  width: 180px;\n  height: 40px;\n  padding: 0 4px;\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid rgba(255,255,255,0.18);\n  display: flex;\n  align-items: center;\n  font: 13px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n}"
},
  {
  "name": "Fortune Teller",
  "className": "rc-fortune-teller",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-fortune-teller {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  background: transparent;\n}"
},
  {
  "name": "Frozen Ice",
  "className": "rc-frozen-ice",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-frozen-ice {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 14px;\n  overflow: hidden;\n  background:\n    radial-gradient(ellipse 50% 40% at 25% 20%, rgba(255,255,255,0.7), transparent 60%),\n    radial-gradient(ellipse 40% 30% at 75% 75%, rgba(150,210,255,0.5), transparent 60%),\n    linear-gradient(135deg, #d4ebf7 0%, #a8d4ec 35%, #6fa8c8 70%, #cfe8f5 100%);\n  box-shadow:\n    inset 8px 12px 25px rgba(255,255,255,0.6),\n    inset -8px -12px 25px rgba(40,90,140,0.4),\n    0 10px 30px rgba(80,140,180,0.4);\n  border: 1px solid rgba(255,255,255,0.7);\n  backdrop-filter: blur(2px);\n}"
},
  {
  "name": "Glass Acrylic",
  "className": "rc-glass-acrylic",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-acrylic {\n  background: rgba(245, 247, 250, 0.65);\n  backdrop-filter: blur(30px) saturate(140%);\n  -webkit-backdrop-filter: blur(30px) saturate(140%);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.2);\n}"
},
  {
  "name": "Glass Border Glow",
  "className": "rc-glass-border-glow",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-border-glow {\n  position: relative;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px) saturate(160%);\n  -webkit-backdrop-filter: blur(16px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  animation: roy-glass-border-pulse 3s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Glass Claymorphism",
  "className": "rc-glass-claymorphism",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-claymorphism {\n  background: linear-gradient(145deg, #fef3f8, #fbcfe8);\n  border-radius: 28px;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow:\n    8px 8px 16px rgba(190, 24, 93, 0.18),\n    -4px -4px 12px rgba(255, 255, 255, 0.9),\n    inset 2px 2px 4px rgba(255, 255, 255, 0.7),\n    inset -2px -2px 6px rgba(190, 24, 93, 0.12);\n}"
},
  {
  "name": "Glass Depth Layer",
  "className": "rc-glass-depth-layer",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-depth-layer {\n  position: relative;\n  background: rgba(255, 255, 255, 0.18);\n  backdrop-filter: blur(28px) saturate(160%);\n  -webkit-backdrop-filter: blur(28px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 18px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.5) inset,\n    0 -1px 0 rgba(0, 0, 0, 0.05) inset,\n    0 2px 4px rgba(0, 0, 0, 0.08),\n    0 8px 16px rgba(0, 0, 0, 0.12),\n    0 20px 40px rgba(0, 0, 0, 0.15);\n  color: #1d1d1f;\n}"
},
  {
  "name": "Glass Frosted",
  "className": "rc-glass-frosted",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-frosted {\n  background: rgba(255, 255, 255, 0.12);\n  backdrop-filter: blur(20px) saturate(180%);\n  -webkit-backdrop-filter: blur(20px) saturate(180%);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n}"
},
  {
  "name": "Glass Frosted Dark",
  "className": "rc-glass-frosted-dark",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-frosted-dark {\n  background: rgba(20, 20, 35, 0.55);\n  backdrop-filter: blur(20px) saturate(160%);\n  -webkit-backdrop-filter: blur(20px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}"
},
  {
  "name": "Glass Liquid",
  "className": "rc-glass-liquid",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-liquid {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(8px) brightness(1.1) contrast(1.05) hue-rotate(15deg);\n  -webkit-backdrop-filter: blur(8px) brightness(1.1) contrast(1.05) hue-rotate(15deg);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 24px;\n  box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.4),\n              inset 0 -2px 6px rgba(0, 0, 0, 0.1),\n              0 10px 30px rgba(0, 0, 0, 0.15);\n  animation: roy-glass-liquid-refract 6s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Glass Neumorphism",
  "className": "rc-glass-neumorphism",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-neumorphism {\n  background: #e0e5ec;\n  border-radius: 16px;\n  box-shadow: 8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff;\n}"
},
  {
  "name": "Glass Neumorphism Inset",
  "className": "rc-glass-neumorphism-inset",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-neumorphism-inset {\n  background: #e0e5ec;\n  border-radius: 16px;\n  box-shadow: inset 6px 6px 12px #b8bcc2, inset -6px -6px 12px #ffffff;\n}"
},
  {
  "name": "Glass Noise Overlay",
  "className": "rc-glass-noise-overlay",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-noise-overlay {\n  position: relative;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px) saturate(160%);\n  -webkit-backdrop-filter: blur(16px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n}"
},
  {
  "name": "Glass Prism",
  "className": "rc-glass-prism",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-prism {\n  position: relative;\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(24px) saturate(180%);\n  -webkit-backdrop-filter: blur(24px) saturate(180%);\n  border-radius: 16px;\n  color: #fff;\n}"
},
  {
  "name": "Glass Reflection",
  "className": "rc-glass-reflection",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-reflection {\n  position: relative;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px) saturate(160%);\n  -webkit-backdrop-filter: blur(16px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n}"
},
  {
  "name": "Glass Transparent Blur",
  "className": "rc-glass-transparent-blur",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-transparent-blur {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 10px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n}"
},
  {
  "name": "Glass Vibrant",
  "className": "rc-glass-vibrant",
  "category": "button-card",
  "displayType": "card",
  "css": ".rc-glass-vibrant {\n  background: linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(236, 72, 153, 0.28));\n  backdrop-filter: blur(16px) saturate(220%) brightness(1.1);\n  -webkit-backdrop-filter: blur(16px) saturate(220%) brightness(1.1);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35);\n}"
},
  {
  "name": "Gold Leaf",
  "className": "rc-gold-leaf",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-gold-leaf {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 8px;\n  background:\n    radial-gradient(ellipse 30% 25% at 20% 25%, #fff7d0, transparent 55%),\n    radial-gradient(ellipse 25% 20% at 75% 70%, #c8951c, transparent 60%),\n    radial-gradient(ellipse 20% 18% at 65% 30%, #ffe98a, transparent 55%),\n    radial-gradient(ellipse 28% 22% at 30% 75%, #b8821a, transparent 60%),\n    linear-gradient(115deg,\n      #b8821a 0%,\n      #fff3b0 12%,\n      #d4a017 28%,\n      #ffe98a 42%,\n      #a87614 58%,\n      #fff3b0 72%,\n      #c8951c 88%,\n      #8b5a0f 100%);\n  background-size: 220% 220%, 200% 200%, 200% 200%, 200% 200%, 200% 200%;\n  box-shadow:\n    inset 0 0 20px rgba(0,0,0,0.25),\n    inset 6px 8px 14px rgba(255,245,200,0.4),\n    0 8px 22px rgba(80,50,0,0.4);\n  filter: contrast(1.1) saturate(1.2);\n  animation: roy-b11-gold-leaf-shimmer 6s ease-in-out infinite;\n}"
},
  {
  "name": "Head Shake",
  "className": "rc-head-shake",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-head-shake {\n  animation: roy-head-shake 1s ease-in-out;\n}"
},
  {
  "name": "Heat Haze",
  "className": "rc-heat-haze",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-heat-haze {\n  position: relative;\n  width: 220px;\n  height: 180px;\n  border-radius: 8px;\n  overflow: hidden;\n  background:\n    linear-gradient(180deg, #87ceeb 0%, #ffd89b 60%, #ff6b35 100%);\n}"
},
  {
  "name": "Hover Border Draw",
  "className": "rc-hover-border-draw",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-border-draw {\n  position: relative;\n  box-sizing: border-box;\n}"
},
  {
  "name": "Hover Color Shift",
  "className": "rc-hover-color-shift",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-color-shift {\n  background: linear-gradient(135deg, #10b981, #059669);\n  transition: all 0.4s ease;\n  background-size: 200% 200%;\n  background-position: 0% 50%;\n}"
},
  {
  "name": "Hover Depth",
  "className": "rc-hover-depth",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-depth {\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n              box-shadow 0.4s ease;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08),\n              0 2px 4px rgba(0, 0, 0, 0.06);\n}"
},
  {
  "name": "Hover Drop Shadow",
  "className": "rc-hover-drop-shadow",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-drop-shadow {\n  transition: filter 0.35s ease, transform 0.35s ease;\n}"
},
  {
  "name": "Hover Fade Overlay",
  "className": "rc-hover-fade-overlay",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-fade-overlay {\n  position: relative;\n  isolation: isolate;\n}"
},
  {
  "name": "Hover Glow Border",
  "className": "rc-hover-glow-border",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-glow-border {\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  position: relative;\n  transition: all 0.3s ease;\n}"
},
  {
  "name": "Hover Grayscale To Color",
  "className": "rc-hover-grayscale-to-color",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-grayscale-to-color {\n  filter: grayscale(100%);\n  transition: filter 0.5s ease;\n}"
},
  {
  "name": "Hover Hue Rotate",
  "className": "rc-hover-hue-rotate",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-hue-rotate {\n  transition: filter 0.3s ease;\n}"
},
  {
  "name": "Hover Neon Flicker",
  "className": "rc-hover-neon-flicker",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-neon-flicker {\n  transition: box-shadow 0.2s ease;\n}"
},
  {
  "name": "Hover Opacity",
  "className": "rc-hover-opacity",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-opacity {\n  transition: opacity 0.3s ease;\n}"
},
  {
  "name": "Hover Overlay Reveal",
  "className": "rc-hover-overlay-reveal",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-overlay-reveal {\n  position: relative;\n  overflow: hidden;\n  transition: color 0.3s ease;\n}"
},
  {
  "name": "Hover Press",
  "className": "rc-hover-press",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-press {\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n  box-shadow: 0 6px 0 #047857, 0 8px 14px rgba(0, 0, 0, 0.3);\n}"
},
  {
  "name": "Hover Push Up",
  "className": "rc-hover-push-up",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-push-up {\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),\n              box-shadow 0.3s ease;\n}"
},
  {
  "name": "Hover Scale",
  "className": "rc-hover-scale",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-scale {\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),\n              box-shadow 0.3s ease;\n}"
},
  {
  "name": "Hover Shadow Grow",
  "className": "rc-hover-shadow-grow",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-shadow-grow {\n  transition: transform 0.3s ease,\n              box-shadow 0.3s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);\n}"
},
  {
  "name": "Hover Slide Overlay",
  "className": "rc-hover-slide-overlay",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-slide-overlay {\n  position: relative;\n  overflow: hidden;\n  transition: color 0.3s ease;\n}"
},
  {
  "name": "Hover Tilt Rotate",
  "className": "rc-hover-tilt-rotate",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-tilt-rotate {\n  transition: transform 0.3s ease;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n}"
},
  {
  "name": "Hover Underline Slide",
  "className": "rc-hover-underline-slide",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-underline-slide {\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n}"
},
  {
  "name": "Hover Zoom Blur",
  "className": "rc-hover-zoom-blur",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-zoom-blur {\n  transition: transform 0.4s ease, filter 0.4s ease;\n}"
},
  {
  "name": "Jack In Box",
  "className": "rc-jack-in-box",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-jack-in-box {\n  animation: roy-jack-in-box 1s ease both;\n}"
},
  {
  "name": "Jiggle",
  "className": "rc-jiggle",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-jiggle {\n  animation: roy-jiggle 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;\n  transform-origin: center;\n}"
},
  {
  "name": "Kaleidoscope",
  "className": "rc-kaleidoscope",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-kaleidoscope {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: #000;\n  box-shadow: 0 0 0 6px #8b6914, 0 12px 30px rgba(0,0,0,0.5);\n}"
},
  {
  "name": "Linear Aurora Glow",
  "className": "rc-linear-aurora-glow",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-aurora-glow {\n  position: relative;\n  background: #0a0a0b;\n  overflow: hidden;\n}"
},
  {
  "name": "Linear Card Lift",
  "className": "rc-linear-card-lift",
  "category": "advanced",
  "displayType": "card",
  "css": ".rc-linear-card-lift {\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 14px;\n  box-shadow: 0 0 0 0 rgba(94, 106, 210, 0);\n  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.35s ease;\n}"
},
  {
  "name": "Linear Dark Surface",
  "className": "rc-linear-dark-surface",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-dark-surface {\n  background: linear-gradient(180deg, #18181b 0%, #0f0f10 100%);\n  color: #e4e4e7;\n  border: 1px solid #27272a;\n  border-radius: 12px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.04) inset,\n    0 4px 16px rgba(0, 0, 0, 0.5);\n}"
},
  {
  "name": "Linear Depth Shadow",
  "className": "rc-linear-depth-shadow",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-depth-shadow {\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);\n  transition: box-shadow 0.4s ease, transform 0.4s ease;\n}"
},
  {
  "name": "Linear Glow Border",
  "className": "rc-linear-glow-border",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-glow-border {\n  position: relative;\n  background: #111113;\n  color: #fafafa;\n  border-radius: 12px;\n  z-index: 0;\n}"
},
  {
  "name": "Linear Gradient Mesh Bg",
  "className": "rc-linear-gradient-mesh-bg",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-gradient-mesh-bg {\n  background-color: #0a0a0b;\n  background-image:\n    radial-gradient(at 20% 20%, rgba(94, 106, 210, 0.35) 0px, transparent 50%),\n    radial-gradient(at 80% 10%, rgba(139, 92, 246, 0.3) 0px, transparent 50%),\n    radial-gradient(at 70% 80%, rgba(236, 72, 153, 0.25) 0px, transparent 50%),\n    radial-gradient(at 10% 90%, rgba(59, 130, 246, 0.25) 0px, transparent 50%);\n  background-size: 200% 200%;\n  animation: roy-mesh-drift 18s ease-in-out infinite;\n}"
},
  {
  "name": "Linear Gradient Sweep",
  "className": "rc-linear-gradient-sweep",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-gradient-sweep {\n  position: relative;\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 8px;\n  overflow: hidden;\n  z-index: 0;\n}"
},
  {
  "name": "Linear Icon Bounce",
  "className": "rc-linear-icon-bounce",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-linear-icon-bounce {\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 8px;\n  transition: background-color 0.25s ease, border-color 0.25s ease;\n}"
},
  {
  "name": "Linear Magnetic Pull",
  "className": "rc-linear-magnetic-pull",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-magnetic-pull {\n  background: #5e6ad2;\n  color: #fff;\n  border-radius: 8px;\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  will-change: transform;\n}"
},
  {
  "name": "Linear Noise Overlay",
  "className": "rc-linear-noise-overlay",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-noise-overlay {\n  position: relative;\n  background: #0a0a0b;\n  color: #e4e4e7;\n  border: 1px solid #1a1a1d;\n  border-radius: 10px;\n  overflow: hidden;\n}"
},
  {
  "name": "Linear Shimmer Hover",
  "className": "rc-linear-shimmer-hover",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-shimmer-hover {\n  position: relative;\n  background: #0f0f10;\n  color: #e4e4e7;\n  overflow: hidden;\n  border: 1px solid #27272a;\n}"
},
  {
  "name": "Linear Spotlight",
  "className": "rc-linear-spotlight",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-spotlight {\n  position: relative;\n  background: #0d0d0f;\n  color: #e4e4e7;\n  border: 1px solid #1f1f23;\n  border-radius: 12px;\n  overflow: hidden;\n}"
},
  {
  "name": "Linear Text Glow",
  "className": "rc-linear-text-glow",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-linear-text-glow {\n  color: #a1a1aa;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  transition: color 0.3s ease, text-shadow 0.3s ease;\n}"
},
  {
  "name": "Liquid Drop",
  "className": "rc-liquid-drop",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-liquid-drop {\n  position: relative;\n  width: 180px;\n  height: 200px;\n  background: linear-gradient(180deg, #1d6a8c 0%, #0d3f56 100%);\n  overflow: hidden;\n  border-radius: 8px;\n}"
},
  {
  "name": "Liquid Metal",
  "className": "rc-liquid-metal",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-liquid-metal {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 50% 50% 45% 55% / 60% 55% 45% 40%;\n  background:\n    radial-gradient(ellipse 60% 40% at 30% 25%, rgba(255,255,255,0.95), transparent 60%),\n    radial-gradient(ellipse 50% 35% at 70% 70%, rgba(120,130,145,0.6), transparent 65%),\n    linear-gradient(125deg,\n      #d6dbe2 0%,\n      #f4f6f9 12%,\n      #8a909a 26%,\n      #e9edf2 40%,\n      #5e6571 52%,\n      #c9ced6 66%,\n      #3e434c 78%,\n      #aab0ba 90%,\n      #6b7280 100%);\n  background-size: 200% 200%;\n  box-shadow:\n    inset -8px -10px 20px rgba(0,0,0,0.45),\n    inset 8px 10px 18px rgba(255,255,255,0.55),\n    0 14px 30px rgba(0,0,0,0.35);\n  filter: contrast(1.15) saturate(0.85);\n  animation: roy-b11-liquid-metal-flow 7s ease-in-out infinite;\n}"
},
  {
  "name": "Loader Bouncing Grid",
  "className": "rc-loader-bouncing-grid",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-bouncing-grid {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-template-rows: 1fr 1fr 1fr;\n  gap: 3px;\n}"
},
  {
  "name": "Loader Chasing Dots",
  "className": "rc-loader-chasing-dots",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-chasing-dots {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  animation: roy-chasing-rotate 2s infinite linear;\n}"
},
  {
  "name": "Loader Circle Notch",
  "className": "rc-loader-circle-notch",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-circle-notch {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 4px solid #10b981;\n  border-top-color: transparent;\n  border-left-color: transparent;\n  animation: roy-circle-notch 0.9s linear infinite;\n}"
},
  {
  "name": "Loader Dual Ring",
  "className": "rc-loader-dual-ring",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-dual-ring {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 4px solid rgba(16, 185, 129, 0.15);\n  border-top-color: #10b981;\n  border-bottom-color: #06b6d4;\n  animation: roy-dual-ring-spin 1.2s linear infinite;\n}"
},
  {
  "name": "Loader Fading Dots",
  "className": "rc-loader-fading-dots",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-fading-dots {\n  width: 80px;\n  text-align: center;\n}"
},
  {
  "name": "Loader Folding Cube",
  "className": "rc-loader-folding-cube",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-folding-cube {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  transform: rotateZ(45deg);\n}"
},
  {
  "name": "Loader Indeterminate",
  "className": "rc-loader-indeterminate",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-indeterminate {\n  width: 200px;\n  height: 4px;\n  background-color: rgba(16, 185, 129, 0.15);\n  border-radius: 2px;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "Loader Line Scale",
  "className": "rc-loader-line-scale",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-line-scale {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  height: 40px;\n}"
},
  {
  "name": "Loader Pacman",
  "className": "rc-loader-pacman",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-pacman {\n  position: relative;\n  width: 60px;\n  height: 40px;\n}"
},
  {
  "name": "Loader Progress Bar",
  "className": "rc-loader-progress-bar",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-progress-bar {\n  width: 200px;\n  height: 8px;\n  background-color: rgba(16, 185, 129, 0.15);\n  border-radius: 4px;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "Loader Pulse Ring",
  "className": "rc-loader-pulse-ring",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-pulse-ring {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}"
},
  {
  "name": "Loader Skeleton",
  "className": "rc-loader-skeleton",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-skeleton {\n  width: 200px;\n  height: 12px;\n  background-color: rgba(255, 255, 255, 0.06);\n  border-radius: 4px;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "Loader Three Bounce",
  "className": "rc-loader-three-bounce",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-three-bounce {\n  width: 80px;\n  text-align: center;\n}"
},
  {
  "name": "Loader Whale",
  "className": "rc-loader-whale",
  "category": "loaders",
  "displayType": "loader",
  "css": ".rc-loader-whale {\n  width: 50px;\n  height: 40px;\n  position: relative;\n}"
},
  {
  "name": "Material Container Transform",
  "className": "rc-material-container-transform",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-container-transform {\n  animation: roy-mat-container 0.6s cubic-bezier(0.2, 0, 0, 1) both;\n  transform-origin: center;\n}"
},
  {
  "name": "Material Elevation 1",
  "className": "rc-material-elevation-1",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-elevation-1 {\n  background: #FFFBFE;\n  color: #1C1B1F;\n  border-radius: 12px;\n  box-shadow:\n    0px 1px 2px rgba(0, 0, 0, 0.30),\n    0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n}"
},
  {
  "name": "Material Elevation 3",
  "className": "rc-material-elevation-3",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-elevation-3 {\n  background: #FFFBFE;\n  color: #1C1B1F;\n  border-radius: 16px;\n  box-shadow:\n    0px 1px 3px rgba(0, 0, 0, 0.30),\n    0px 4px 8px 3px rgba(0, 0, 0, 0.15);\n}"
},
  {
  "name": "Material Elevation 5",
  "className": "rc-material-elevation-5",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-elevation-5 {\n  background: #FFFBFE;\n  color: #1C1B1F;\n  border-radius: 28px;\n  box-shadow:\n    0px 1px 3px rgba(0, 0, 0, 0.30),\n    0px 14px 28px 5px rgba(0, 0, 0, 0.25);\n}"
},
  {
  "name": "Material Emphasized",
  "className": "rc-material-emphasized",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-emphasized {\n  animation: roy-mat-emphasized 0.5s cubic-bezier(0.2, 0, 0, 1) both;\n}"
},
  {
  "name": "Material Emphasized Decel",
  "className": "rc-material-emphasized-decel",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-emphasized-decel {\n  animation: roy-mat-emph-decel 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) both;\n}"
},
  {
  "name": "Material Fab Scale",
  "className": "rc-material-fab-scale",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-fab-scale {\n  animation: roy-mat-fab-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  border-radius: 16px;\n  background: #6750A4;\n  color: #fff;\n}"
},
  {
  "name": "Material Spring Down",
  "className": "rc-material-spring-down",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-spring-down {\n  animation: roy-mat-spring-down 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}"
},
  {
  "name": "Material Spring Up",
  "className": "rc-material-spring-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-spring-up {\n  animation: roy-mat-spring-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}"
},
  {
  "name": "Material State Layer",
  "className": "rc-material-state-layer",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-state-layer {\n  position: relative;\n  background: #6750A4;\n  color: #fff;\n}"
},
  {
  "name": "Material State Layer Surface",
  "className": "rc-material-state-layer-surface",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-state-layer-surface {\n  position: relative;\n  background: #1C1B1F;\n  color: #E6E1E5;\n  border-radius: 12px;\n  overflow: hidden;\n}"
},
  {
  "name": "Material Surface Tint",
  "className": "rc-material-surface-tint",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-material-surface-tint {\n  position: relative;\n  background: rgba(103, 80, 164, 0.08);\n  backdrop-filter: blur(20px) saturate(140%);\n  -webkit-backdrop-filter: blur(20px) saturate(140%);\n  border: 1px solid rgba(103, 80, 164, 0.15);\n  border-radius: 16px;\n  color: #1C1B1F;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.1),\n    0 4px 12px rgba(103, 80, 164, 0.08);\n}"
},
  {
  "name": "Micro Accordion Expand",
  "className": "rc-micro-accordion-expand",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-accordion-expand {\n  position: relative;\n  width: 140px;\n  height: 90px;\n  background: #ffffff;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}"
},
  {
  "name": "Micro Badge Bounce",
  "className": "rc-micro-badge-bounce",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-badge-bounce {\n  position: relative;\n  width: 64px;\n  height: 64px;\n  background: #f1f5f9;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}"
},
  {
  "name": "Micro Checkbox Check",
  "className": "rc-micro-checkbox-check",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-checkbox-check {\n  position: relative;\n  width: 38px;\n  height: 38px;\n  background: #ffffff;\n  border: 2px solid #10b981;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n}"
},
  {
  "name": "Micro Dropdown Reveal",
  "className": "rc-micro-dropdown-reveal",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-dropdown-reveal {\n  position: relative;\n  width: 120px;\n  height: 90px;\n}"
},
  {
  "name": "Micro Fab Expand",
  "className": "rc-micro-fab-expand",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-fab-expand {\n  position: relative;\n  width: 150px;\n  height: 90px;\n}"
},
  {
  "name": "Micro Modal Scale",
  "className": "rc-micro-modal-scale",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-modal-scale {\n  position: relative;\n  width: 150px;\n  height: 90px;\n  overflow: hidden;\n  border-radius: 8px;\n  background: #f1f5f9;\n}"
},
  {
  "name": "Micro Progress Fill",
  "className": "rc-micro-progress-fill",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-progress-fill {\n  position: relative;\n  width: 140px;\n  height: 14px;\n  background: #e2e8f0;\n  border-radius: 7px;\n  overflow: hidden;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);\n}"
},
  {
  "name": "Micro Radio Select",
  "className": "rc-micro-radio-select",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-radio-select {\n  position: relative;\n  width: 38px;\n  height: 38px;\n  background: #ffffff;\n  border: 2px solid #10b981;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n}"
},
  {
  "name": "Micro Tab Indicator",
  "className": "rc-micro-tab-indicator",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-tab-indicator {\n  position: relative;\n  width: 150px;\n  height: 50px;\n}"
},
  {
  "name": "Micro Toast Slide",
  "className": "rc-micro-toast-slide",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-toast-slide {\n  position: relative;\n  width: 150px;\n  height: 80px;\n  overflow: hidden;\n  border-radius: 8px;\n}"
},
  {
  "name": "Micro Toggle Switch",
  "className": "rc-micro-toggle-switch",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-toggle-switch {\n  position: relative;\n  width: 56px;\n  height: 30px;\n  background: #cbd5e1;\n  border-radius: 15px;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);\n  animation: roy-micro-toggle-bg 3s ease-in-out infinite;\n}"
},
  {
  "name": "Micro Tooltip Appear",
  "className": "rc-micro-tooltip-appear",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-micro-tooltip-appear {\n  position: relative;\n  width: 130px;\n  height: 70px;\n}"
},
  {
  "name": "Misc Bubbles",
  "className": "rc-misc-bubbles",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-bubbles {\n  background:\n    radial-gradient(circle at 20% 100%, rgba(255,255,255,0.7) 0 4px, transparent 5px) 0 0 / 60px 60px,\n    radial-gradient(circle at 50% 100%, rgba(255,255,255,0.5) 0 6px, transparent 7px) 0 0 / 80px 80px,\n    radial-gradient(circle at 80% 100%, rgba(255,255,255,0.6) 0 3px, transparent 4px) 0 0 / 50px 50px,\n    linear-gradient(180deg, #2193b0, #6dd5ed);\n  background-repeat: repeat;\n  animation: roy-misc-bubbles 4s linear infinite;\n}"
},
  {
  "name": "Misc Confetti",
  "className": "rc-misc-confetti",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-confetti {\n  background:\n    radial-gradient(circle at 15% 0%, #ff6b6b 0 3px, transparent 4px) 0 0 / 40px 40px,\n    radial-gradient(circle at 45% 0%, #feca57 0 3px, transparent 4px) 0 0 / 55px 55px,\n    radial-gradient(circle at 75% 0%, #48dbfb 0 3px, transparent 4px) 0 0 / 45px 45px,\n    radial-gradient(circle at 30% 0%, #1dd1a1 0 3px, transparent 4px) 0 0 / 60px 60px,\n    radial-gradient(circle at 90% 0%, #ff9ff3 0 3px, transparent 4px) 0 0 / 50px 50px,\n    linear-gradient(135deg, #1a1a2e, #16213e);\n  background-repeat: repeat;\n  animation: roy-misc-confetti 2.5s linear infinite;\n}"
},
  {
  "name": "Misc Fireflies",
  "className": "rc-misc-fireflies",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-fireflies {\n  background:\n    radial-gradient(circle at 20% 30%, rgba(212,255,127,0.9) 0 2px, transparent 5px) 0 0 / 100px 100px,\n    radial-gradient(circle at 70% 60%, rgba(212,255,127,0.7) 0 2.5px, transparent 6px) 0 0 / 130px 130px,\n    radial-gradient(circle at 40% 80%, rgba(212,255,127,0.8) 0 1.5px, transparent 4px) 0 0 / 90px 90px,\n    linear-gradient(180deg, #0f0c29, #302b63, #24243e);\n  background-repeat: repeat;\n  animation: roy-misc-fireflies 5s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Misc Fireworks",
  "className": "rc-misc-fireworks",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-fireworks {\n  position: relative;\n  background: linear-gradient(180deg, #0a0a23, #1a1a4e);\n  overflow: hidden;\n}"
},
  {
  "name": "Misc Hologram",
  "className": "rc-misc-hologram",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-hologram {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: linear-gradient(115deg,\n    #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%);\n  background-size: 400% 100%;\n  border-radius: 16px;\n  border: 1px solid rgba(255,255,255,0.3);\n  box-shadow: 0 0 22px rgba(131,56,236,0.45);\n  animation: roy-misc-hologram 4s linear infinite;\n}"
},
  {
  "name": "Misc Pulse Ring Expand",
  "className": "rc-misc-pulse-ring-expand",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-pulse-ring-expand {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: transparent;\n  border: none;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
},
  {
  "name": "Misc Rain",
  "className": "rc-misc-rain",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-rain {\n  background:\n    linear-gradient(105deg, transparent 0 48%, rgba(174,194,224,0.6) 48% 50%, transparent 50% 100%) 0 0 / 15px 30px,\n    linear-gradient(105deg, transparent 0 49%, rgba(174,194,224,0.35) 49% 50%, transparent 50% 100%) 0 0 / 25px 40px,\n    linear-gradient(180deg, #1a2a3a, #2c3e50);\n  background-repeat: repeat;\n  animation: roy-misc-rain 0.6s linear infinite;\n}"
},
  {
  "name": "Misc Ripple Click",
  "className": "rc-misc-ripple-click",
  "category": "advanced",
  "displayType": "bg",
  "css": ".rc-misc-ripple-click {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: rgba(16,185,129,0.1);\n  border: 1px solid rgba(16,185,129,0.3);\n  border-radius: 16px;\n  overflow: hidden;\n  cursor: pointer;\n}"
},
  {
  "name": "Misc Scan Line",
  "className": "rc-misc-scan-line",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-scan-line {\n  position: relative;\n  background:\n    repeating-linear-gradient(0deg, rgba(16,185,129,0.06) 0 2px, transparent 2px 4px),\n    linear-gradient(180deg, #0a1a14, #142822);\n  overflow: hidden;\n}"
},
  {
  "name": "Misc Shimmer Overlay",
  "className": "rc-misc-shimmer-overlay",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-shimmer-overlay {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: linear-gradient(135deg, #10b981, #34d399);\n  border-radius: 16px;\n  overflow: hidden;\n}"
},
  {
  "name": "Misc Snow",
  "className": "rc-misc-snow",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-snow {\n  background:\n    radial-gradient(circle at 10% 0%, #fff 0 2px, transparent 3px) 0 0 / 30px 30px,\n    radial-gradient(circle at 60% 0%, #fff 0 1.5px, transparent 2px) 0 0 / 45px 45px,\n    radial-gradient(circle at 80% 0%, #fff 0 2.5px, transparent 3px) 0 0 / 35px 35px,\n    radial-gradient(circle at 30% 0%, rgba(255,255,255,0.7) 0 1px, transparent 2px) 0 0 / 25px 25px,\n    linear-gradient(180deg, #0f2027, #203a43, #2c5364);\n  background-repeat: repeat;\n  animation: roy-misc-snow 3s linear infinite;\n}"
},
  {
  "name": "Misc Sparkles",
  "className": "rc-misc-sparkles",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-sparkles {\n  background:\n    radial-gradient(circle at 15% 25%, #fff 0 1px, transparent 2px) 0 0 / 50px 50px,\n    radial-gradient(circle at 65% 75%, #fff 0 1.5px, transparent 2.5px) 0 0 / 70px 70px,\n    radial-gradient(circle at 85% 15%, #fff 0 1px, transparent 2px) 0 0 / 40px 40px,\n    radial-gradient(circle at 35% 85%, #fff 0 2px, transparent 3px) 0 0 / 60px 60px,\n    linear-gradient(135deg, #0a0a23, #1a1a4e);\n  background-repeat: repeat;\n  animation: roy-misc-sparkles 1.8s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Misc Typewriter",
  "className": "rc-misc-typewriter",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-typewriter {\n  display: inline-block;\n  font-family: 'Courier New', monospace;\n  font-weight: bold;\n  color: #10b981;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 3px solid #10b981;\n  width: 0;\n  animation:\n    roy-misc-typewriter-type 2.5s steps(6) infinite,\n    roy-misc-typewriter-cursor 0.6s step-end infinite;\n}"
},
  {
  "name": "Misc Vhs Effect",
  "className": "rc-misc-vhs-effect",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-vhs-effect {\n  position: relative;\n  background:\n    repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 4px),\n    linear-gradient(135deg, #2a0845, #6441a5);\n  overflow: hidden;\n}"
},
  {
  "name": "Misc Wave",
  "className": "rc-misc-wave",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-misc-wave {\n  background:\n    linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.6) 50%, transparent 100%) 0 30% / 40px 4px repeat-x,\n    linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.5) 50%, transparent 100%) 0 50% / 30px 3px repeat-x,\n    linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.5) 50%, transparent 100%) 0 70% / 50px 4px repeat-x,\n    linear-gradient(180deg, #04293a, #063b52);\n  animation: roy-misc-wave 1.5s linear infinite;\n}"
},
  {
  "name": "Molten Lava",
  "className": "rc-molten-lava",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-molten-lava {\n  position: relative;\n  width: 220px;\n  height: 160px;\n  border-radius: 14px;\n  overflow: hidden;\n  background: #1a0805;\n  box-shadow: 0 0 30px rgba(255,80,0,0.45), inset 0 0 40px rgba(0,0,0,0.5);\n}"
},
  {
  "name": "Morph Blob",
  "className": "rc-morph-blob",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-morph-blob {\n  position: relative;\n  width: 180px;\n  height: 180px;\n  background:\n    radial-gradient(circle at 30% 30%, #ff6ec4, #7873f5 70%);\n  box-shadow: 0 12px 40px rgba(120,80,255,0.5);\n  animation: roy-b11-morph-blob 8s ease-in-out infinite;\n}"
},
  {
  "name": "Natural Drop",
  "className": "rc-natural-drop",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-natural-drop {\n  animation: roy-natural-drop 1s cubic-bezier(0.45, 0, 0.55, 1) both;\n}"
},
  {
  "name": "Nav Accordion",
  "className": "rc-nav-accordion",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-accordion {\n  position: relative;\n  width: 180px;\n  height: 34px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 8px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.8);\n  overflow: hidden;\n  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.3s ease;\n}"
},
  {
  "name": "Nav Breadcrumb",
  "className": "rc-nav-breadcrumb",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-breadcrumb {\n  position: relative;\n  width: 240px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font: 11px/1 system-ui, sans-serif;\n  letter-spacing: 0.05em;\n}"
},
  {
  "name": "Nav Dropdown",
  "className": "rc-nav-dropdown",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-dropdown {\n  position: relative;\n  width: 180px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 14px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 8px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.8);\n  overflow: hidden;\n  transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.3s ease;\n}"
},
  {
  "name": "Nav Menu Fade",
  "className": "rc-nav-menu-fade",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-menu-fade {\n  position: relative;\n  width: 220px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n  overflow: hidden;\n  letter-spacing: 0.15em;\n}"
},
  {
  "name": "Nav Menu Scale",
  "className": "rc-nav-menu-scale",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-menu-scale {\n  position: relative;\n  width: 220px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n  letter-spacing: 0.15em;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}"
},
  {
  "name": "Nav Menu Slide",
  "className": "rc-nav-menu-slide",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-menu-slide {\n  position: relative;\n  width: 220px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n  overflow: hidden;\n  letter-spacing: 0.15em;\n}"
},
  {
  "name": "Nav Pagination",
  "className": "rc-nav-pagination",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-pagination {\n  position: relative;\n  width: 200px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.6);\n  letter-spacing: 0.3em;\n}"
},
  {
  "name": "Nav Progress Indicator",
  "className": "rc-nav-progress-indicator",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-progress-indicator {\n  position: relative;\n  width: 120px;\n  height: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}"
},
  {
  "name": "Nav Stepper",
  "className": "rc-nav-stepper",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-stepper {\n  position: relative;\n  width: 220px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
},
  {
  "name": "Nav Tabs Underline",
  "className": "rc-nav-tabs-underline",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-nav-tabs-underline {\n  position: relative;\n  width: 200px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.6);\n  letter-spacing: 0.12em;\n}"
},
  {
  "name": "Neon Sign",
  "className": "rc-neon-sign",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-neon-sign {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 12px;\n  background: radial-gradient(ellipse at 50% 50%, #1a0833 0%, #050010 100%);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n}"
},
  {
  "name": "Oil Slick",
  "className": "rc-oil-slick",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-oil-slick {\n  position: relative;\n  width: 220px;\n  height: 160px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: radial-gradient(ellipse at 50% 60%, #0a0d12 0%, #02040a 100%);\n}"
},
  {
  "name": "Origami Fold",
  "className": "rc-origami-fold",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-origami-fold {\n  position: relative;\n  width: 200px;\n  height: 180px;\n  background: #fafafa;\n  clip-path: polygon(\n    50% 0%, 100% 35%, 75% 100%, 25% 100%, 0% 35%);\n}"
},
  {
  "name": "Page Circle Reveal",
  "className": "rc-page-circle-reveal",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-circle-reveal {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Cube",
  "className": "rc-page-cube",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-cube {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n  perspective: 700px;\n}"
},
  {
  "name": "Page Curtain",
  "className": "rc-page-curtain",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-curtain {\n  position: relative;\n  background: linear-gradient(135deg, #7c3aed, #db2777);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Dissolve",
  "className": "rc-page-dissolve",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-dissolve {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Fade",
  "className": "rc-page-fade",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-fade {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Flip",
  "className": "rc-page-flip",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-flip {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n  perspective: 800px;\n}"
},
  {
  "name": "Page Liquid",
  "className": "rc-page-liquid",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-liquid {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Mask Reveal",
  "className": "rc-page-mask-reveal",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-mask-reveal {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Shutter",
  "className": "rc-page-shutter",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-shutter {\n  position: relative;\n  background: linear-gradient(135deg, #f59e0b, #ef4444);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Slide Left",
  "className": "rc-page-slide-left",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-slide-left {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Slide Up",
  "className": "rc-page-slide-up",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-slide-up {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Page Zoom",
  "className": "rc-page-zoom",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-page-zoom {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
},
  {
  "name": "Paper Flip",
  "className": "rc-paper-flip",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-paper-flip {\n  position: relative;\n  width: 180px;\n  height: 220px;\n  perspective: 1200px;\n  background: transparent;\n}"
},
  {
  "name": "Particles Bubbles",
  "className": "rc-particles-bubbles",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-bubbles {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #0e7490 0%, #06b6d4 50%, #0891b2 100%);\n}"
},
  {
  "name": "Particles Confetti Burst",
  "className": "rc-particles-confetti-burst",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-confetti-burst {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: radial-gradient(circle at center, #1a1a3e 0%, #0f0f1e 100%);\n}"
},
  {
  "name": "Particles Dust",
  "className": "rc-particles-dust",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-dust {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(135deg, #4a3520 0%, #6b4e2e 40%, #8b6b3a 70%, #5a3f25 100%);\n}"
},
  {
  "name": "Particles Fire",
  "className": "rc-particles-fire",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-fire {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #2d0a00 0%, #4a1500 40%, #1a0500 100%);\n}"
},
  {
  "name": "Particles Fireflies",
  "className": "rc-particles-fireflies",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-fireflies {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #0a1f0a 0%, #14281a 50%, #0a1f12 100%);\n}"
},
  {
  "name": "Particles Floating Dots",
  "className": "rc-particles-floating-dots",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-floating-dots {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);\n}"
},
  {
  "name": "Particles Orbiting",
  "className": "rc-particles-orbiting",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-orbiting {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: radial-gradient(circle at center, #1e1b4b 0%, #0f0a2e 60%, #050314 100%);\n}"
},
  {
  "name": "Particles Rain",
  "className": "rc-particles-rain",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-rain {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1a2533 0%, #243447 50%, #161e2a 100%);\n}"
},
  {
  "name": "Particles Smoke",
  "className": "rc-particles-smoke",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-smoke {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #0f0f0f 100%);\n}"
},
  {
  "name": "Particles Snow Fall",
  "className": "rc-particles-snow-fall",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-snow-fall {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1e2a4a 0%, #2c3e6b 50%, #1a2540 100%);\n}"
},
  {
  "name": "Particles Sparks",
  "className": "rc-particles-sparks",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-sparks {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1a0a00 0%, #2d1100 50%, #1a0a00 100%);\n}"
},
  {
  "name": "Particles Stars Twinkle",
  "className": "rc-particles-stars-twinkle",
  "category": "backgrounds",
  "displayType": "bg",
  "css": ".rc-particles-stars-twinkle {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: radial-gradient(ellipse at top, #1a1a4e 0%, #0a0a23 60%, #050511 100%);\n}"
},
  {
  "name": "Pendulum",
  "className": "rc-pendulum",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-pendulum {\n  animation: roy-pendulum 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n  transform-origin: top center;\n}"
},
  {
  "name": "Pendulum Swing Spring",
  "className": "rc-pendulum-swing-spring",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-pendulum-swing-spring {\n  transform-origin: top center;\n  animation: roy-pendulum-spring 1.6s cubic-bezier(0.4, 0, 0.6, 1) both;\n}"
},
  {
  "name": "Perspective Tilt",
  "className": "rc-perspective-tilt",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-perspective-tilt {\n  transform-style: preserve-3d;\n  transform: perspective(800px) rotateX(5deg) rotateY(-5deg);\n  transition: transform 0.4s ease;\n  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.2);\n}"
},
  {
  "name": "Pixel Art",
  "className": "rc-pixel-art",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-pixel-art {\n  width: 100%;\n  min-height: 240px;\n  background:\n    conic-gradient(from 0deg at 50% 50%,\n      #ff004d 0deg 45deg,\n      #ffa300 45deg 90deg,\n      #ffec27 90deg 135deg,\n      #00e436 135deg 180deg,\n      #29adff 180deg 225deg,\n      #83769c 225deg 270deg,\n      #ff77a8 270deg 315deg,\n      #ff004d 315deg 360deg);\n  background-size: 32px 32px;\n  image-rendering: pixelated;\n  position: relative;\n  border-radius: 0;\n  filter: contrast(1.1) saturate(1.3);\n}"
},
  {
  "name": "Pop In",
  "className": "rc-pop-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-pop-in {\n  animation: roy-pop-in 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) both;\n}"
},
  {
  "name": "Pop Out",
  "className": "rc-pop-out",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-pop-out {\n  animation: roy-pop-out 0.5s cubic-bezier(0.32, -0.28, 0.82, 0.11) both;\n}"
},
  {
  "name": "Prism Rainbow",
  "className": "rc-prism-rainbow",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-prism-rainbow {\n  position: relative;\n  width: 220px;\n  height: 160px;\n  background: #0a0a14;\n  overflow: hidden;\n  border-radius: 8px;\n}"
},
  {
  "name": "Pulse Soft",
  "className": "rc-pulse-soft",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-pulse-soft {\n  animation: roy-pulse-soft 2.5s ease-in-out infinite;\n}"
},
  {
  "name": "Rotate 3d",
  "className": "rc-rotate-3d",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-rotate-3d {\n  transform-style: preserve-3d;\n  background: linear-gradient(135deg, #10b981, #8b5cf6);\n  border-radius: 12px;\n  animation: roy-rotate-3d 4s linear infinite;\n}"
},
  {
  "name": "Rotate Spin",
  "className": "rc-rotate-spin",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-rotate-spin {\n  animation: roy-rotate-spin 2s linear infinite;\n}"
},
  {
  "name": "Rotate X",
  "className": "rc-rotate-x",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-rotate-x {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 8px;\n  transform-style: preserve-3d;\n  animation: roy-rotate-x 3s linear infinite;\n}"
},
  {
  "name": "Rotate Y",
  "className": "rc-rotate-y",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-rotate-y {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6);\n  border-radius: 8px;\n  transform-style: preserve-3d;\n  animation: roy-rotate-y 3s linear infinite;\n}"
},
  {
  "name": "Roulette Spin",
  "className": "rc-roulette-spin",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-roulette-spin {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background:\n    repeating-conic-gradient(from 0deg,\n      #c8102e 0deg 15deg,\n      #1a1a1a 15deg 30deg,\n      #c8102e 30deg 45deg,\n      #1a1a1a 45deg 60deg,\n      #c8102e 60deg 75deg,\n      #1a1a1a 75deg 90deg,\n      #c8102e 90deg 105deg,\n      #1a1a1a 105deg 120deg,\n      #c8102e 120deg 135deg,\n      #1a1a1a 135deg 150deg,\n      #c8102e 150deg 165deg,\n      #1a1a1a 165deg 180deg,\n      #c8102e 180deg 195deg,\n      #1a1a1a 195deg 210deg,\n      #c8102e 210deg 225deg,\n      #1a1a1a 225deg 240deg,\n      #c8102e 240deg 255deg,\n      #1a1a1a 255deg 270deg,\n      #c8102e 270deg 285deg,\n      #1a1a1a 285deg 300deg,\n      #c8102e 300deg 315deg,\n      #1a1a1a 315deg 330deg,\n      #c8102e 330deg 345deg,\n      #1a1a1a 345deg 360deg);\n  border: 8px solid #8b6914;\n  box-shadow: 0 0 0 4px #f4d03f, 0 12px 30px rgba(0,0,0,0.5);\n  animation: roy-b11-roulette-spin 4s cubic-bezier(0.2, 0.6, 0.3, 1) infinite;\n}"
},
  {
  "name": "Rubber Snap Back",
  "className": "rc-rubber-snap-back",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-rubber-snap-back {\n  animation: roy-rubber-snap 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}"
},
  {
  "name": "Scale 3d",
  "className": "rc-scale-3d",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-scale-3d {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #065f46);\n  border-radius: 8px;\n  transform-style: preserve-3d;\n  transition: transform 0.5s ease;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}"
},
  {
  "name": "Scale Compress",
  "className": "rc-scale-compress",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-scale-compress {\n  animation: roy-scale-compress 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  transform-origin: center;\n}"
},
  {
  "name": "Scale Expand",
  "className": "rc-scale-expand",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-scale-expand {\n  animation: roy-scale-expand 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: center;\n}"
},
  {
  "name": "Scale Grow",
  "className": "rc-scale-grow",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-scale-grow {\n  animation: roy-scale-grow 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}"
},
  {
  "name": "Scale Shrink",
  "className": "rc-scale-shrink",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-scale-shrink {\n  animation: roy-scale-shrink 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}"
},
  {
  "name": "Scroll Driven Blur",
  "className": "rc-scroll-driven-blur",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-blur {\n  animation: roy-scroll-blur linear both;\n  animation-timeline: view();\n  animation-range: entry 0% cover 50%;\n}"
},
  {
  "name": "Scroll Driven Color",
  "className": "rc-scroll-driven-color",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-color {\n  animation: roy-scroll-color linear both;\n  animation-timeline: view();\n  animation-range: entry 0% exit 100%;\n}"
},
  {
  "name": "Scroll Driven Fade",
  "className": "rc-scroll-driven-fade",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-fade {\n  animation: roy-scroll-fade linear both;\n  animation-timeline: view();\n  animation-range: entry 0% cover 40%;\n}"
},
  {
  "name": "Scroll Driven Progress Ring",
  "className": "rc-scroll-driven-progress-ring",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-progress-ring {\n  position: relative;\n  border-radius: 50%;\n  background:\n    conic-gradient(#5e6ad2 0deg, #5e6ad2 0deg, #27272a 0deg, #27272a 360deg);\n  animation: roy-scroll-ring linear both;\n  animation-timeline: scroll(root);\n  animation-range: 0 100%;\n}"
},
  {
  "name": "Scroll Driven Rotate",
  "className": "rc-scroll-driven-rotate",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-rotate {\n  animation: roy-scroll-rotate linear both;\n  animation-timeline: view();\n  animation-range: entry 0% exit 100%;\n}"
},
  {
  "name": "Scroll Driven Scale",
  "className": "rc-scroll-driven-scale",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-scale {\n  animation: roy-scroll-scale linear both;\n  animation-timeline: view();\n  animation-range: entry 0% cover 50%;\n}"
},
  {
  "name": "Scroll Driven Sticky",
  "className": "rc-scroll-driven-sticky",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-sticky {\n  position: sticky;\n  top: 0;\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 8px;\n  animation: roy-scroll-sticky linear both;\n  animation-timeline: scroll(root);\n  animation-range: 0 100px;\n}"
},
  {
  "name": "Scroll Driven Translate",
  "className": "rc-scroll-driven-translate",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-driven-translate {\n  animation: roy-scroll-translate linear both;\n  animation-timeline: view();\n  animation-range: entry 0% cover 60%;\n}"
},
  {
  "name": "Scroll Fade Out",
  "className": "rc-scroll-fade-out",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-fade-out {\n  animation: roy-scroll-fade-out 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}"
},
  {
  "name": "Scroll Horizontal",
  "className": "rc-scroll-horizontal",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-horizontal {\n  position: relative;\n  width: 100%;\n  height: 6px;\n  background: rgba(148, 163, 184, 0.25);\n  border-radius: 999px;\n  overflow: hidden;\n}"
},
  {
  "name": "Scroll Indicator",
  "className": "rc-scroll-indicator",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-indicator {\n  position: relative;\n  width: 28px;\n  height: 46px;\n  border: 2px solid rgba(16, 185, 129, 0.65);\n  border-radius: 14px;\n  background: transparent;\n}"
},
  {
  "name": "Scroll Parallax Slow",
  "className": "rc-scroll-parallax-slow",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-parallax-slow {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n}"
},
  {
  "name": "Scroll Progress Bar",
  "className": "rc-scroll-progress-bar",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-progress-bar {\n  position: relative;\n  width: 100%;\n  height: 8px;\n  background: rgba(148, 163, 184, 0.25);\n  border-radius: 999px;\n  overflow: hidden;\n}"
},
  {
  "name": "Scroll Reveal Left",
  "className": "rc-scroll-reveal-left",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-reveal-left {\n  animation: roy-scroll-reveal-left 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}"
},
  {
  "name": "Scroll Reveal Right",
  "className": "rc-scroll-reveal-right",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-reveal-right {\n  animation: roy-scroll-reveal-right 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}"
},
  {
  "name": "Scroll Reveal Rotate",
  "className": "rc-scroll-reveal-rotate",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-reveal-rotate {\n  animation: roy-scroll-reveal-rotate 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}"
},
  {
  "name": "Scroll Reveal Scale",
  "className": "rc-scroll-reveal-scale",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-reveal-scale {\n  animation: roy-scroll-reveal-scale 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}"
},
  {
  "name": "Scroll Reveal Up",
  "className": "rc-scroll-reveal-up",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-reveal-up {\n  opacity: 0;\n  transform: translateY(40px);\n  transition: opacity 0.6s ease, transform 0.6s ease;\n  will-change: opacity, transform;\n}"
},
  {
  "name": "Scroll Sticky Header",
  "className": "rc-scroll-sticky-header",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-sticky-header {\n  display: flex;\n  align-items: center;\n  height: 64px;\n  padding: 0 22px;\n  background: linear-gradient(90deg, #0f172a, #1e293b);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  border-radius: 10px;\n  color: #e2e8f0;\n  font-size: 18px;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.4);\n  animation: roy-scroll-sticky-shrink 3.2s ease-in-out infinite;\n}"
},
  {
  "name": "Scroll Timeline Spin",
  "className": "rc-scroll-timeline-spin",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-scroll-timeline-spin {\n  width: 140px;\n  height: 140px;\n  border-radius: 24px;\n  background:\n    conic-gradient(from 0deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #ec4899);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 12px/1.2 system-ui, sans-serif;\n  letter-spacing: 0.15em;\n  text-align: center;\n  animation: roy-b10-sts-spin 1s linear;\n  animation-timeline: scroll(root block);\n  /* When scroll-timeline unsupported, fall back to infinite auto-spin */\n}"
},
  {
  "name": "Skew 3d",
  "className": "rc-skew-3d",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-skew-3d {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #06b6d4, #8b5cf6);\n  border-radius: 8px;\n  transform: perspective(800px) skew(-15deg, 5deg);\n  transition: transform 0.5s ease;\n  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3);\n}"
},
  {
  "name": "Slide Diagonal",
  "className": "rc-slide-diagonal",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-slide-diagonal {\n  animation: roy-slide-diagonal 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate;\n}"
},
  {
  "name": "Slide In Bottom",
  "className": "rc-slide-in-bottom",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-slide-in-bottom {\n  animation: roy-slide-in-bottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n}"
},
  {
  "name": "Slide In Top",
  "className": "rc-slide-in-top",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-slide-in-top {\n  animation: roy-slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n}"
},
  {
  "name": "Slide Out Bottom",
  "className": "rc-slide-out-bottom",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-slide-out-bottom {\n  animation: roy-slide-out-bottom 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}"
},
  {
  "name": "Slide Out Top",
  "className": "rc-slide-out-top",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-slide-out-top {\n  animation: roy-slide-out-top 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}"
},
  {
  "name": "Slide Rotate In",
  "className": "rc-slide-rotate-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-slide-rotate-in {\n  animation: roy-slide-rotate-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}"
},
  {
  "name": "Slot Machine",
  "className": "rc-slot-machine",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-slot-machine {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  background: linear-gradient(180deg, #b8860b 0%, #8b6914 50%, #5a3d0a 100%);\n  border-radius: 12px;\n  padding: 12px 16px;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,220,100,0.4);\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  justify-content: center;\n}"
},
  {
  "name": "Snap In",
  "className": "rc-snap-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-snap-in {\n  animation: roy-snap-in 0.55s cubic-bezier(0.16, 1.32, 0.5, 1) both;\n  transform-origin: center;\n}"
},
  {
  "name": "Soap Bubble",
  "className": "rc-soap-bubble",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-soap-bubble {\n  position: relative;\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.05) 18%, transparent 32%),\n    radial-gradient(circle at 70% 65%, rgba(255,0,200,0.35), transparent 40%),\n    radial-gradient(circle at 30% 75%, rgba(0,255,200,0.35), transparent 40%),\n    radial-gradient(circle at 75% 25%, rgba(255,220,0,0.3), transparent 40%),\n    conic-gradient(from 30deg,\n      rgba(255,80,180,0.35),\n      rgba(80,200,255,0.35),\n      rgba(180,255,120,0.35),\n      rgba(255,200,80,0.35),\n      rgba(180,80,255,0.35),\n      rgba(255,80,180,0.35));\n  box-shadow:\n    inset 0 0 40px rgba(255,255,255,0.25),\n    inset -20px -25px 50px rgba(80,0,120,0.25),\n    inset 15px 20px 40px rgba(0,180,255,0.25),\n    0 8px 30px rgba(0,0,0,0.2);\n  border: 1px solid rgba(255,255,255,0.4);\n  filter: saturate(1.2);\n  animation: roy-b11-soap-bubble-float 6s ease-in-out infinite;\n}"
},
  {
  "name": "Spiral Galaxy",
  "className": "rc-spiral-galaxy",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-spiral-galaxy {\n  position: relative;\n  width: 220px;\n  height: 220px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: radial-gradient(circle at 50% 50%, #1a0033 0%, #050010 70%, #000 100%);\n  box-shadow: 0 0 40px rgba(120,80,255,0.4);\n}"
},
  {
  "name": "Spring In",
  "className": "rc-spring-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-spring-in {\n  animation: roy-spring-in 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n  transform-origin: center bottom;\n}"
},
  {
  "name": "Stained Glass",
  "className": "rc-stained-glass",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-stained-glass {\n  position: relative;\n  width: 200px;\n  height: 180px;\n  border-radius: 8px;\n  overflow: hidden;\n  background:\n    linear-gradient(115deg, #1a1a1a 0 8%, transparent 8% 9%, #1a1a1a 9% 17%, transparent 17% 18%, #1a1a1a 18% 26%, transparent 26% 27%, #1a1a1a 27% 35%, transparent 35% 36%, #1a1a1a 36% 44%, transparent 44% 45%, #1a1a1a 45% 53%, transparent 53% 54%, #1a1a1a 54% 62%, transparent 62% 63%, #1a1a1a 63% 71%, transparent 71% 72%, #1a1a1a 72% 80%, transparent 80% 81%, #1a1a1a 81% 89%, transparent 89% 90%, #1a1a1a 90% 100%),\n    linear-gradient(25deg, #1a1a1a 0 9%, transparent 9% 10%, #1a1a1a 10% 19%, transparent 19% 20%, #1a1a1a 20% 29%, transparent 29% 30%, #1a1a1a 30% 39%, transparent 39% 40%, #1a1a1a 40% 49%, transparent 49% 50%, #1a1a1a 50% 59%, transparent 59% 60%, #1a1a1a 60% 69%, transparent 69% 70%, #1a1a1a 70% 79%, transparent 79% 80%, #1a1a1a 80% 89%, transparent 89% 90%, #1a1a1a 90% 100%),\n    radial-gradient(circle at 20% 25%, #c8102e 0 22%, transparent 22%),\n    radial-gradient(circle at 75% 20%, #ffd700 0 18%, transparent 18%),\n    radial-gradient(circle at 30% 70%, #1e90ff 0 24%, transparent 24%),\n    radial-gradient(circle at 80% 75%, #9400d3 0 20%, transparent 20%),\n    radial-gradient(circle at 55% 45%, #ff8c00 0 18%, transparent 18%),\n    radial-gradient(circle at 50% 90%, #2ecc71 0 16%, transparent 16%),\n    linear-gradient(45deg, #4a0e6b, #8b1a3a, #1a4a8b, #6b8b1a);\n  background-blend-mode: normal, normal, screen, screen, screen, screen, screen, screen, normal;\n  filter: saturate(1.3) brightness(1.05);\n  box-shadow: 0 0 25px rgba(255,200,100,0.3), inset 0 0 0 2px #1a1a1a;\n}"
},
  {
  "name": "Stretch",
  "className": "rc-stretch",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-stretch {\n  animation: roy-stretch 1.6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;\n  transform-origin: center;\n}"
},
  {
  "name": "Sway",
  "className": "rc-sway",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-sway {\n  animation: roy-sway 4s ease-in-out infinite;\n  transform-origin: top center;\n}"
},
  {
  "name": "Swing In",
  "className": "rc-swing-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-swing-in {\n  animation: roy-swing-in 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n  transform-origin: top center;\n}"
},
  {
  "name": "Text 3d Cinema",
  "className": "rc-text-3d-cinema",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-3d-cinema {\n  display: inline-block;\n  position: relative;\n  font: 900 72px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.06em;\n  color: #fff7d0;\n  padding: 30px 40px;\n  background: linear-gradient(180deg, #1a0f00 0%, #000 100%);\n  border-radius: 10px;\n  text-shadow:\n    1px 1px 0 #8b6914,\n    2px 2px 0 #8b6914,\n    3px 3px 0 #75590f,\n    4px 4px 0 #75590f,\n    5px 5px 0 #5e470c,\n    6px 6px 0 #5e470c,\n    7px 7px 0 #473608,\n    8px 8px 0 #473608,\n    9px 9px 0 #2f2406,\n    10px 10px 0 #2f2406,\n    11px 11px 8px rgba(0,0,0,0.6),\n    14px 14px 20px rgba(0,0,0,0.8);\n  background-clip: border-box;\n  filter: drop-shadow(0 0 12px rgba(255,200,80,0.4));\n  animation: roy-b11-text-3d-cinema-light 4s ease-in-out infinite;\n}"
},
  {
  "name": "Text 3d Shadow",
  "className": "rc-text-3d-shadow",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-3d-shadow {\n  color: #f0fdf4;\n  text-shadow:\n    1px 1px 0 #065f46,\n    2px 2px 0 #047857,\n    3px 3px 0 #059669,\n    4px 4px 0 #10b981,\n    5px 5px 0 rgba(16, 185, 129, 0.4),\n    6px 6px 10px rgba(0, 0, 0, 0.3);\n  font-weight: 700;\n}"
},
  {
  "name": "Text Blur Reveal",
  "className": "rc-text-blur-reveal",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-blur-reveal {\n  color: #10b981;\n  font-weight: 700;\n  animation: roy-blur-reveal 4s ease-in-out infinite;\n}"
},
  {
  "name": "Text Bounce Letters",
  "className": "rc-text-bounce-letters",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-bounce-letters {\n  display: inline-flex;\n  font-weight: 700;\n  color: #06b6d4;\n}"
},
  {
  "name": "Text Chrome",
  "className": "rc-text-chrome",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-chrome {\n  background: linear-gradient(\n    180deg,\n    #fef3c7 0%,\n    #f8fafc 25%,\n    #94a3b8 50%,\n    #f8fafc 75%,\n    #cbd5e1 100%\n  );\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 800;\n  letter-spacing: 1px;\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));\n}"
},
  {
  "name": "Text Emboss",
  "className": "rc-text-emboss",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-emboss {\n  display: inline-block;\n  font: 900 64px/1 'Georgia', serif;\n  letter-spacing: 0.05em;\n  color: #6e5a44;\n  padding: 24px 36px;\n  background:\n    radial-gradient(ellipse 60% 40% at 30% 30%, rgba(255,240,210,0.3), transparent 60%),\n    linear-gradient(135deg, #b8a586 0%, #8a7a5e 50%, #a8946c 100%);\n  border-radius: 8px;\n  box-shadow:\n    inset 4px 4px 8px rgba(255,250,230,0.4),\n    inset -4px -4px 8px rgba(40,30,15,0.4),\n    0 6px 20px rgba(40,30,15,0.4);\n  text-shadow:\n    1px 1px 1px rgba(255,245,220,0.7),\n    -1px -1px 1px rgba(30,20,10,0.8),\n    0 4px 6px rgba(30,20,10,0.4);\n  background-clip: border-box;\n}"
},
  {
  "name": "Text Fire",
  "className": "rc-text-fire",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-fire {\n  font-weight: 800;\n  color: #fde047;\n  text-shadow:\n    0 -2px 4px #fef08a,\n    0 -3px 6px #fde047,\n    0 -6px 10px #facc15,\n    0 -10px 16px #f59e0b,\n    0 -16px 24px #ea580c,\n    0 -22px 32px #dc2626;\n  animation: roy-fire-flicker 0.4s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Text Fire Flame",
  "className": "rc-text-fire-flame",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-fire-flame {\n  display: inline-block;\n  position: relative;\n  font: 900 80px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.05em;\n  color: #fff;\n  padding: 30px 36px;\n  background: #0a0500;\n  border-radius: 8px;\n  text-shadow:\n    0 -2px 4px #fff,\n    0 -4px 8px #ffe055,\n    0 -8px 14px #ff8c00,\n    0 -14px 22px #ff3000,\n    0 -22px 32px #c81000,\n    0 2px 4px rgba(200,16,0,0.8);\n  animation: roy-b11-text-fire-flame 0.6s ease-in-out infinite alternate;\n  filter: drop-shadow(0 0 12px rgba(255,80,0,0.7));\n}"
},
  {
  "name": "Text Flip",
  "className": "rc-text-flip",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-flip {\n  display: inline-block;\n  font-weight: 700;\n  color: #8b5cf6;\n  transform-style: preserve-3d;\n  perspective: 400px;\n  animation: roy-text-flip 3s ease-in-out infinite;\n}"
},
  {
  "name": "Text Gradient Shift",
  "className": "rc-text-gradient-shift",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-gradient-shift {\n  background: linear-gradient(45deg, #10b981, #06b6d4, #8b5cf6, #ec4899, #10b981);\n  background-size: 300% 300%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  animation: roy-text-grad-shift 6s ease infinite;\n}"
},
  {
  "name": "Text Highlight Marker",
  "className": "rc-text-highlight-marker",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-highlight-marker {\n  font-weight: 700;\n  color: #0f172a;\n  background: linear-gradient(180deg, transparent 50%, #fde047 50%);\n  padding: 0 4px;\n}"
},
  {
  "name": "Text Holographic",
  "className": "rc-text-holographic",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-holographic {\n  background: conic-gradient(\n    from 0deg,\n    #ff6ec7, #ffd93d, #6bcf7f, #4ecdc4, #a78bfa, #ff6ec7\n  );\n  background-size: 200% 200%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  filter: drop-shadow(0 0 6px rgba(255, 110, 199, 0.5));\n  animation: roy-holo-shift 5s linear infinite;\n}"
},
  {
  "name": "Text Mirror",
  "className": "rc-text-mirror",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-mirror {\n  display: inline-flex;\n  font-weight: 700;\n  color: #8b5cf6;\n}"
},
  {
  "name": "Text Neon Glow",
  "className": "rc-text-neon-glow",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-neon-glow {\n  color: #10b981;\n  text-shadow:\n    0 0 7px rgba(16, 185, 129, 0.8),\n    0 0 10px rgba(16, 185, 129, 0.6),\n    0 0 21px rgba(16, 185, 129, 0.4),\n    0 0 42px rgba(16, 185, 129, 0.2),\n    0 0 82px rgba(16, 185, 129, 0.1);\n}"
},
  {
  "name": "Text Neon Sign",
  "className": "rc-text-neon-sign",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-neon-sign {\n  display: inline-block;\n  font: 900 72px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.08em;\n  color: #fff;\n  text-shadow:\n    0 0 4px #fff,\n    0 0 10px #ff00de,\n    0 0 22px #ff00de,\n    0 0 40px #ff00de,\n    0 0 70px #ff00de,\n    0 0 100px #ff00de;\n  padding: 20px 30px;\n  background: radial-gradient(ellipse at 50% 50%, #1a0833 0%, #050010 100%);\n  border-radius: 12px;\n  animation: roy-b11-text-neon-flicker 4s linear infinite;\n}"
},
  {
  "name": "Text Outline Offset",
  "className": "rc-text-outline-offset",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-outline-offset {\n  font-weight: 700;\n  color: #10b981;\n  -webkit-text-stroke: 2px rgba(16, 185, 129, 0.5);\n  text-shadow:\n    4px 4px 0 rgba(6, 182, 212, 0.5),\n    8px 8px 0 rgba(139, 92, 246, 0.4);\n}"
},
  {
  "name": "Text Reflection",
  "className": "rc-text-reflection",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-reflection {\n  position: relative;\n  display: inline-block;\n  font-weight: 700;\n  color: #06b6d4;\n}"
},
  {
  "name": "Text Shadow Long",
  "className": "rc-text-shadow-long",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-shadow-long {\n  color: #f0fdf4;\n  font-weight: 700;\n  text-shadow:\n    1px 1px 0 #10b981,\n    2px 2px 0 #0d9668,\n    3px 3px 0 #059669,\n    4px 4px 0 #047857,\n    5px 5px 0 #065f46,\n    6px 6px 0 #064e3b,\n    7px 7px 0 #053b30,\n    8px 8px 0 #042f24,\n    9px 9px 0 #03241c,\n    10px 10px 12px rgba(0, 0, 0, 0.4);\n}"
},
  {
  "name": "Text Shadow Soft",
  "className": "rc-text-shadow-soft",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-shadow-soft {\n  color: #f8fafc;\n  font-weight: 600;\n  text-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.18),\n    0 4px 12px rgba(16, 185, 129, 0.25),\n    0 8px 24px rgba(16, 185, 129, 0.15);\n}"
},
  {
  "name": "Text Shimmer",
  "className": "rc-text-shimmer",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-shimmer {\n  background: linear-gradient(\n    110deg,\n    #475569 0%,\n    #475569 35%,\n    #f1f5f9 50%,\n    #475569 65%,\n    #475569 100%\n  );\n  background-size: 200% 100%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  animation: roy-shimmer-sweep 3s linear infinite;\n}"
},
  {
  "name": "Text Skew",
  "className": "rc-text-skew",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-skew {\n  display: inline-block;\n  font-weight: 800;\n  font-style: italic;\n  color: #f8fafc;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  padding: 4px 14px;\n  transform: skew(-10deg);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);\n}"
},
  {
  "name": "Text Stretch",
  "className": "rc-text-stretch",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-stretch {\n  font-weight: 700;\n  color: #f59e0b;\n  animation: roy-text-stretch 3s ease-in-out infinite;\n}"
},
  {
  "name": "Text Typing Cursor",
  "className": "rc-text-typing-cursor",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-typing-cursor {\n  border-right: 3px solid #10b981;\n  animation: roy-text-blink-cursor 1s step-end infinite;\n  padding-right: 4px;\n}"
},
  {
  "name": "Text Underline Draw",
  "className": "rc-text-underline-draw",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-underline-draw {\n  position: relative;\n  display: inline-block;\n  font-weight: 700;\n  color: #10b981;\n}"
},
  {
  "name": "Text Water",
  "className": "rc-text-water",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-water {\n  display: inline-block;\n  position: relative;\n  font: 900 72px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.08em;\n  color: transparent;\n  background:\n    linear-gradient(180deg,\n      rgba(255,255,255,0.9) 0%,\n      rgba(180,230,255,0.7) 30%,\n      rgba(80,180,230,0.6) 55%,\n      rgba(30,100,180,0.8) 80%,\n      rgba(10,40,90,0.9) 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  padding: 18px 30px;\n  text-shadow:\n    0 1px 0 rgba(255,255,255,0.5),\n    0 -1px 0 rgba(0,30,60,0.6);\n  filter: drop-shadow(0 4px 6px rgba(0,80,140,0.5));\n  animation: roy-b11-text-water-ripple 3s ease-in-out infinite;\n}"
},
  {
  "name": "Topographic",
  "className": "rc-topographic",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-topographic {\n  width: 100%;\n  min-height: 240px;\n  background:\n    repeating-radial-gradient(circle at 30% 40%,\n      transparent 0,\n      transparent 14px,\n      rgba(120,80,30,0.5) 14px,\n      rgba(120,80,30,0.5) 15px),\n    repeating-radial-gradient(circle at 70% 60%,\n      transparent 0,\n      transparent 18px,\n      rgba(100,60,20,0.45) 18px,\n      rgba(100,60,20,0.45) 19px),\n    repeating-radial-gradient(circle at 50% 80%,\n      transparent 0,\n      transparent 12px,\n      rgba(80,40,10,0.4) 12px,\n      rgba(80,40,10,0.4) 13px),\n    radial-gradient(ellipse at 30% 40%, #f4e4c1 0%, #d4b888 50%, #8b6b3a 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
},
  {
  "name": "Transform Origin Spin",
  "className": "rc-transform-origin-spin",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-transform-origin-spin {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 8px;\n  transform-origin: 0% 0%;\n  animation: roy-origin-spin 2s linear infinite;\n}"
},
  {
  "name": "Velvet Fabric",
  "className": "rc-velvet-fabric",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-velvet-fabric {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 12px;\n  background:\n    radial-gradient(ellipse 70% 50% at 30% 30%, rgba(180,40,90,0.7), transparent 60%),\n    radial-gradient(ellipse 60% 50% at 75% 70%, rgba(60,0,30,0.85), transparent 65%),\n    linear-gradient(135deg, #7a0e3a 0%, #4a0520 50%, #6a0c30 100%);\n  box-shadow:\n    inset 0 0 30px rgba(0,0,0,0.6),\n    inset 8px 10px 18px rgba(255,120,170,0.25),\n    inset -8px -10px 18px rgba(0,0,0,0.5),\n    0 10px 25px rgba(40,0,15,0.5);\n}"
},
  {
  "name": "Vhs Glitch",
  "className": "rc-vhs-glitch",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-vhs-glitch {\n  width: 100%;\n  min-height: 240px;\n  background:\n    linear-gradient(180deg, #1a0033 0%, #4a0080 50%, #001a4a 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n  filter: contrast(1.2) saturate(1.3);\n}"
},
  {
  "name": "Vibrate",
  "className": "rc-vibrate",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-vibrate {\n  animation: roy-vibrate 0.32s linear infinite;\n}"
},
  {
  "name": "Vintage Tv",
  "className": "rc-vintage-tv",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-vintage-tv {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse 90% 70% at 50% 50%, #1a3a5c 0%, #0a1a2c 70%, #000 100%);\n  position: relative;\n  border-radius: 24px;\n  overflow: hidden;\n  box-shadow:\n    inset 0 0 60px rgba(0,0,0,0.8),\n    inset 0 0 120px rgba(80,140,200,0.3);\n}"
},
  {
  "name": "Visual Aurora Border",
  "className": "rc-visual-aurora-border",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-aurora-border {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0b1026;\n  border: none;\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Backdrop Blur Heavy",
  "className": "rc-visual-backdrop-blur-heavy",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-backdrop-blur-heavy {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    radial-gradient(circle at 20% 30%, #ec4899 0%, transparent 40%),\n    radial-gradient(circle at 80% 70%, #06b6d4 0%, transparent 40%),\n    radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 50%),\n    linear-gradient(135deg, #8b5cf6, #10b981);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Blend Mode Overlay",
  "className": "rc-visual-blend-mode-overlay",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-blend-mode-overlay {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Border Beam",
  "className": "rc-visual-border-beam",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-border-beam {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  border: none;\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Chrome",
  "className": "rc-visual-chrome",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-chrome {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(\n    180deg,\n    #fefefe 0%,\n    #c8c8d0 10%,\n    #888890 20%,\n    #d8d8e0 30%,\n    #f8f8fc 45%,\n    #a0a0a8 55%,\n    #686870 65%,\n    #d0d0d8 75%,\n    #f0f0f5 85%,\n    #b0b0b8 95%,\n    #808088 100%\n  );\n  overflow: hidden;\n  box-shadow:\n    inset 0 2px 4px rgba(255, 255, 255, 0.7),\n    inset 0 -2px 4px rgba(0, 0, 0, 0.35);\n}"
},
  {
  "name": "Visual Color Shift",
  "className": "rc-visual-color-shift",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-color-shift {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6);\n  animation: roy-visual-color-shift 6s linear infinite;\n}"
},
  {
  "name": "Visual Foil",
  "className": "rc-visual-foil",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-foil {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    repeating-linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.12) 0px,\n      rgba(255, 255, 255, 0.12) 2px,\n      transparent 2px,\n      transparent 5px\n    ),\n    repeating-linear-gradient(\n      -45deg,\n      rgba(0, 0, 0, 0.12) 0px,\n      rgba(0, 0, 0, 0.12) 2px,\n      transparent 2px,\n      transparent 5px\n    ),\n    linear-gradient(\n      135deg,\n      #f0f0f5 0%,\n      #c0c0d0 25%,\n      #f8f8ff 50%,\n      #b0b0c0 75%,\n      #e8e8f0 100%\n    );\n  background-size: 8px 8px, 8px 8px, 100% 100%;\n  overflow: hidden;\n  animation: roy-visual-foil-hue 6s ease-in-out infinite;\n  box-shadow:\n    inset 0 2px 6px rgba(255, 255, 255, 0.7),\n    inset 0 -2px 6px rgba(0, 0, 0, 0.25);\n}"
},
  {
  "name": "Visual Frost Blur",
  "className": "rc-visual-frost-blur",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-frost-blur {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    radial-gradient(circle at 30% 30%, #06b6d4 0%, transparent 50%),\n    radial-gradient(circle at 70% 70%, #ec4899 0%, transparent 50%),\n    linear-gradient(135deg, #8b5cf6, #f59e0b);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Glass Reflection",
  "className": "rc-visual-glass-reflection",
  "category": "advanced",
  "displayType": "card",
  "css": ".rc-visual-glass-reflection {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    radial-gradient(circle at 30% 30%, #ec4899 0%, transparent 50%),\n    radial-gradient(circle at 70% 70%, #06b6d4 0%, transparent 50%),\n    linear-gradient(135deg, #8b5cf6, #f59e0b);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Glitch Distort",
  "className": "rc-visual-glitch-distort",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-glitch-distort {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Gradient Mesh",
  "className": "rc-visual-gradient-mesh",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-gradient-mesh {\n  background:\n    radial-gradient(at 20% 20%, #ec4899 0px, transparent 50%),\n    radial-gradient(at 80% 0%,  #f59e0b 0px, transparent 50%),\n    radial-gradient(at 0% 50%,  #8b5cf6 0px, transparent 50%),\n    radial-gradient(at 80% 80%, #06b6d4 0px, transparent 50%),\n    radial-gradient(at 50% 100%, #22c55e 0px, transparent 50%),\n    #0f172a;\n  background-size: 200% 200%;\n  animation: roy-visual-gradient-mesh 10s ease-in-out infinite;\n}"
},
  {
  "name": "Visual Gradient Text Animated",
  "className": "rc-visual-gradient-text-animated",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-gradient-text-animated {\n  background: linear-gradient(\n    90deg,\n    #ef4444,\n    #f59e0b,\n    #eab308,\n    #22c55e,\n    #06b6d4,\n    #3b82f6,\n    #8b5cf6,\n    #ec4899,\n    #ef4444\n  );\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  animation: roy-visual-gradient-text-animated 4s linear infinite;\n}"
},
  {
  "name": "Visual Holographic",
  "className": "rc-visual-holographic",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-holographic {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(\n    115deg,\n    #ff0080 0%,\n    #ff8a00 14%,\n    #ffe600 28%,\n    #00ff96 42%,\n    #00d4ff 56%,\n    #6f00ff 70%,\n    #ff00d4 84%,\n    #ff0080 100%\n  );\n  background-size: 300% 300%;\n  overflow: hidden;\n  animation: roy-visual-holographic-shift 6s ease infinite;\n}"
},
  {
  "name": "Visual Hue Rotate Loop",
  "className": "rc-visual-hue-rotate-loop",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-hue-rotate-loop {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: conic-gradient(\n    from 0deg,\n    #ef4444,\n    #f59e0b,\n    #eab308,\n    #22c55e,\n    #06b6d4,\n    #3b82f6,\n    #8b5cf6,\n    #ec4899,\n    #ef4444\n  );\n  animation: roy-visual-hue-rotate-loop 4s linear infinite;\n}"
},
  {
  "name": "Visual Image Distortion",
  "className": "rc-visual-image-distortion",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-image-distortion {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4);\n  animation: roy-visual-image-distortion 2.4s ease-in-out infinite;\n}"
},
  {
  "name": "Visual Inner Glow",
  "className": "rc-visual-inner-glow",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-inner-glow {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  border: none;\n  animation: roy-visual-inner-glow 2.6s ease-in-out infinite;\n}"
},
  {
  "name": "Visual Iridescent",
  "className": "rc-visual-iridescent",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-iridescent {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: conic-gradient(\n    from 0deg at 50% 50%,\n    #ff0080,\n    #ff8a00,\n    #ffe600,\n    #00ff96,\n    #00d4ff,\n    #6f00ff,\n    #ff00d4,\n    #ff0080\n  );\n  animation: roy-visual-iridescent 8s linear infinite;\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Liquid Fill",
  "className": "rc-visual-liquid-fill",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-liquid-fill {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  border: none;\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Mask Fade",
  "className": "rc-visual-mask-fade",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-mask-fade {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);\n  -webkit-mask: linear-gradient(180deg, transparent 0%, #000 50%, transparent 100%) no-repeat;\n  mask: linear-gradient(180deg, transparent 0%, #000 50%, transparent 100%) no-repeat;\n  -webkit-mask-size: 100% 200%;\n  mask-size: 100% 200%;\n  animation: roy-visual-mask-fade 3s ease-in-out infinite alternate;\n}"
},
  {
  "name": "Visual Metallic",
  "className": "rc-visual-metallic",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-metallic {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    linear-gradient(\n      180deg,\n      #f5f5f5 0%,\n      #d0d0d8 14%,\n      #a0a0a8 28%,\n      #808088 42%,\n      #c0c0c8 58%,\n      #f0f0f5 74%,\n      #b0b0b8 88%,\n      #d0d0d8 100%\n    );\n  overflow: hidden;\n  box-shadow:\n    inset 0 2px 4px rgba(255, 255, 255, 0.7),\n    inset 0 -2px 4px rgba(0, 0, 0, 0.25);\n}"
},
  {
  "name": "Visual Neon Pulse",
  "className": "rc-visual-neon-pulse",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-neon-pulse {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0a0a0f;\n  border: 2px solid #ec4899;\n  animation: roy-visual-neon-pulse 1.6s ease-in-out infinite;\n}"
},
  {
  "name": "Visual Noise Overlay",
  "className": "rc-visual-noise-overlay",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-noise-overlay {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Pixelate",
  "className": "rc-visual-pixelate",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-pixelate {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Prism",
  "className": "rc-visual-prism",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-prism {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0f 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Saturation Pulse",
  "className": "rc-visual-saturation-pulse",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-saturation-pulse {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #f59e0b, #06b6d4);\n  animation: roy-visual-saturation-pulse 2.4s ease-in-out infinite;\n}"
},
  {
  "name": "Visual Shadow Pulse",
  "className": "rc-visual-shadow-pulse",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-shadow-pulse {\n  width: 140px;\n  height: 100px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #8b5cf6, #ec4899);\n  border: none;\n  animation: roy-visual-shadow-pulse 2s ease-in-out infinite;\n}"
},
  {
  "name": "Visual Shimmer Sweep",
  "className": "rc-visual-shimmer-sweep",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-shimmer-sweep {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #1e293b, #334155);\n  overflow: hidden;\n}"
},
  {
  "name": "Visual Spotlight Follow",
  "className": "rc-visual-spotlight-follow",
  "category": "advanced",
  "displayType": "image",
  "css": ".rc-visual-spotlight-follow {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0a0a0f;\n  border: none;\n  overflow: hidden;\n}"
},
  {
  "name": "Water Ripple",
  "className": "rc-water-ripple",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-water-ripple {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background: radial-gradient(circle, #4fb3d9 0%, #1d6a8c 70%, #0d3f56 100%);\n  overflow: hidden;\n}"
},
  {
  "name": "Watercolor",
  "className": "rc-watercolor",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-watercolor {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse 50% 40% at 25% 35%, rgba(255,150,180,0.7), transparent 60%),\n    radial-gradient(ellipse 45% 35% at 70% 30%, rgba(150,200,255,0.65), transparent 65%),\n    radial-gradient(ellipse 55% 40% at 60% 75%, rgba(255,220,120,0.6), transparent 60%),\n    radial-gradient(ellipse 35% 30% at 30% 80%, rgba(180,255,180,0.55), transparent 65%),\n    radial-gradient(ellipse 30% 25% at 85% 65%, rgba(220,150,255,0.55), transparent 65%),\n    linear-gradient(135deg, #faf6ee 0%, #f0e8d8 100%);\n  background-blend-mode: multiply, multiply, multiply, multiply, multiply, normal;\n  filter: blur(0.5px) contrast(0.95);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
},
  {
  "name": "Zoom In Down",
  "className": "rc-zoom-in-down",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-zoom-in-down {\n  animation: roy-zoom-in-down 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: center top;\n}"
},
  {
  "name": "Zoom In Left",
  "className": "rc-zoom-in-left",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-zoom-in-left {\n  animation: roy-zoom-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: left center;\n}"
},
  {
  "name": "Zoom In Right",
  "className": "rc-zoom-in-right",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-zoom-in-right {\n  animation: roy-zoom-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: right center;\n}"
},
  {
  "name": "Zoom In Up",
  "className": "rc-zoom-in-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-zoom-in-up {\n  animation: roy-zoom-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: center bottom;\n}"
},
  {
  "name": "Zoom Out Left",
  "className": "rc-zoom-out-left",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-zoom-out-left {\n  animation: roy-zoom-out-left 0.65s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n  transform-origin: left center;\n}"
},
  {
  "name": "Zoom Out Up",
  "className": "rc-zoom-out-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-zoom-out-up {\n  animation: roy-zoom-out-up 0.65s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n  transform-origin: center bottom;\n}"
},
  {
  "name": "Anchor Tooltip",
  "className": "rc-anchor-tooltip",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-anchor-tooltip {\n  position: relative;\n  width: 220px;\n  height: 140px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  display: grid;\n  place-items: center;\n  anchor-name: --rc-at-host;\n}\n.rc-anchor-tooltip:hover::after,\n.rc-anchor-tooltip:focus-within::after {\n  opacity: 1;\n  transform: translateY(0);\n}"
},
  {
  "name": "Auto Height Expand",
  "className": "rc-auto-height-expand",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-auto-height-expand {\n  interpolate-size: allow-keywords;\n  width: 220px;\n  border-radius: 14px;\n  background: #0f172a;\n  padding: 12px 14px;\n  color: #e2e8f0;\n  font: 500 12px/1.4 system-ui, sans-serif;\n  overflow: hidden;\n}\n.rc-auto-height-expand:hover::after {\n  height: auto;\n  opacity: 1;\n}\n.rc-auto-height-expand {\n  interpolate-size: allow-keywords;\n  width: 220px;\n  border-radius: 14px;\n  background: #0f172a;\n  padding: 12px 14px;\n  color: #e2e8f0;\n  font: 500 12px/1.4 system-ui, sans-serif;\n  overflow: hidden;\n}"
},
  {
  "name": "Backdrop Multi Filter",
  "className": "rc-backdrop-multi-filter",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-backdrop-multi-filter {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  position: relative;\n  overflow: hidden;\n  background:\n    radial-gradient(circle at 20% 20%, #f43f5e, transparent 40%),\n    radial-gradient(circle at 80% 30%, #22d3ee, transparent 40%),\n    radial-gradient(circle at 50% 80%, #a855f7, transparent 45%),\n    repeating-linear-gradient(45deg,\n      rgba(255, 255, 255, 0.05) 0 8px,\n      transparent 8px 16px),\n    #0f172a;\n  display: grid;\n  place-items: center;\n}"
},
  {
  "name": "Balanced Text",
  "className": "rc-balanced-text",
  "category": "text",
  "displayType": "box",
  "css": ".rc-balanced-text {\n  width: 240px;\n  padding: 16px 18px;\n  border-radius: 12px;\n  background: #fef3c7;\n  color: #78350f;\n  font: 600 14px/1.45 Georgia, serif;\n}"
},
  {
  "name": "Color Mix Gradient",
  "className": "rc-color-mix-gradient",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-color-mix-gradient {\n  --c1: #f43f5e;\n  --c2: #06b6d4;\n  width: 220px;\n  height: 130px;\n  border-radius: 14px;\n  background: linear-gradient(\n    135deg,\n    var(--c1),\n    color-mix(in oklab, var(--c1) 50%, var(--c2)),\n    var(--c2)\n  );\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 13px/1 system-ui, sans-serif;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n  transition: filter 0.3s, transform 0.3s;\n}\n.rc-color-mix-gradient:hover {\n  filter: saturate(1.3) brightness(1.05);\n  transform: scale(1.04);\n}"
},
  {
  "name": "Color Mix Mesh",
  "className": "rc-color-mix-mesh",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-color-mix-mesh {\n  --a: #f43f5e;\n  --b: #06b6d4;\n  --c: #8b5cf6;\n  width: 100%;\n  height: 100%;\n  min-height: 200px;\n  border-radius: 12px;\n  background:\n    radial-gradient(circle at 15% 25%, var(--a), transparent 40%),\n    radial-gradient(circle at 85% 15%, var(--b), transparent 40%),\n    radial-gradient(circle at 75% 80%, var(--c), transparent 45%),\n    radial-gradient(circle at 25% 75%, color-mix(in oklab, var(--a) 50%, var(--c)), transparent 45%),\n    radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--b) 50%, var(--c)), transparent 50%),\n    linear-gradient(135deg, #0f172a, #1e293b);\n  animation: rc-b10-cmm-shift 8s ease-in-out infinite;\n}\n@keyframes rc-b10-cmm-shift {\n  0%, 100% { filter: hue-rotate(0deg); }\n  50%      { filter: hue-rotate(40deg) saturate(1.2); }\n}"
},
  {
  "name": "Conic Gradient Clock",
  "className": "rc-conic-gradient-clock",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-conic-gradient-clock {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  background: #0f172a;\n  position: relative;\n}"
},
  {
  "name": "Container Query Card",
  "className": "rc-container-query-card",
  "category": "button-card",
  "displayType": "box",
  "css": ".rc-container-query-card {\n  container-type: inline-size;\n  container-name: roycq;\n  width: 100%;\n  max-width: 360px;\n  height: 160px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #312e81, #4c1d95);\n  padding: 14px;\n  display: grid;\n  gap: 10px;\n  grid-template-columns: 1fr;\n  align-content: center;\n  color: #ede9fe;\n  font: 500 12px/1.4 system-ui, sans-serif;\n  transition: grid-template-columns 0.3s;\n}\n(:has(*)) {\n  .rc-has-parent-highlight > span:focus-visible {\n    border-color: #10b981;\n    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);\n  }\n}"
},
  {
  "name": "Double Conic Spinner",
  "className": "rc-double-conic-spinner",
  "category": "loaders",
  "displayType": "box",
  "css": ".rc-double-conic-spinner {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  background: #0f172a;\n  display: grid;\n  place-items: center;\n  position: relative;\n}"
},
  {
  "name": "Film Grain",
  "className": "rc-film-grain",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-film-grain {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse 60% 50% at 30% 30%, #f4a261 0%, transparent 60%),\n    radial-gradient(ellipse 50% 40% at 70% 70%, #e76f51 0%, transparent 60%),\n    linear-gradient(135deg, #264653 0%, #2a9d8f 50%, #e9c46a 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n  filter: contrast(1.1) saturate(0.9);\n}"
},
  {
  "name": "Has Parent Highlight",
  "className": "rc-has-parent-highlight",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-has-parent-highlight {\n  width: 220px;\n  padding: 18px;\n  border-radius: 14px;\n  background: #1e293b;\n  border: 2px solid #334155;\n  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;\n}\n :has() relational selector */\n.rc-has-parent-highlight {\n  width: 220px;\n  padding: 18px;\n  border-radius: 14px;\n  background: #1e293b;\n  border: 2px solid #334155;\n  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;\n}\nt:has(> span:hover) {\n  border-color: #10b981;\n  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);\n  background: #0f2a23;\n}\nt:has(> span:focus-visible) {\n  border-color: #f59e0b;\n  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);\n}\nt:has(> span:hover) > span {\n  color: #34d399;\n  border-color: #10b981;\n}\n :has() — child still gets focus ring */\n@supports not selector(:has(*)) {\n  .rc-has-parent-highlight > span:focus-visible {\n    border-color: #10b981;\n    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);\n  }\n}\n(:has(*)) {\n  .rc-has-parent-highlight > span:focus-visible {\n    border-color: #10b981;\n    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);\n  }\n}"
},
  {
  "name": "Hover Bounce",
  "className": "rc-hover-bounce",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-bounce:hover {\n  animation: rc-hover-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.rc-hover-bounce:hover {\n  animation: rc-hover-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes rc-hover-bounce {\n  0%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-18px); }\n  60% { transform: translateY(-4px); }\n}"
},
  {
  "name": "Infinity Loop",
  "className": "rc-infinity-loop",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-infinity-loop {\n  position: relative;\n  width: 220px;\n  height: 160px;\n}"
},
  {
  "name": "Interpolate Size Accordion",
  "className": "rc-interpolate-size-accordion",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-interpolate-size-accordion {\n  interpolate-size: allow-keywords;\n  width: 220px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #f97316, #ef4444);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}\n.rc-interpolate-size-accordion:hover::after {\n  height: auto;\n  opacity: 1;\n  padding: 0 14px 14px;\n}\n.rc-interpolate-size-accordion {\n  interpolate-size: allow-keywords;\n  width: 220px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #f97316, #ef4444);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
},
  {
  "name": "Light Dark Auto",
  "className": "rc-light-dark-auto",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-light-dark-auto {\n  color-scheme: light dark;\n  width: 220px;\n  height: 130px;\n  border-radius: 14px;\n  background: light-dark(#f8fafc, #0f172a);\n  color: light-dark(#0f172a, #f1f5f9);\n  border: 2px solid light-dark(#cbd5e1, #334155);\n  display: grid;\n  place-items: center;\n  font: 700 13px/1 system-ui, sans-serif;\n  transition: background 0.4s, color 0.4s, border-color 0.4s;\n  animation: rc-b10-ld-cycle 4s steps(1, end) infinite;\n}\n@keyframes rc-b10-ld-cycle {\n  0%, 49%   { color-scheme: light; }\n  50%, 100% { color-scheme: dark; }\n}"
},
  {
  "name": "Mask Composite Reveal",
  "className": "rc-mask-composite-reveal",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-mask-composite-reveal {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #1e293b, #334155);\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
},
  {
  "name": "Mask Linear Wipe",
  "className": "rc-mask-linear-wipe",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-mask-linear-wipe {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(135deg, #f59e0b, #ef4444);\n}"
},
  {
  "name": "Mask Radial Reveal",
  "className": "rc-mask-radial-reveal",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-mask-radial-reveal {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  background:\n    repeating-linear-gradient(45deg,\n      #ec4899 0 10px, #8b5cf6 10px 20px, #06b6d4 20px 30px),\n    #0f172a;\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
},
  {
  "name": "Mix Blend Difference",
  "className": "rc-mix-blend-difference",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-mix-blend-difference {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  position: relative;\n  overflow: hidden;\n  isolation: isolate;\n}"
},
  {
  "name": "Mix Blend Exclusion",
  "className": "rc-mix-blend-exclusion",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-mix-blend-exclusion {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background:\n    conic-gradient(from 0deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4, #f59e0b);\n  position: relative;\n  overflow: hidden;\n  isolation: isolate;\n}"
},
  {
  "name": "Offset Path Draw",
  "className": "rc-offset-path-draw",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-offset-path-draw {\n  width: 220px;\n  height: 140px;\n  border-radius: 14px;\n  background: #0f172a;\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "Offset Path Orbit",
  "className": "rc-offset-path-orbit",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-offset-path-orbit {\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background: radial-gradient(circle, #1e293b 40%, #0f172a 41%);\n  position: relative;\n  display: grid;\n  place-items: center;\n}"
},
  {
  "name": "Offset Path Wave",
  "className": "rc-offset-path-wave",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-offset-path-wave {\n  width: 220px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(180deg, #0f172a, #1e293b);\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "Painting Oil",
  "className": "rc-painting-oil",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-painting-oil {\n  width: 100%;\n  min-height: 240px;\n  background:\n    repeating-linear-gradient(35deg,\n      #8b1a1a 0 20px, #c84040 20px 38px, #5a0808 38px 60px,\n      #d4604a 60px 80px, #6b1414 80px 102px),\n    repeating-linear-gradient(-25deg,\n      #2a4d8a 0 24px, #4a7bc8 24px 48px, #1a2d55 48px 72px),\n    linear-gradient(135deg, #c84040 0%, #2a4d8a 50%, #8b1a1a 100%);\n  background-blend-mode: overlay, overlay, normal;\n  filter: contrast(1.2) saturate(1.3);\n  position: relative;\n  border-radius: 8px;\n}"
},
  {
  "name": "Pencil Sketch",
  "className": "rc-pencil-sketch",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-pencil-sketch {\n  width: 100%;\n  min-height: 240px;\n  background:\n    repeating-linear-gradient(45deg,\n      transparent 0 2px,\n      rgba(40,40,40,0.35) 2px 2.4px,\n      transparent 2.4px 5px),\n    repeating-linear-gradient(-45deg,\n      transparent 0 2px,\n      rgba(40,40,40,0.25) 2px 2.4px,\n      transparent 2.4px 5px),\n    repeating-linear-gradient(90deg,\n      transparent 0 3px,\n      rgba(40,40,40,0.12) 3px 3.4px,\n      transparent 3.4px 7px),\n    linear-gradient(180deg, #f5f0e6 0%, #ebe5d5 100%);\n  background-blend-mode: multiply, multiply, multiply, normal;\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
},
  {
  "name": "Property Angle Rotate",
  "className": "rc-property-angle-rotate",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-property-angle-rotate {\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  background: conic-gradient(\n    from var(--rc-b10-par-angle),\n    #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b, #ec4899\n  );\n  --rc-b10-par-angle: 0deg;\n  animation: rc-b10-par-spin 4s linear infinite;\n  position: relative;\n}\n@keyframes rc-b10-par-spin {\n  to { --rc-b10-par-angle: 360deg; }\n}"
},
  {
  "name": "Property Color Shift",
  "className": "rc-property-color-shift",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-property-color-shift {\n  width: 160px;\n  height: 160px;\n  border-radius: 18px;\n  background: hsl(from hsl(var(--rc-b10-pcs-hue) 90% 55%) h s l);\n  --rc-b10-pcs-hue: 0deg;\n  animation: rc-b10-pcs-cycle 5s linear infinite;\n  box-shadow: 0 12px 30px hsl(var(--rc-b10-pcs-hue) 90% 55% / 0.4);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 12px/1 system-ui, sans-serif;\n  letter-spacing: 0.2em;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n}\n@keyframes rc-b10-pcs-cycle {\n  to { --rc-b10-pcs-hue: 360deg; }\n}"
},
  {
  "name": "Property Conic Loader",
  "className": "rc-property-conic-loader",
  "category": "loaders",
  "displayType": "box",
  "css": ".rc-property-conic-loader {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: conic-gradient(\n    from var(--rc-b10-pcl-angle),\n    transparent 0deg,\n    #06b6d4 60deg,\n    #6366f1 120deg,\n    transparent 180deg,\n    transparent 360deg\n  );\n  -webkit-mask: radial-gradient(circle, transparent 22px, #000 23px);\n          mask: radial-gradient(circle, transparent 22px, #000 23px);\n  --rc-b10-pcl-angle: 0deg;\n  animation: rc-b10-pcl-spin 1.2s linear infinite;\n}\n@keyframes rc-b10-pcl-spin {\n  to { --rc-b10-pcl-angle: 360deg; }\n}"
},
  {
  "name": "Property Gradient Flow",
  "className": "rc-property-gradient-flow",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-property-gradient-flow {\n  width: 200px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(\n    var(--rc-b10-pgf-angle),\n    #ec4899, #8b5cf6, #3b82f6, #06b6d4, #10b981, #f59e0b, #ec4899\n  );\n  background-size: 300% 300%;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 800 16px/1 system-ui, sans-serif;\n  letter-spacing: 0.2em;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  --rc-b10-pgf-angle: 0deg;\n  animation: rc-b10-pgf-spin 4s linear infinite;\n}\n@keyframes rc-b10-pgf-spin {\n  to { --rc-b10-pgf-angle: 360deg; }\n}"
},
  {
  "name": "Property Hue Cycle",
  "className": "rc-property-hue-cycle",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-property-hue-cycle {\n  width: 140px;\n  height: 140px;\n  border-radius: 24px;\n  background: hsl(from hsl(var(--rc-b10-phc-hue) 80% 60%) h s l);\n  display: grid;\n  place-items: center;\n  color: hsl(from hsl(calc(var(--rc-b10-phc-hue) + 180deg) 80% 20%) h s l);\n  font: 800 14px/1 system-ui, sans-serif;\n  letter-spacing: 0.18em;\n  --rc-b10-phc-hue: 0deg;\n  box-shadow: 0 12px 30px hsl(var(--rc-b10-phc-hue) 80% 60% / 0.5);\n  animation: rc-b10-phc-cycle 4s linear infinite;\n}\n@keyframes rc-b10-phc-cycle {\n  to { --rc-b10-phc-hue: 360deg; }\n}"
},
  {
  "name": "Property Progress Bar",
  "className": "rc-property-progress-bar",
  "category": "loaders",
  "displayType": "box",
  "css": ".rc-property-progress-bar {\n  width: 220px;\n  height: 36px;\n  border-radius: 18px;\n  background: #1e293b;\n  border: 1px solid #334155;\n  position: relative;\n  overflow: hidden;\n  --rc-b10-ppb-progress: 0;\n  animation: rc-b10-ppb-fill 3s ease-in-out infinite;\n}\n@keyframes rc-b10-ppb-fill {\n  0%   { --rc-b10-ppb-progress: 0; }\n  60%  { --rc-b10-ppb-progress: 100; }\n  80%  { --rc-b10-ppb-progress: 100; }\n  100% { --rc-b10-ppb-progress: 0; }\n}"
},
  {
  "name": "Property Shadow Breathe",
  "className": "rc-property-shadow-breathe",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-property-shadow-breathe {\n  width: 120px;\n  height: 120px;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #0ea5e9, #6366f1);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 800 14px/1 system-ui, sans-serif;\n  letter-spacing: 0.15em;\n  --rc-b10-psb-blur: 0px;\n  --rc-b10-psb-spread: 0px;\n  box-shadow:\n    0 0 var(--rc-b10-psb-blur) var(--rc-b10-psb-spread) rgba(99, 102, 241, 0.7),\n    0 0 var(--rc-b10-psb-blur) var(--rc-b10-psb-spread) rgba(14, 165, 233, 0.5);\n  animation: rc-b10-psb-breathe 2.4s ease-in-out infinite;\n}\n@keyframes rc-b10-psb-breathe {\n  0%, 100% { --rc-b10-psb-blur: 0px;   --rc-b10-psb-spread: 0px; }\n  50%      { --rc-b10-psb-blur: 40px;  --rc-b10-psb-spread: 8px; }\n}"
},
  {
  "name": "Relative Color Hover",
  "className": "rc-relative-color-hover",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-relative-color-hover {\n  --base: #10b981;\n  width: 200px;\n  height: 120px;\n  border-radius: 14px;\n  background: var(--base);\n  display: grid;\n  place-items: center;\n  color: rgb(from var(--base) calc(255 - r) calc(255 - g) calc(255 - b));\n  font: 700 13px/1 system-ui, sans-serif;\n  letter-spacing: 0.1em;\n  border: 2px solid rgb(from var(--base) r g b / 0.6);\n  transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;\n}\n.rc-relative-color-hover:hover {\n  /* Derived shades from the single --base variable */\n  background: rgb(from var(--base) calc(r + 40) calc(g + 20) calc(b - 30));\n  color: rgb(from var(--base) calc(r * 0.2) calc(g * 0.2) calc(b * 0.2));\n  border-color: rgb(from var(--base) r g b / 0.95);\n  box-shadow: 0 8px 24px rgb(from var(--base) r g b / 0.45);\n  transform: translateY(-3px);\n}"
},
  {
  "name": "Relative Color Tint",
  "className": "rc-relative-color-tint",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-relative-color-tint {\n  --base: #6366f1;\n  width: 100%;\n  height: 100%;\n  min-height: 200px;\n  border-radius: 12px;\n  background:\n    radial-gradient(circle at 30% 30%,\n      rgb(from var(--base) calc(r + 80) calc(g + 80) calc(b + 80) / 0.6),\n      transparent 50%),\n    radial-gradient(circle at 70% 70%,\n      rgb(from var(--base) calc(r - 60) calc(g - 30) calc(b - 30) / 0.7),\n      transparent 55%),\n    linear-gradient(135deg,\n      rgb(from var(--base) r g b / 0.85),\n      rgb(from var(--base) calc(r * 0.3) calc(g * 0.3) calc(b * 0.3)));\n  animation: rc-b10-rct-pan 6s ease-in-out infinite alternate;\n}\n@keyframes rc-b10-rct-pan {\n  from { background-position: 0% 0%, 100% 100%, 0 0; }\n  to   { background-position: 20% 30%, 80% 70%, 0 0; }\n}"
},
  {
  "name": "Scrollbar Gutter Stable",
  "className": "rc-scrollbar-gutter-stable",
  "category": "navigation",
  "displayType": "box",
  "css": ".rc-scrollbar-gutter-stable {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  scrollbar-gutter: stable;\n  overflow-y: auto;\n  padding: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  color: #e2e8f0;\n  font: 500 12px/1.4 system-ui, sans-serif;\n}"
},
  {
  "name": "Starting Style Drop In",
  "className": "rc-starting-style-drop-in",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-starting-style-drop-in {\n  position: relative;\n  width: 240px;\n  height: 140px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}\n.rc-starting-style-drop-in {\n  position: relative;\n  width: 240px;\n  height: 140px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
},
  {
  "name": "Starting Style Fade",
  "className": "rc-starting-style-fade",
  "category": "scroll-micro",
  "displayType": "box",
  "css": ".rc-starting-style-fade {\n  width: 200px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #db2777, #9333ea);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 14px/1 system-ui, sans-serif;\n  letter-spacing: 0.15em;\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);\n  /* Restart the entry on every hover-out for demo purposes */\n  animation: rc-b10-ss-restart 3s ease-in-out infinite;\n}\n.rc-starting-style-fade {\n  width: 200px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #db2777, #9333ea);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 14px/1 system-ui, sans-serif;\n  letter-spacing: 0.15em;\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);\n  /* Restart the entry on every hover-out for demo purposes */\n  animation: rc-b10-ss-restart 3s ease-in-out infinite;\n}\n@keyframes rc-b10-ss-restart {\n  0%, 40%   { opacity: 1; transform: translateY(0) scale(1); }\n  50%       { opacity: 0; transform: translateY(20px) scale(0.92); }\n  60%, 100% { opacity: 1; transform: translateY(0) scale(1); }\n}"
},
  {
  "name": "SVG Displacement Wave",
  "className": "rc-svg-displacement-wave",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-svg-displacement-wave {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background:\n    radial-gradient(circle at 30% 30%, #22d3ee, transparent 50%),\n    radial-gradient(circle at 70% 70%, #a855f7, transparent 50%),\n    linear-gradient(135deg, #0ea5e9, #6366f1);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 800 16px/1 system-ui, sans-serif;\n  letter-spacing: 0.2em;\n  filter: url(#rc-b10-disp-filter);\n  animation: rc-b10-disp-wave 2.5s ease-in-out infinite alternate;\n}\n@keyframes rc-b10-disp-wave {\n  from { transform: translateY(-2px); }\n  to   { transform: translateY(2px); }\n}"
},
  {
  "name": "SVG Gooey Merge",
  "className": "rc-svg-gooey-merge",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-svg-gooey-merge {\n  width: 180px;\n  height: 120px;\n  background: #0f172a;\n  border-radius: 14px;\n  filter: url(#rc-b10-gooey-filter);\n  position: relative;\n  overflow: hidden;\n}"
},
  {
  "name": "SVG Turbulence Distort",
  "className": "rc-svg-turbulence-distort",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-svg-turbulence-distort {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 800 18px/1 system-ui, sans-serif;\n  letter-spacing: 0.25em;\n  filter: url(#rc-b10-turb-filter);\n  animation: rc-b10-turb-pulse 3s ease-in-out infinite;\n}\n@keyframes rc-b10-turb-pulse {\n  0%, 100% { filter: url(#rc-b10-turb-filter) brightness(1); }\n  50%      { filter: url(#rc-b10-turb-filter) brightness(1.15); }\n}"
},
  {
  "name": "View Timeline Reveal",
  "className": "rc-view-timeline-reveal",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-view-timeline-reveal {\n  width: 220px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #7c3aed, #2563eb);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 13px/1.2 system-ui, sans-serif;\n  letter-spacing: 0.1em;\n  text-align: center;\n  animation: rc-b10-vtl-reveal linear both;\n  animation-timeline: view();\n  animation-range: entry 0% cover 50%;\n}\n@keyframes rc-b10-vtl-reveal {\n  from { opacity: 0; transform: translateY(60px) scale(0.8); }\n  to   { opacity: 1; transform: translateY(0) scale(1); }\n}"
},
  {
  "name": "View Transition Snapshot",
  "className": "rc-view-transition-snapshot",
  "category": "advanced",
  "displayType": "box",
  "css": ".rc-view-transition-snapshot {\n  width: 200px;\n  height: 120px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, #0ea5e9, #6366f1);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 14px/1 system-ui, sans-serif;\n  view-transition-name: rc-vt-card;\n  animation: rc-b10-vt-morph 4s ease-in-out infinite;\n}\n@keyframes rc-b10-vt-morph {\n  0%, 35%   { border-radius: 16px; background: linear-gradient(135deg, #0ea5e9, #6366f1); }\n  50%, 85%  { border-radius: 60px; background: linear-gradient(135deg, #f43f5e, #f59e0b); }\n  100%      { border-radius: 16px; background: linear-gradient(135deg, #0ea5e9, #6366f1); }\n}"
},
  {
  "name": "Entrance Curtain",
  "className": "rc-entrance-curtain",
  "category": "core-animations",
  "displayType": "box",
  "css": "@property --rc-entrance-curtain-y {\n  syntax: '<length>';\n  inherits: false;\n  initial-value: 100%;\n}\n.rc-entrance-curtain {\n  animation: rc-entrance-curtain 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;\n  --rc-entrance-curtain-y: 100%;\n  clip-path: inset(0 0 var(--rc-entrance-curtain-y) 0);\n}\n@keyframes rc-entrance-curtain {\n  to { --rc-entrance-curtain-y: 0%; }\n}"
},
  {
  "name": "Entrance Scale Blur",
  "className": "rc-entrance-scale-blur",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-entrance-scale-blur {\n  animation: rc-entrance-scale-blur 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes rc-entrance-scale-blur {\n  from { opacity: 0; transform: scale(0.92); filter: blur(8px); }\n  to { opacity: 1; transform: scale(1); filter: blur(0px); }\n}"
},
  {
  "name": "Entrance Slide Blur",
  "className": "rc-entrance-slide-blur",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-entrance-slide-blur {\n  animation: rc-entrance-slide-blur 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes rc-entrance-slide-blur {\n  from { opacity: 0; transform: translateY(30px); filter: blur(6px); }\n  to { opacity: 1; transform: translateY(0); filter: blur(0px); }\n}"
},
  {
  "name": "Exit Fade Scale",
  "className": "rc-exit-fade-scale",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-exit-fade-scale {\n  animation: rc-exit-fade-scale 0.4s cubic-bezier(0.55, 0, 1, 0.45) both;\n}\n@keyframes rc-exit-fade-scale {\n  from { opacity: 1; transform: scale(1); }\n  to { opacity: 0; transform: scale(0.85); }\n}"
},
  {
  "name": "Exit Slide Down",
  "className": "rc-exit-slide-down",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-exit-slide-down {\n  animation: rc-exit-slide-down 0.35s cubic-bezier(0.55, 0, 1, 0.45) both;\n}\n@keyframes rc-exit-slide-down {\n  from { opacity: 1; transform: translateY(0); }\n  to { opacity: 0; transform: translateY(20px); }\n}"
},
  {
  "name": "Stagger Fade Up",
  "className": "rc-stagger-fade-up",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-stagger-fade-up > * {\n  opacity: 0;\n  animation: rc-stagger-fade-up-child 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.rc-stagger-fade-up > *:nth-child(1) { animation-delay: 0ms; }\n.rc-stagger-fade-up > *:nth-child(2) { animation-delay: 60ms; }\n.rc-stagger-fade-up > *:nth-child(3) { animation-delay: 120ms; }\n.rc-stagger-fade-up > *:nth-child(4) { animation-delay: 180ms; }\n.rc-stagger-fade-up > *:nth-child(5) { animation-delay: 240ms; }\n.rc-stagger-fade-up > *:nth-child(6) { animation-delay: 300ms; }\n.rc-stagger-fade-up > *:nth-child(n+7) { animation-delay: 360ms; }\n@keyframes rc-stagger-fade-up-child {\n  from { opacity: 0; transform: translateY(16px); }\n  to { opacity: 1; transform: translateY(0); }\n}"
},
  {
  "name": "Stagger Scale In",
  "className": "rc-stagger-scale-in",
  "category": "core-animations",
  "displayType": "box",
  "css": ".rc-stagger-scale-in > * {\n  opacity: 0;\n  animation: rc-stagger-scale-in-child 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.rc-stagger-scale-in > *:nth-child(1) { animation-delay: 0ms; }\n.rc-stagger-scale-in > *:nth-child(2) { animation-delay: 50ms; }\n.rc-stagger-scale-in > *:nth-child(3) { animation-delay: 100ms; }\n.rc-stagger-scale-in > *:nth-child(4) { animation-delay: 150ms; }\n.rc-stagger-scale-in > *:nth-child(5) { animation-delay: 200ms; }\n.rc-stagger-scale-in > *:nth-child(n+6) { animation-delay: 250ms; }\n@keyframes rc-stagger-scale-in-child {\n  from { opacity: 0; transform: scale(0.8); }\n  to { opacity: 1; transform: scale(1); }\n}"
},
  {
  "name": "Hover Image Zoom",
  "className": "rc-hover-image-zoom",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-image-zoom {\n  overflow: hidden;\n}\n.rc-hover-image-zoom img,\n.rc-hover-image-zoom > * {\n  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);\n  will-change: transform;\n}\n.rc-hover-image-zoom:hover img,\n.rc-hover-image-zoom:hover > * {\n  transform: scale(1.08);\n}"
},
  {
  "name": "Hover Border Gradient",
  "className": "rc-hover-border-gradient",
  "category": "hover",
  "displayType": "box",
  "css": "@property --rc-hbg-angle {\n  syntax: '<angle>';\n  inherits: false;\n  initial-value: 0deg;\n}\n.rc-hover-border-gradient {\n  --rc-hbg-angle: 0deg;\n  border: 2px solid transparent;\n  background-image: linear-gradient(var(--rc-hbg-angle), #a855f7, #ec4899, #3b82f6, #a855f7);\n  background-origin: border-box;\n  background-clip: padding-box, border-box;\n  background-size: 300% 300%;\n  transition: --rc-hbg-angle 0s;\n}\n.rc-hover-border-gradient:hover {\n  animation: rc-hbg-rotate 2s linear infinite;\n}\n@keyframes rc-hbg-rotate {\n  to { --rc-hbg-angle: 360deg; }\n}"
},
  {
  "name": "Hover Arrow Move",
  "className": "rc-hover-arrow-move",
  "category": "hover",
  "displayType": "box",
  "css": ".rc-hover-arrow-move {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5em;\n}\n.rc-hover-arrow-move .rc-arrow {\n  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);\n  display: inline-block;\n}\n.rc-hover-arrow-move:hover .rc-arrow {\n  transform: translateX(4px);\n}"
},
  {
  "name": "Text Gradient Animate",
  "className": "rc-text-gradient-animate",
  "category": "text",
  "displayType": "text",
  "css": "@property --rc-tga-pos {\n  syntax: '<percentage>';\n  inherits: false;\n  initial-value: 0%;\n}\n.rc-text-gradient-animate {\n  background: linear-gradient(90deg, #a855f7, #ec4899, #3b82f6, #10b981, #a855f7);\n  background-size: 300% 100%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: rc-tga-move 4s ease infinite;\n}\n@keyframes rc-tga-move {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}"
},
  {
  "name": "Text Clip Reveal",
  "className": "rc-text-clip-reveal",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-clip-reveal {\n  animation: rc-text-clip-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;\n  clip-path: inset(0 100% 0 0);\n}\n@keyframes rc-text-clip-reveal {\n  to { clip-path: inset(0 0% 0 0); }\n}"
},
  {
  "name": "Text Shadow Glow Pulse",
  "className": "rc-text-shadow-glow-pulse",
  "category": "text",
  "displayType": "text",
  "css": ".rc-text-shadow-glow-pulse {\n  animation: rc-text-shadow-glow-pulse 2s ease-in-out infinite;\n}\n@keyframes rc-text-shadow-glow-pulse {\n  0%, 100% { text-shadow: 0 0 8px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.1); }\n  50% { text-shadow: 0 0 16px rgba(168, 85, 247, 0.7), 0 0 40px rgba(168, 85, 247, 0.2); }\n}"
},
  {
  "name": "BG Dots Grid",
  "className": "rc-bg-dots-grid",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-bg-dots-grid {\n  background-image: radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px);\n  background-size: 24px 24px;\n}"
},
  {
  "name": "BG Lines",
  "className": "rc-bg-lines",
  "category": "backgrounds",
  "displayType": "box",
  "css": ".rc-bg-lines {\n  background-image:\n    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(168, 85, 247, 0.08) 40px),\n    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(168, 85, 247, 0.08) 40px);\n  background-size: 40px 40px;\n}"
},
  {
  "name": "3D Card Tilt",
  "className": "rc-3d-card-tilt",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-3d-card-tilt {\n  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;\n  transform-style: preserve-3d;\n  transform: perspective(800px) rotateX(0deg) rotateY(0deg);\n}\n.rc-3d-card-tilt:hover {\n  transform: perspective(800px) rotateX(-5deg) rotateY(5deg) translateZ(20px);\n  box-shadow: -8px 8px 20px rgba(0, 0, 0, 0.2);\n}"
},
  {
  "name": "3D Flip X",
  "className": "rc-3d-flip-x",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-3d-flip-x {\n  animation: rc-3d-flip-x 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-style: preserve-3d;\n  backface-visibility: hidden;\n}\n@keyframes rc-3d-flip-x {\n  from { transform: perspective(800px) rotateX(90deg); opacity: 0; }\n  to { transform: perspective(800px) rotateX(0deg); opacity: 1; }\n}"
},
  {
  "name": "3D Flip Y",
  "className": "rc-3d-flip-y",
  "category": "3d-transforms",
  "displayType": "box",
  "css": ".rc-3d-flip-y {\n  animation: rc-3d-flip-y 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-style: preserve-3d;\n  backface-visibility: hidden;\n}\n@keyframes rc-3d-flip-y {\n  from { transform: perspective(800px) rotateY(-90deg); opacity: 0; }\n  to { transform: perspective(800px) rotateY(0deg); opacity: 1; }\n}"
}
];
