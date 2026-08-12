"""
RoyCSS Effects: Forms & Inputs
CSS effect tuples for animated form controls, validation feedback, and input interactions.
"""

form_input_effects = [
    # 1. Focus Glow Input - pulsing box-shadow glow simulating a focused input
    (
        "Focus Glow Input",
        "rc-form-focus-glow",
        "forms-inputs",
        "box",
        """\
.rc-form-focus-glow {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-focus-glow::before {
  content: '';
  position: absolute;
  width: 80%;
  height: 44px;
  border-radius: 10px;
  border: 2px solid rgba(124, 58, 237, 0.35);
  background: rgba(124, 58, 237, 0.06);
  animation: rcFormFocusGlow 2.4s ease-in-out infinite;
}
.rc-form-focus-glow::after {
  content: 'Input focused...';
  position: relative;
  z-index: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  color: rgba(167, 139, 250, 0.6);
  letter-spacing: 0.02em;
  pointer-events: none;
}
@keyframes rcFormFocusGlow {
  0%, 100% {
    box-shadow:
      0 0 0 0 rgba(124, 58, 237, 0),
      0 0 12px 0 rgba(124, 58, 237, 0);
    border-color: rgba(124, 58, 237, 0.25);
  }
  25% {
    box-shadow:
      0 0 0 3px rgba(124, 58, 237, 0.12),
      0 0 20px 4px rgba(124, 58, 237, 0.18);
    border-color: rgba(124, 58, 237, 0.55);
  }
  50% {
    box-shadow:
      0 0 0 5px rgba(99, 102, 241, 0.1),
      0 0 30px 8px rgba(99, 102, 241, 0.25);
    border-color: rgba(99, 102, 241, 0.7);
  }
  75% {
    box-shadow:
      0 0 0 3px rgba(124, 58, 237, 0.12),
      0 0 20px 4px rgba(124, 58, 237, 0.18);
    border-color: rgba(124, 58, 237, 0.55);
  }
}""",
    ),

    # 2. Floating Label - label animates from placeholder position to above the field
    (
        "Floating Label",
        "rc-form-floating-label",
        "forms-inputs",
        "box",
        """\
.rc-form-floating-label {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-floating-label::before {
  content: 'Email address';
  position: absolute;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  color: rgba(167, 139, 250, 0.45);
  animation: rcFormFloatingLabel 3s ease-in-out infinite;
  pointer-events: none;
  white-space: nowrap;
}
.rc-form-floating-label::after {
  content: '';
  position: absolute;
  width: 70%;
  height: 42px;
  border-radius: 8px;
  border: 2px solid rgba(124, 58, 237, 0.2);
  background: rgba(124, 58, 237, 0.04);
  animation: rcFormFloatingBorder 3s ease-in-out infinite;
}
@keyframes rcFormFloatingLabel {
  0%, 15% {
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    color: rgba(167, 139, 250, 0.45);
  }
  30%, 70% {
    top: calc(50% - 26px);
    transform: translateY(0);
    font-size: 11px;
    color: #a78bfa;
    letter-spacing: 0.04em;
  }
  85%, 100% {
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    color: rgba(167, 139, 250, 0.45);
  }
}
@keyframes rcFormFloatingBorder {
  0%, 15% {
    border-color: rgba(124, 58, 237, 0.2);
    box-shadow: none;
  }
  30%, 70% {
    border-color: #7c3aed;
    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.15);
  }
  85%, 100% {
    border-color: rgba(124, 58, 237, 0.2);
    box-shadow: none;
  }
}""",
    ),

    # 3. Shimmer Placeholder - skeleton loading shimmer for form fields
    (
        "Shimmer Placeholder",
        "rc-form-shimmer",
        "forms-inputs",
        "box",
        """\
.rc-form-shimmer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}
.rc-form-shimmer::before {
  content: '';
  position: absolute;
  top: 18%;
  left: 10%;
  width: 80%;
  height: 18px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(124, 58, 237, 0.08) 0%,
    rgba(124, 58, 237, 0.2) 50%,
    rgba(124, 58, 237, 0.08) 100%
  );
  background-size: 200% 100%;
  animation: rcFormShimmer 1.8s ease-in-out infinite;
}
.rc-form-shimmer::after {
  content: '';
  position: absolute;
  top: 45%;
  left: 10%;
  width: 55%;
  height: 38px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(99, 102, 241, 0.08) 0%,
    rgba(99, 102, 241, 0.2) 50%,
    rgba(99, 102, 241, 0.08) 100%
  );
  background-size: 200% 100%;
  animation: rcFormShimmer 1.8s ease-in-out infinite 0.3s;
}
@keyframes rcFormShimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}""",
    ),

    # 4. Error Shake - horizontal shake animation simulating validation error
    (
        "Error Shake",
        "rc-form-error-shake",
        "forms-inputs",
        "box",
        """\
.rc-form-error-shake {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-error-shake::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 42px;
  border-radius: 8px;
  border: 2px solid #ef4444;
  background: rgba(239, 68, 68, 0.06);
  animation: rcFormErrorShake 0.6s ease-in-out infinite 1.8s;
}
.rc-form-error-shake::after {
  content: '\\26A0  Please enter a valid email';
  position: absolute;
  top: calc(50% + 30px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  color: #ef4444;
  opacity: 0;
  animation: rcFormErrorFade 2.4s ease-in-out infinite;
  pointer-events: none;
}
@keyframes rcFormErrorShake {
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(-8px); }
  20% { transform: translateX(8px); }
  30% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  50% { transform: translateX(-4px); }
  60% { transform: translateX(4px); }
  70% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
  90% { transform: translateX(0); }
}
@keyframes rcFormErrorFade {
  0%, 55% { opacity: 0; transform: translateY(4px); }
  75%, 90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-2px); }
}""",
    ),

    # 5. Success Checkmark - checkmark drawing animation using pseudo-elements
    (
        "Success Checkmark",
        "rc-form-success",
        "forms-inputs",
        "box",
        """\
.rc-form-success {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-success::before {
  content: '';
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.1);
  animation: rcFormSuccessCircle 2s ease-in-out infinite;
}
.rc-form-success::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 14px;
  border-left: 3px solid #10b981;
  border-bottom: 3px solid #10b981;
  transform: rotate(-45deg);
  clip-path: inset(0 100% 0 0);
  animation: rcFormSuccessCheck 2s ease-in-out infinite 0.5s;
}
@keyframes rcFormSuccessCircle {
  0%, 10% {
    transform: scale(0);
    opacity: 0;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
  25% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3);
  }
  40% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  75% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 20px 4px rgba(16, 185, 129, 0.15);
  }
  90%, 100% {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes rcFormSuccessCheck {
  0% { clip-path: inset(0 100% 0 0); }
  30%, 70% { clip-path: inset(0 0 0 0); }
  90%, 100% { clip-path: inset(0 100% 0 0); }
}""",
    ),

    # 6. Toggle Switch - animated toggle sliding from off to on state
    (
        "Toggle Switch",
        "rc-form-toggle",
        "forms-inputs",
        "box",
        """\
.rc-form-toggle {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-toggle::before {
  content: '';
  position: absolute;
  width: 52px;
  height: 28px;
  border-radius: 14px;
  background: rgba(124, 58, 237, 0.15);
  border: 2px solid rgba(124, 58, 237, 0.3);
  animation: rcFormToggleTrack 2.6s ease-in-out infinite;
}
.rc-form-toggle::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
  animation: rcFormToggleKnob 2.6s ease-in-out infinite;
}
@keyframes rcFormToggleTrack {
  0%, 100% {
    background: rgba(124, 58, 237, 0.15);
    border-color: rgba(124, 58, 237, 0.3);
  }
  35%, 65% {
    background: rgba(16, 185, 129, 0.25);
    border-color: #10b981;
  }
}
@keyframes rcFormToggleKnob {
  0%, 100% {
    transform: translateX(-14px);
    background: #6366f1;
    box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
  }
  35%, 65% {
    transform: translateX(14px);
    background: #10b981;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
  }
}""",
    ),

    # 7. Custom Checkbox - animated checkbox with checkmark drawing
    (
        "Custom Checkbox",
        "rc-form-checkbox",
        "forms-inputs",
        "box",
        """\
.rc-form-checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-checkbox::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 2px solid rgba(167, 139, 250, 0.4);
  background: transparent;
  animation: rcFormCheckboxBox 2.4s ease-in-out infinite;
}
.rc-form-checkbox::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 18px;
  border-left: 2.5px solid #fff;
  border-bottom: 2.5px solid #fff;
  transform: rotate(-45deg) scale(0);
  opacity: 0;
  animation: rcFormCheckboxCheck 2.4s ease-in-out infinite 0.15s;
}
@keyframes rcFormCheckboxBox {
  0%, 100% {
    border-color: rgba(167, 139, 250, 0.4);
    background: transparent;
    transform: scale(1);
  }
  25% {
    border-color: #7c3aed;
    transform: scale(0.92);
  }
  35%, 65% {
    border-color: #7c3aed;
    background: #7c3aed;
    transform: scale(1);
  }
  80% {
    border-color: rgba(167, 139, 250, 0.4);
    background: transparent;
    transform: scale(1.05);
  }
}
@keyframes rcFormCheckboxCheck {
  0%, 30% {
    transform: rotate(-45deg) scale(0);
    opacity: 0;
  }
  45% {
    transform: rotate(-45deg) scale(1.15);
    opacity: 1;
  }
  55%, 65% {
    transform: rotate(-45deg) scale(1);
    opacity: 1;
  }
  80%, 100% {
    transform: rotate(-45deg) scale(0);
    opacity: 0;
  }
}""",
    ),

    # 8. Custom Radio - animated radio button with inner dot scaling
    (
        "Custom Radio",
        "rc-form-radio",
        "forms-inputs",
        "box",
        """\
.rc-form-radio {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-radio::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(99, 102, 241, 0.4);
  background: transparent;
  animation: rcFormRadioOuter 2.4s ease-in-out infinite;
}
.rc-form-radio::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #6366f1;
  transform: scale(0);
  opacity: 0;
  animation: rcFormRadioDot 2.4s ease-in-out infinite 0.1s;
}
@keyframes rcFormRadioOuter {
  0%, 100% {
    border-color: rgba(99, 102, 241, 0.4);
    background: transparent;
    box-shadow: none;
  }
  25% {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  35%, 65% {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  80%, 90% {
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: none;
  }
}
@keyframes rcFormRadioDot {
  0%, 30% {
    transform: scale(0);
    opacity: 0;
  }
  45% {
    transform: scale(1.2);
    opacity: 1;
  }
  55%, 65% {
    transform: scale(1);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(0);
    opacity: 0;
  }
}""",
    ),

    # 9. Search Expand - search input expanding from icon to full width
    (
        "Search Expand",
        "rc-form-search-expand",
        "forms-inputs",
        "box",
        """\
.rc-form-search-expand {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-search-expand::before {
  content: '';
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: rgba(124, 58, 237, 0.12);
  border: 2px solid rgba(124, 58, 237, 0.35);
  animation: rcFormSearchExpand 3s ease-in-out infinite;
}
.rc-form-search-expand::after {
  content: '\\2315';
  position: absolute;
  font-size: 18px;
  color: #a78bfa;
  font-weight: 300;
  animation: rcFormSearchIcon 3s ease-in-out infinite;
}
@keyframes rcFormSearchExpand {
  0%, 5% {
    width: 40px;
    border-radius: 20px;
    border-color: rgba(124, 58, 237, 0.35);
    background: rgba(124, 58, 237, 0.12);
  }
  25%, 65% {
    width: 80%;
    border-radius: 10px;
    border-color: #7c3aed;
    background: rgba(124, 58, 237, 0.08);
    box-shadow: 0 0 16px rgba(124, 58, 237, 0.2);
  }
  85%, 100% {
    width: 40px;
    border-radius: 20px;
    border-color: rgba(124, 58, 237, 0.35);
    background: rgba(124, 58, 237, 0.12);
    box-shadow: none;
  }
}
@keyframes rcFormSearchIcon {
  0%, 5% { transform: translateX(0); }
  25%, 65% { transform: translateX(calc(40% - 10px)); }
  85%, 100% { transform: translateX(0); }
}""",
    ),

    # 10. Underline Draw - underline draws in from center on focus
    (
        "Underline Draw",
        "rc-form-underline-draw",
        "forms-inputs",
        "box",
        """\
.rc-form-underline-draw {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f0b1a;
  border-radius: 12px;
  overflow: hidden;
}
.rc-form-underline-draw::before {
  content: 'Username';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: rgba(167, 139, 250, 0.5);
  position: absolute;
  top: 42%;
  transform: translateY(-50%);
  animation: rcFormUnderlineText 2.8s ease-in-out infinite;
  pointer-events: none;
}
.rc-form-underline-draw::after {
  content: '';
  position: absolute;
  bottom: 36%;
  width: 70%;
  height: 2px;
  background: transparent;
  border-radius: 2px;
  animation: rcFormUnderlineDraw 2.8s ease-in-out infinite;
}
@keyframes rcFormUnderlineText {
  0%, 20% { color: rgba(167, 139, 250, 0.5); }
  35%, 70% { color: #a78bfa; }
  85%, 100% { color: rgba(167, 139, 250, 0.5); }
}
@keyframes rcFormUnderlineDraw {
  0%, 15% {
    background: transparent;
    box-shadow: none;
  }
  30% {
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
    clip-path: inset(0 50% 0 50%);
  }
  45%, 60% {
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
    clip-path: inset(0 0 0 0);
  }
  75% {
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
    clip-path: inset(0 50% 0 50%);
  }
  90%, 100% {
    background: transparent;
    box-shadow: none;
    clip-path: inset(0 50% 0 50%);
  }
}""",
    ),
]