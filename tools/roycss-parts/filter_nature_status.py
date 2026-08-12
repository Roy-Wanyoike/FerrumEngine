"""
RoyCSS Effects Part 8: filter, nature, status
CSS effect tuples: (name, className, category, displayType, cssString)
"""

filter_effects = [
    (
        "Blur In",
        "rc-blur-in",
        "filter",
        "box",
        (
            "@keyframes rc-blur-in {\n"
            "  0% { filter: blur(12px); }\n"
            "  100% { filter: blur(0px); }\n"
            "}\n"
            ".rc-blur-in {\n"
            "  animation: rc-blur-in 0.8s ease-out both;\n"
            "}"
        ),
    ),
    (
        "Blur Out",
        "rc-blur-out",
        "filter",
        "box",
        (
            "@keyframes rc-blur-out {\n"
            "  0% { filter: blur(0px); }\n"
            "  100% { filter: blur(14px); }\n"
            "}\n"
            ".rc-blur-out {\n"
            "  animation: rc-blur-out 0.8s ease-in both;\n"
            "}"
        ),
    ),
    (
        "Grayscale In",
        "rc-grayscale-in",
        "filter",
        "box",
        (
            "@keyframes rc-grayscale-in {\n"
            "  0% { filter: grayscale(1); }\n"
            "  100% { filter: grayscale(0); }\n"
            "}\n"
            ".rc-grayscale-in {\n"
            "  animation: rc-grayscale-in 1s ease-out both;\n"
            "}"
        ),
    ),
    (
        "Grayscale Out",
        "rc-grayscale-out",
        "filter",
        "box",
        (
            "@keyframes rc-grayscale-out {\n"
            "  0% { filter: grayscale(0); }\n"
            "  100% { filter: grayscale(1); }\n"
            "}\n"
            ".rc-grayscale-out {\n"
            "  animation: rc-grayscale-out 1s ease-in both;\n"
            "}"
        ),
    ),
    (
        "Sepia In",
        "rc-sepia-in",
        "filter",
        "box",
        (
            "@keyframes rc-sepia-in {\n"
            "  0% { filter: sepia(1); }\n"
            "  100% { filter: sepia(0); }\n"
            "}\n"
            ".rc-sepia-in {\n"
            "  animation: rc-sepia-in 1.2s ease-out both;\n"
            "}"
        ),
    ),
    (
        "Sepia Out",
        "rc-sepia-out",
        "filter",
        "box",
        (
            "@keyframes rc-sepia-out {\n"
            "  0% { filter: sepia(0); }\n"
            "  100% { filter: sepia(1); }\n"
            "}\n"
            ".rc-sepia-out {\n"
            "  animation: rc-sepia-out 1.2s ease-in both;\n"
            "}"
        ),
    ),
    (
        "Saturate Pulse",
        "rc-saturate-pulse",
        "filter",
        "box",
        (
            "@keyframes rc-saturate-pulse {\n"
            "  0%, 100% { filter: saturate(1); }\n"
            "  50% { filter: saturate(2.5); }\n"
            "}\n"
            ".rc-saturate-pulse {\n"
            "  animation: rc-saturate-pulse 2s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Hue Rotate",
        "rc-hue-rotate",
        "filter",
        "box",
        (
            "@keyframes rc-hue-rotate {\n"
            "  0% { filter: hue-rotate(0deg); }\n"
            "  100% { filter: hue-rotate(360deg); }\n"
            "}\n"
            ".rc-hue-rotate {\n"
            "  animation: rc-hue-rotate 4s linear infinite;\n"
            "}"
        ),
    ),
    (
        "Invert Flash",
        "rc-invert-flash",
        "filter",
        "box",
        (
            "@keyframes rc-invert-flash {\n"
            "  0%, 40%, 60%, 100% { filter: invert(0); }\n"
            "  45%, 55% { filter: invert(1); }\n"
            "}\n"
            ".rc-invert-flash {\n"
            "  animation: rc-invert-flash 2s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Brightness Pulse",
        "rc-brightness-pulse",
        "filter",
        "box",
        (
            "@keyframes rc-brightness-pulse {\n"
            "  0%, 100% { filter: brightness(1); }\n"
            "  50% { filter: brightness(1.4); }\n"
            "}\n"
            ".rc-brightness-pulse {\n"
            "  animation: rc-brightness-pulse 2.5s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Contrast Switch",
        "rc-contrast-switch",
        "filter",
        "box",
        (
            "@keyframes rc-contrast-switch {\n"
            "  0%, 45%, 55%, 100% { filter: contrast(1); }\n"
            "  50% { filter: contrast(1.8); }\n"
            "}\n"
            ".rc-contrast-switch {\n"
            "  animation: rc-contrast-switch 3s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Vintage",
        "rc-vintage",
        "filter",
        "box",
        (
            "@keyframes rc-vintage {\n"
            "  0%, 100% {\n"
            "    filter: sepia(0.5) contrast(1.1) brightness(0.95);\n"
            "  }\n"
            "  50% {\n"
            "    filter: sepia(0.7) contrast(1.15) brightness(0.85);\n"
            "  }\n"
            "}\n"
            ".rc-vintage {\n"
            "  animation: rc-vintage 4s ease-in-out infinite;\n"
            "}"
        ),
    ),
]

nature_effects = [
    (
        "Rain",
        "rc-rain",
        "nature",
        "bg",
        (
            "@keyframes rc-rain-fall {\n"
            "  0% { transform: translateY(-100%); }\n"
            "  100% { transform: translateY(100vh); }\n"
            "}\n"
            ".rc-rain {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%);\n"
            "}\n"
            ".rc-rain::before,\n"
            ".rc-rain::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: -100%;\n"
            "  width: 2px;\n"
            "  height: 80px;\n"
            "  background: linear-gradient(to bottom, transparent, rgba(174, 194, 224, 0.5), transparent);\n"
            "  border-radius: 0 0 2px 2px;\n"
            "}\n"
            ".rc-rain::before {\n"
            "  left: 15%;\n"
            "  box-shadow:\n"
            "    80px 0 rgba(174, 194, 224, 0.4),\n"
            "    160px 0 rgba(174, 194, 224, 0.3),\n"
            "    240px 0 rgba(174, 194, 224, 0.5),\n"
            "    320px 0 rgba(174, 194, 224, 0.2),\n"
            "    400px 0 rgba(174, 194, 224, 0.4),\n"
            "    480px 0 rgba(174, 194, 224, 0.3),\n"
            "    560px 0 rgba(174, 194, 224, 0.5),\n"
            "    640px 0 rgba(174, 194, 224, 0.2),\n"
            "    720px 0 rgba(174, 194, 224, 0.4),\n"
            "    800px 0 rgba(174, 194, 224, 0.3);\n"
            "  animation: rc-rain-fall 0.7s linear infinite;\n"
            "}\n"
            ".rc-rain::after {\n"
            "  left: 45%;\n"
            "  box-shadow:\n"
            "    60px 0 rgba(174, 194, 224, 0.3),\n"
            "    140px 0 rgba(174, 194, 224, 0.5),\n"
            "    220px 0 rgba(174, 194, 224, 0.2),\n"
            "    300px 0 rgba(174, 194, 224, 0.4),\n"
            "    380px 0 rgba(174, 194, 224, 0.3),\n"
            "    460px 0 rgba(174, 194, 224, 0.5),\n"
            "    540px 0 rgba(174, 194, 224, 0.2),\n"
            "    620px 0 rgba(174, 194, 224, 0.4),\n"
            "    700px 0 rgba(174, 194, 224, 0.3),\n"
            "    780px 0 rgba(174, 194, 224, 0.5);\n"
            "  animation: rc-rain-fall 0.9s linear infinite;\n"
            "  animation-delay: -0.3s;\n"
            "}"
        ),
    ),
    (
        "Snow",
        "rc-snow",
        "nature",
        "bg",
        (
            "@keyframes rc-snow-fall {\n"
            "  0% { transform: translateY(-10%) translateX(0); opacity: 1; }\n"
            "  50% { transform: translateY(50vh) translateX(20px); opacity: 0.8; }\n"
            "  100% { transform: translateY(100vh) translateX(-10px); opacity: 0; }\n"
            "}\n"
            ".rc-snow {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #2c3e6b 0%, #4a6fa1 40%, #6b8cae 100%);\n"
            "}\n"
            ".rc-snow::before,\n"
            ".rc-snow::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: -5%;\n"
            "  width: 6px;\n"
            "  height: 6px;\n"
            "  background: white;\n"
            "  border-radius: 50%;\n"
            "  opacity: 0.9;\n"
            "  box-shadow:\n"
            "    30px 15px 0 1px rgba(255,255,255,0.7),\n"
            "    70px 40px 0 2px rgba(255,255,255,0.5),\n"
            "    120px 10px 0 0px rgba(255,255,255,0.8),\n"
            "    180px 60px 0 1px rgba(255,255,255,0.4),\n"
            "    240px 25px 0 2px rgba(255,255,255,0.6),\n"
            "    300px 50px 0 0px rgba(255,255,255,0.7),\n"
            "    370px 5px 0 1px rgba(255,255,255,0.5),\n"
            "    440px 35px 0 2px rgba(255,255,255,0.3),\n"
            "    520px 55px 0 0px rgba(255,255,255,0.6),\n"
            "    600px 20px 0 1px rgba(255,255,255,0.8);\n"
            "}\n"
            ".rc-snow::before {\n"
            "  left: 10%;\n"
            "  animation: rc-snow-fall 4s linear infinite;\n"
            "}\n"
            ".rc-snow::after {\n"
            "  left: 55%;\n"
            "  box-shadow:\n"
            "    40px 30px 0 1px rgba(255,255,255,0.6),\n"
            "    90px 10px 0 2px rgba(255,255,255,0.4),\n"
            "    150px 45px 0 0px rgba(255,255,255,0.7),\n"
            "    210px 20px 0 1px rgba(255,255,255,0.5),\n"
            "    280px 55px 0 2px rgba(255,255,255,0.3),\n"
            "    350px 15px 0 0px rgba(255,255,255,0.8),\n"
            "    420px 40px 0 1px rgba(255,255,255,0.6),\n"
            "    500px 8px 0 2px rgba(255,255,255,0.4),\n"
            "    570px 50px 0 0px rgba(255,255,255,0.7),\n"
            "    650px 28px 0 1px rgba(255,255,255,0.5);\n"
            "  animation: rc-snow-fall 5s linear infinite;\n"
            "  animation-delay: -2s;\n"
            "}"
        ),
    ),
    (
        "Lightning",
        "rc-lightning",
        "nature",
        "bg",
        (
            "@keyframes rc-lightning-flash {\n"
            "  0%, 88%, 92%, 96%, 100% { opacity: 0; }\n"
            "  89% { opacity: 0.8; }\n"
            "  91% { opacity: 0.1; }\n"
            "  93% { opacity: 0.6; }\n"
            "  95% { opacity: 0; }\n"
            "}\n"
            ".rc-lightning {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #1a1a2e 0%, #2d2d44 100%);\n"
            "}\n"
            ".rc-lightning::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(200,200,255,0.4) 30%, transparent 70%);\n"
            "  opacity: 0;\n"
            "  animation: rc-lightning-flash 6s ease-in-out infinite;\n"
            "}\n"
            ".rc-lightning::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: 48%;\n"
            "  width: 4%;\n"
            "  height: 100%;\n"
            "  background: linear-gradient(to bottom,\n"
            "    transparent 5%,\n"
            "    rgba(180,180,255,0.9) 10%,\n"
            "    transparent 12%,\n"
            "    rgba(200,200,255,0.7) 20%,\n"
            "    transparent 22%,\n"
            "    rgba(180,180,255,0.8) 35%,\n"
            "    transparent 37%,\n"
            "    rgba(200,200,255,0.6) 50%,\n"
            "    transparent 52%,\n"
            "    rgba(180,180,255,0.7) 65%,\n"
            "    transparent 67%,\n"
            "    rgba(200,200,255,0.5) 80%,\n"
            "    transparent 82%\n"
            "  );\n"
            "  opacity: 0;\n"
            "  animation: rc-lightning-flash 6s ease-in-out infinite;\n"
            "  animation-delay: 0.05s;\n"
            "}"
        ),
    ),
    (
        "Clouds",
        "rc-clouds",
        "nature",
        "bg",
        (
            "@keyframes rc-cloud-drift-1 {\n"
            "  0% { transform: translateX(-120%); }\n"
            "  100% { transform: translateX(calc(100vw + 50%)); }\n"
            "}\n"
            "@keyframes rc-cloud-drift-2 {\n"
            "  0% { transform: translateX(calc(100vw + 30%)); }\n"
            "  100% { transform: translateX(-150%); }\n"
            "}\n"
            ".rc-clouds {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #87CEEB 0%, #b0d4e8 60%, #d4e8f0 100%);\n"
            "}\n"
            ".rc-clouds::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 15%;\n"
            "  left: -150px;\n"
            "  width: 180px;\n"
            "  height: 60px;\n"
            "  background: rgba(255,255,255,0.9);\n"
            "  border-radius: 50px;\n"
            "  box-shadow:\n"
            "    -25px -20px 0 10px rgba(255,255,255,0.9),\n"
            "    30px -15px 0 15px rgba(255,255,255,0.85),\n"
            "    70px -10px 0 5px rgba(255,255,255,0.9),\n"
            "    -60px -5px 0 8px rgba(255,255,255,0.8);\n"
            "  animation: rc-cloud-drift-1 20s linear infinite;\n"
            "}\n"
            ".rc-clouds::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 35%;\n"
            "  left: -120px;\n"
            "  width: 140px;\n"
            "  height: 45px;\n"
            "  background: rgba(255,255,255,0.75);\n"
            "  border-radius: 40px;\n"
            "  box-shadow:\n"
            "    -20px -18px 0 8px rgba(255,255,255,0.75),\n"
            "    25px -12px 0 12px rgba(255,255,255,0.7),\n"
            "    60px -8px 0 4px rgba(255,255,255,0.75);\n"
            "  animation: rc-cloud-drift-2 25s linear infinite;\n"
            "}"
        ),
    ),
    (
        "Fireflies",
        "rc-fireflies",
        "nature",
        "bg",
        (
            "@keyframes rc-firefly-1 {\n"
            "  0%, 100% { transform: translate(0, 0); opacity: 0.2; }\n"
            "  20% { transform: translate(30px, -40px); opacity: 1; }\n"
            "  40% { transform: translate(-20px, -60px); opacity: 0.3; }\n"
            "  60% { transform: translate(40px, -20px); opacity: 0.9; }\n"
            "  80% { transform: translate(-10px, -50px); opacity: 0.4; }\n"
            "}\n"
            "@keyframes rc-firefly-2 {\n"
            "  0%, 100% { transform: translate(0, 0); opacity: 0.5; }\n"
            "  25% { transform: translate(-35px, -25px); opacity: 0.2; }\n"
            "  50% { transform: translate(20px, -55px); opacity: 1; }\n"
            "  75% { transform: translate(-15px, -35px); opacity: 0.3; }\n"
            "}\n"
            ".rc-fireflies {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #0d1b0e 0%, #1a2f1a 50%, #0d1b0e 100%);\n"
            "}\n"
            ".rc-fireflies::before,\n"
            ".rc-fireflies::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  width: 4px;\n"
            "  height: 4px;\n"
            "  background: #e8ff6b;\n"
            "  border-radius: 50%;\n"
            "  box-shadow:\n"
            "    0 0 6px 2px rgba(232,255,107,0.6),\n"
            "    0 0 12px 4px rgba(232,255,107,0.3);\n"
            "}\n"
            ".rc-fireflies::before {\n"
            "  top: 30%;\n"
            "  left: 20%;\n"
            "  box-shadow:\n"
            "    0 0 6px 2px rgba(232,255,107,0.6),\n"
            "    0 0 12px 4px rgba(232,255,107,0.3),\n"
            "    120px 40px 0 1px rgba(232,255,107,0.8),\n"
            "    120px 40px 6px 3px rgba(232,255,107,0.4),\n"
            "    250px -30px 0 0px rgba(232,255,107,0.6),\n"
            "    250px -30px 6px 2px rgba(232,255,107,0.3),\n"
            "    400px 60px 0 1px rgba(232,255,107,0.7),\n"
            "    400px 60px 6px 3px rgba(232,255,107,0.35),\n"
            "    550px -10px 0 0px rgba(232,255,107,0.5),\n"
            "    550px -10px 6px 2px rgba(232,255,107,0.25);\n"
            "  animation: rc-firefly-1 6s ease-in-out infinite;\n"
            "}\n"
            ".rc-fireflies::after {\n"
            "  top: 55%;\n"
            "  left: 40%;\n"
            "  box-shadow:\n"
            "    0 0 6px 2px rgba(232,255,107,0.5),\n"
            "    0 0 12px 4px rgba(232,255,107,0.25),\n"
            "    100px -50px 0 1px rgba(232,255,107,0.7),\n"
            "    100px -50px 6px 3px rgba(232,255,107,0.35),\n"
            "    220px 30px 0 0px rgba(232,255,107,0.6),\n"
            "    220px 30px 6px 2px rgba(232,255,107,0.3),\n"
            "    380px -40px 0 1px rgba(232,255,107,0.8),\n"
            "    380px -40px 6px 3px rgba(232,255,107,0.4),\n"
            "    500px 50px 0 0px rgba(232,255,107,0.5),\n"
            "    500px 50px 6px 2px rgba(232,255,107,0.25);\n"
            "  animation: rc-firefly-2 8s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Ocean Waves",
        "rc-ocean-waves",
        "nature",
        "bg",
        (
            "@keyframes rc-wave-1 {\n"
            "  0%, 100% { transform: translateX(0) translateY(0); }\n"
            "  50% { transform: translateX(-25%) translateY(5px); }\n"
            "}\n"
            "@keyframes rc-wave-2 {\n"
            "  0%, 100% { transform: translateX(0) translateY(0); }\n"
            "  50% { transform: translateX(25%) translateY(-5px); }\n"
            "}\n"
            ".rc-ocean-waves {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #1a3a5c 0%, #2a6496 40%, #3a8fd4 100%);\n"
            "}\n"
            ".rc-ocean-waves::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 0;\n"
            "  left: -50%;\n"
            "  width: 200%;\n"
            "  height: 50%;\n"
            "  background: radial-gradient(ellipse at 25% 100%, rgba(58,143,212,0.6) 0%, transparent 50%),\n"
            "              radial-gradient(ellipse at 75% 100%, rgba(58,143,212,0.4) 0%, transparent 50%);\n"
            "  border-radius: 40% 40% 0 0 / 30% 30% 0 0;\n"
            "  animation: rc-wave-1 5s ease-in-out infinite;\n"
            "}\n"
            ".rc-ocean-waves::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: -5%;\n"
            "  left: -50%;\n"
            "  width: 200%;\n"
            "  height: 45%;\n"
            "  background: radial-gradient(ellipse at 30% 100%, rgba(42,100,150,0.7) 0%, transparent 50%),\n"
            "              radial-gradient(ellipse at 70% 100%, rgba(42,100,150,0.5) 0%, transparent 50%);\n"
            "  border-radius: 45% 45% 0 0 / 25% 25% 0 0;\n"
            "  animation: rc-wave-2 6s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Sunset",
        "rc-sunset",
        "nature",
        "bg",
        (
            "@keyframes rc-sunset-glow {\n"
            "  0%, 100% {\n"
            "    background: linear-gradient(to bottom,\n"
            "      #1a0533 0%, #4a1942 20%, #c94b4b 45%,\n"
            "      #f09819 65%, #ff512f 80%, #dd2476 100%);\n"
            "  }\n"
            "  50% {\n"
            "    background: linear-gradient(to bottom,\n"
            "      #0d0221 0%, #2a0845 20%, #6441a5 35%,\n"
            "      #e85d75 55%, #f5af19 75%, #f12711 100%);\n"
            "  }\n"
            "}\n"
            ".rc-sunset {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  animation: rc-sunset-glow 8s ease-in-out infinite;\n"
            "  background: linear-gradient(to bottom,\n"
            "    #1a0533 0%, #4a1942 20%, #c94b4b 45%,\n"
            "    #f09819 65%, #ff512f 80%, #dd2476 100%);\n"
            "}\n"
            ".rc-sunset::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 15%;\n"
            "  left: 50%;\n"
            "  transform: translateX(-50%);\n"
            "  width: 80px;\n"
            "  height: 80px;\n"
            "  background: radial-gradient(circle, #fff6a0 0%, #f5af19 40%, rgba(245,175,25,0) 70%);\n"
            "  border-radius: 50%;\n"
            "  box-shadow: 0 0 60px 30px rgba(245,175,25,0.3), 0 0 120px 60px rgba(255,81,47,0.15);\n"
            "}\n"
            ".rc-sunset::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 0;\n"
            "  left: 0;\n"
            "  right: 0;\n"
            "  height: 20%;\n"
            "  background: linear-gradient(to bottom, rgba(13,2,33,0) 0%, rgba(13,2,33,0.7) 100%);\n"
            "}"
        ),
    ),
    (
        "Northern Lights",
        "rc-northern-lights",
        "nature",
        "bg",
        (
            "@keyframes rc-aurora-shift {\n"
            "  0%, 100% {\n"
            "    background: linear-gradient(135deg,\n"
            "      rgba(0,20,40,1) 0%,\n"
            "      rgba(0,100,80,0.4) 20%,\n"
            "      rgba(0,200,150,0.3) 35%,\n"
            "      rgba(100,0,200,0.2) 50%,\n"
            "      rgba(0,150,100,0.3) 65%,\n"
            "      rgba(0,20,40,1) 100%);\n"
            "  }\n"
            "  33% {\n"
            "    background: linear-gradient(120deg,\n"
            "      rgba(0,20,40,1) 0%,\n"
            "      rgba(50,0,150,0.3) 25%,\n"
            "      rgba(0,220,180,0.4) 40%,\n"
            "      rgba(0,100,200,0.3) 55%,\n"
            "      rgba(80,0,180,0.2) 70%,\n"
            "      rgba(0,20,40,1) 100%);\n"
            "  }\n"
            "  66% {\n"
            "    background: linear-gradient(150deg,\n"
            "      rgba(0,20,40,1) 0%,\n"
            "      rgba(0,180,120,0.3) 15%,\n"
            "      rgba(120,0,220,0.3) 30%,\n"
            "      rgba(0,200,160,0.4) 50%,\n"
            "      rgba(0,80,180,0.3) 70%,\n"
            "      rgba(0,20,40,1) 100%);\n"
            "  }\n"
            "}\n"
            ".rc-northern-lights {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  animation: rc-aurora-shift 10s ease-in-out infinite;\n"
            "  background: #001428;\n"
            "}\n"
            ".rc-northern-lights::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background:\n"
            "    radial-gradient(ellipse 120% 40% at 30% 30%, rgba(0,200,150,0.15) 0%, transparent 100%),\n"
            "    radial-gradient(ellipse 100% 30% at 70% 25%, rgba(100,0,200,0.1) 0%, transparent 100%),\n"
            "    radial-gradient(ellipse 80% 35% at 50% 40%, rgba(0,150,200,0.12) 0%, transparent 100%);\n"
            "  animation: rc-aurora-shift 10s ease-in-out infinite;\n"
            "  animation-delay: -3s;\n"
            "}"
        ),
    ),
    (
        "Fog",
        "rc-fog",
        "nature",
        "bg",
        (
            "@keyframes rc-fog-drift-1 {\n"
            "  0%, 100% { transform: translateX(-5%); opacity: 0.5; }\n"
            "  50% { transform: translateX(5%); opacity: 0.8; }\n"
            "}\n"
            "@keyframes rc-fog-drift-2 {\n"
            "  0%, 100% { transform: translateX(5%); opacity: 0.4; }\n"
            "  50% { transform: translateX(-8%); opacity: 0.7; }\n"
            "}\n"
            ".rc-fog {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: linear-gradient(to bottom, #8e9eab 0%, #b8c6d0 50%, #a8b8c2 100%);\n"
            "}\n"
            ".rc-fog::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: -10%;\n"
            "  width: 120%;\n"
            "  height: 60%;\n"
            "  background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 60%),\n"
            "              radial-gradient(ellipse at 60% 60%, rgba(255,255,255,0.4) 0%, transparent 50%),\n"
            "              radial-gradient(ellipse at 90% 40%, rgba(255,255,255,0.35) 0%, transparent 55%);\n"
            "  animation: rc-fog-drift-1 8s ease-in-out infinite;\n"
            "}\n"
            ".rc-fog::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 0;\n"
            "  left: -10%;\n"
            "  width: 120%;\n"
            "  height: 55%;\n"
            "  background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.45) 0%, transparent 55%),\n"
            "              radial-gradient(ellipse at 70% 40%, rgba(255,255,255,0.5) 0%, transparent 60%),\n"
            "              radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.3) 0%, transparent 50%);\n"
            "  animation: rc-fog-drift-2 10s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Stars Twinkle",
        "rc-stars-twinkle",
        "nature",
        "bg",
        (
            "@keyframes rc-twinkle-1 {\n"
            "  0%, 100% { opacity: 0.3; }\n"
            "  50% { opacity: 1; }\n"
            "}\n"
            "@keyframes rc-twinkle-2 {\n"
            "  0%, 100% { opacity: 0.6; }\n"
            "  30% { opacity: 0.2; }\n"
            "  70% { opacity: 1; }\n"
            "}\n"
            ".rc-stars-twinkle {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  background: #0a0a1a;\n"
            "}\n"
            ".rc-stars-twinkle::before,\n"
            ".rc-stars-twinkle::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  width: 2px;\n"
            "  height: 2px;\n"
            "  background: white;\n"
            "  border-radius: 50%;\n"
            "  box-shadow:\n"
            "    40px 20px 0 0 rgba(255,255,255,0.8),\n"
            "    100px 60px 0 1px rgba(255,255,255,0.6),\n"
            "    170px 15px 0 0 rgba(255,255,255,0.9),\n"
            "    230px 80px 0 0px rgba(255,255,255,0.5),\n"
            "    300px 30px 0 1px rgba(255,255,255,0.7),\n"
            "    380px 70px 0 0px rgba(255,255,255,0.8),\n"
            "    450px 10px 0 0px rgba(255,255,255,0.6),\n"
            "    520px 55px 0 1px rgba(255,255,255,0.9),\n"
            "    590px 40px 0 0px rgba(255,255,255,0.5),\n"
            "    670px 25px 0 1px rgba(255,255,255,0.7),\n"
            "    740px 65px 0 0px rgba(255,255,255,0.8),\n"
            "    810px 45px 0 0px rgba(255,255,255,0.6),\n"
            "    880px 5px 0 1px rgba(255,255,255,0.9),\n"
            "    950px 75px 0 0px rgba(255,255,255,0.5),\n"
            "    1020px 35px 0 0px rgba(255,255,255,0.7);\n"
            "}\n"
            ".rc-stars-twinkle::before {\n"
            "  top: 10%;\n"
            "  left: 5%;\n"
            "  animation: rc-twinkle-1 3s ease-in-out infinite;\n"
            "}\n"
            ".rc-stars-twinkle::after {\n"
            "  top: 40%;\n"
            "  left: 8%;\n"
            "  box-shadow:\n"
            "    50px 40px 0 1px rgba(255,255,255,0.7),\n"
            "    120px 10px 0 0px rgba(255,255,255,0.9),\n"
            "    190px 55px 0 0px rgba(255,255,255,0.5),\n"
            "    260px 25px 0 1px rgba(255,255,255,0.8),\n"
            "    330px 65px 0 0px rgba(255,255,255,0.6),\n"
            "    410px 5px 0 0px rgba(255,255,255,0.9),\n"
            "    480px 50px 0 1px rgba(255,255,255,0.7),\n"
            "    560px 20px 0 0px rgba(255,255,255,0.8),\n"
            "    630px 70px 0 0px rgba(255,255,255,0.5),\n"
            "    700px 35px 0 1px rgba(255,255,255,0.9),\n"
            "    780px 15px 0 0px rgba(255,255,255,0.6),\n"
            "    850px 60px 0 0px rgba(255,255,255,0.8),\n"
            "    930px 30px 0 1px rgba(255,255,255,0.7),\n"
            "    1000px 50px 0 0px rgba(255,255,255,0.5),\n"
            "    1070px 10px 0 0px rgba(255,255,255,0.9);\n"
            "  animation: rc-twinkle-2 4s ease-in-out infinite;\n"
            "}"
        ),
    ),
]

status_effects = [
    (
        "Status Pulse Green",
        "rc-status-pulse-green",
        "status",
        "box",
        (
            "@keyframes rc-pulse-ring-green {\n"
            "  0% { transform: scale(0.8); opacity: 1; }\n"
            "  100% { transform: scale(2.5); opacity: 0; }\n"
            "}\n"
            ".rc-status-pulse-green {\n"
            "  position: relative;\n"
            "  width: 14px;\n"
            "  height: 14px;\n"
            "}\n"
            ".rc-status-pulse-green::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: #22c55e;\n"
            "  border-radius: 50%;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-status-pulse-green::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: #22c55e;\n"
            "  border-radius: 50%;\n"
            "  animation: rc-pulse-ring-green 1.5s ease-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Pulse Red",
        "rc-status-pulse-red",
        "status",
        "box",
        (
            "@keyframes rc-pulse-ring-red {\n"
            "  0% { transform: scale(0.8); opacity: 1; }\n"
            "  100% { transform: scale(2.5); opacity: 0; }\n"
            "}\n"
            ".rc-status-pulse-red {\n"
            "  position: relative;\n"
            "  width: 14px;\n"
            "  height: 14px;\n"
            "}\n"
            ".rc-status-pulse-red::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: #ef4444;\n"
            "  border-radius: 50%;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-status-pulse-red::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: #ef4444;\n"
            "  border-radius: 50%;\n"
            "  animation: rc-pulse-ring-red 1.5s ease-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Pulse Yellow",
        "rc-status-pulse-yellow",
        "status",
        "box",
        (
            "@keyframes rc-pulse-ring-yellow {\n"
            "  0% { transform: scale(0.8); opacity: 1; }\n"
            "  100% { transform: scale(2.5); opacity: 0; }\n"
            "}\n"
            ".rc-status-pulse-yellow {\n"
            "  position: relative;\n"
            "  width: 14px;\n"
            "  height: 14px;\n"
            "}\n"
            ".rc-status-pulse-yellow::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: #eab308;\n"
            "  border-radius: 50%;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-status-pulse-yellow::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  background: #eab308;\n"
            "  border-radius: 50%;\n"
            "  animation: rc-pulse-ring-yellow 1.5s ease-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Breathing Blue",
        "rc-status-breathing-blue",
        "status",
        "box",
        (
            "@keyframes rc-breathe-blue {\n"
            "  0%, 100% {\n"
            "    box-shadow: 0 0 4px 1px rgba(59,130,246,0.3);\n"
            "    background: #3b82f6;\n"
            "  }\n"
            "  50% {\n"
            "    box-shadow: 0 0 16px 6px rgba(59,130,246,0.5), 0 0 32px 12px rgba(59,130,246,0.15);\n"
            "    background: #60a5fa;\n"
            "  }\n"
            "}\n"
            ".rc-status-breathing-blue {\n"
            "  width: 14px;\n"
            "  height: 14px;\n"
            "  border-radius: 50%;\n"
            "  background: #3b82f6;\n"
            "  animation: rc-breathe-blue 3s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Progress Ring",
        "rc-status-progress-ring",
        "status",
        "box",
        (
            "@keyframes rc-progress-spin {\n"
            "  0% { transform: rotate(0deg); }\n"
            "  100% { transform: rotate(360deg); }\n"
            "}\n"
            ".rc-status-progress-ring {\n"
            "  position: relative;\n"
            "  width: 32px;\n"
            "  height: 32px;\n"
            "  border-radius: 50%;\n"
            "  background: conic-gradient(\n"
            "    #3b82f6 0deg,\n"
            "    #3b82f6 270deg,\n"
            "    rgba(59,130,246,0.15) 270deg,\n"
            "    rgba(59,130,246,0.15) 360deg\n"
            "  );\n"
            "  animation: rc-progress-spin 2s linear infinite;\n"
            "}\n"
            ".rc-status-progress-ring::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 3px;\n"
            "  border-radius: 50%;\n"
            "  background: #1e293b;\n"
            "}"
        ),
    ),
    (
        "Status Loading Bar",
        "rc-status-loading-bar",
        "status",
        "box",
        (
            "@keyframes rc-loading-slide {\n"
            "  0% { transform: translateX(-100%); }\n"
            "  50% { transform: translateX(0%); }\n"
            "  100% { transform: translateX(100%); }\n"
            "}\n"
            "@keyframes rc-loading-bg-pulse {\n"
            "  0%, 100% { opacity: 0.3; }\n"
            "  50% { opacity: 0.5; }\n"
            "}\n"
            ".rc-status-loading-bar {\n"
            "  position: relative;\n"
            "  width: 120px;\n"
            "  height: 4px;\n"
            "  background: rgba(59,130,246,0.2);\n"
            "  border-radius: 4px;\n"
            "  overflow: hidden;\n"
            "  animation: rc-loading-bg-pulse 2s ease-in-out infinite;\n"
            "}\n"
            ".rc-status-loading-bar::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: 50%;\n"
            "  width: 50%;\n"
            "  height: 100%;\n"
            "  background: linear-gradient(90deg, transparent, #3b82f6, transparent);\n"
            "  border-radius: 4px;\n"
            "  animation: rc-loading-slide 1.5s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Notification Badge",
        "rc-status-notification-badge",
        "status",
        "box",
        (
            "@keyframes rc-badge-bounce {\n"
            "  0%, 100% { transform: scale(1); }\n"
            "  30% { transform: scale(1.25); }\n"
            "  50% { transform: scale(0.95); }\n"
            "  70% { transform: scale(1.1); }\n"
            "}\n"
            "@keyframes rc-badge-ring {\n"
            "  0% { transform: scale(1); opacity: 0.6; }\n"
            "  100% { transform: scale(2); opacity: 0; }\n"
            "}\n"
            ".rc-status-notification-badge {\n"
            "  position: relative;\n"
            "  width: 20px;\n"
            "  height: 20px;\n"
            "  background: #ef4444;\n"
            "  border-radius: 50%;\n"
            "  animation: rc-badge-bounce 1.5s ease-in-out infinite;\n"
            "}\n"
            ".rc-status-notification-badge::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 0;\n"
            "  border: 2px solid #ef4444;\n"
            "  border-radius: 50%;\n"
            "  animation: rc-badge-ring 1.5s ease-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Dot Bounce",
        "rc-status-dot-bounce",
        "status",
        "box",
        (
            "@keyframes rc-dot-bounce {\n"
            "  0%, 80%, 100% { transform: translateY(0); }\n"
            "  40% { transform: translateY(-10px); }\n"
            "}\n"
            ".rc-status-dot-bounce {\n"
            "  position: relative;\n"
            "  width: 40px;\n"
            "  height: 14px;\n"
            "  display: flex;\n"
            "  align-items: center;\n"
            "  gap: 6px;\n"
            "}\n"
            ".rc-status-dot-bounce::before {\n"
            "  content: '';\n"
            "  display: inline-block;\n"
            "  width: 8px;\n"
            "  height: 8px;\n"
            "  background: #3b82f6;\n"
            "  border-radius: 50%;\n"
            "  box-shadow:\n"
            "    14px 0 0 0 #3b82f6,\n"
            "    28px 0 0 0 #3b82f6;\n"
            "  animation: rc-dot-bounce 1.4s ease-in-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Signal Wave",
        "rc-status-signal-wave",
        "status",
        "box",
        (
            "@keyframes rc-signal-expand {\n"
            "  0% { transform: scale(0.5); opacity: 1; }\n"
            "  100% { transform: scale(2.5); opacity: 0; }\n"
            "}\n"
            ".rc-status-signal-wave {\n"
            "  position: relative;\n"
            "  width: 24px;\n"
            "  height: 24px;\n"
            "}\n"
            ".rc-status-signal-wave::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 50%;\n"
            "  left: 50%;\n"
            "  width: 8px;\n"
            "  height: 8px;\n"
            "  margin: -4px 0 0 -4px;\n"
            "  background: #22c55e;\n"
            "  border-radius: 50%;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-status-signal-wave::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 50%;\n"
            "  left: 50%;\n"
            "  width: 8px;\n"
            "  height: 8px;\n"
            "  margin: -4px 0 0 -4px;\n"
            "  border: 2px solid #22c55e;\n"
            "  border-radius: 50%;\n"
            "  animation: rc-signal-expand 2s ease-out infinite;\n"
            "}"
        ),
    ),
    (
        "Status Heartbeat",
        "rc-status-heartbeat",
        "status",
        "box",
        (
            "@keyframes rc-heart-beat {\n"
            "  0%, 100% { transform: scale(1); }\n"
            "  14% { transform: scale(1.3); }\n"
            "  28% { transform: scale(1); }\n"
            "  42% { transform: scale(1.2); }\n"
            "  56% { transform: scale(1); }\n"
            "}\n"
            ".rc-status-heartbeat {\n"
            "  position: relative;\n"
            "  width: 20px;\n"
            "  height: 18px;\n"
            "}\n"
            ".rc-status-heartbeat::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: 50%;\n"
            "  width: 10px;\n"
            "  height: 16px;\n"
            "  background: #ef4444;\n"
            "  border-radius: 10px 10px 0 0;\n"
            "  transform: translateX(-50%) rotate(-45deg);\n"
            "  transform-origin: 0 100%;\n"
            "  animation: rc-heart-beat 1.5s ease-in-out infinite;\n"
            "}\n"
            ".rc-status-heartbeat::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  right: 50%;\n"
            "  width: 10px;\n"
            "  height: 16px;\n"
            "  background: #ef4444;\n"
            "  border-radius: 10px 10px 0 0;\n"
            "  transform: translateX(50%) rotate(45deg);\n"
            "  transform-origin: 100% 100%;\n"
            "  animation: rc-heart-beat 1.5s ease-in-out infinite;\n"
            "}"
        ),
    ),
]