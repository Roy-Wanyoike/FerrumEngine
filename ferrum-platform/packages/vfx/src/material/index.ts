export function generateMaterialCSS(prefix = "fr-"): string {
  return `@layer ferrum.vfx {
/* ── fx-material-metal ── */
.${prefix}fx-material-metal {
  background: linear-gradient(
    180deg,
    #b8b8b8 0%,
    #d4d4d4 15%,
    #a0a0a0 30%,
    #c8c8c8 45%,
    #909090 55%,
    #b0b0b0 70%,
    #a8a8a8 85%,
    #c0c0c0 100%
  );
}

/* ── fx-material-chrome ── */
.${prefix}fx-material-chrome {
  background: linear-gradient(
    180deg,
    #e8e8e8 0%,
    #ffffff 20%,
    #a0a0a0 35%,
    #f0f0f0 50%,
    #888888 60%,
    #e0e0e0 75%,
    #b0b0b0 85%,
    #f5f5f5 100%
  );
}

/* ── fx-material-gold ── */
.${prefix}fx-material-gold {
  background: linear-gradient(
    160deg,
    #f5d485 0%,
    #fceabb 15%,
    #d4a843 30%,
    #f7e098 45%,
    #c4952e 55%,
    #f0d68a 70%,
    #b8860b 85%,
    #fceabb 100%
  );
}

/* ── fx-material-wood ── */
.${prefix}fx-material-wood {
  background:
    repeating-linear-gradient(
      85deg,
      rgba(120, 80, 40, 0.7) 0px,
      rgba(140, 95, 50, 0.5) 3px,
      rgba(110, 70, 35, 0.6) 6px,
      rgba(130, 85, 45, 0.5) 9px,
      rgba(100, 65, 30, 0.7) 12px
    ),
    linear-gradient(
      0deg,
      #5c3a1e 0%,
      #7a4f2b 30%,
      #6b4423 60%,
      #8b5e3c 100%
    );
}

/* ── fx-material-marble ── */
.${prefix}fx-material-marble {
  background:
    radial-gradient(ellipse 80% 30% at 20% 30%, rgba(180, 180, 190, 0.5) 0%, transparent 70%),
    radial-gradient(ellipse 60% 20% at 70% 60%, rgba(170, 170, 185, 0.4) 0%, transparent 70%),
    radial-gradient(ellipse 40% 15% at 40% 80%, rgba(175, 175, 188, 0.45) 0%, transparent 70%),
    radial-gradient(ellipse 50% 25% at 85% 20%, rgba(165, 165, 180, 0.35) 0%, transparent 70%),
    linear-gradient(180deg, #e8e4e0 0%, #f0ece8 30%, #e5e0db 60%, #edeae6 100%);
}

/* ── fx-material-carbon ── */
.${prefix}fx-material-carbon {
  background:
    repeating-linear-gradient(
      45deg,
      rgba(30, 30, 30, 1) 0px,
      rgba(40, 40, 40, 1) 2px,
      rgba(25, 25, 25, 1) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(35, 35, 35, 1) 0px,
      rgba(45, 45, 45, 1) 2px,
      rgba(30, 30, 30, 1) 4px
    );
}

/* ── fx-material-fabric ── */
.${prefix}fx-material-fabric {
  background:
    repeating-linear-gradient(
      0deg,
      rgba(100, 80, 70, 0.3) 0px,
      transparent 1px,
      transparent 3px,
      rgba(100, 80, 70, 0.3) 4px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(100, 80, 70, 0.25) 0px,
      transparent 1px,
      transparent 3px,
      rgba(100, 80, 70, 0.25) 4px
    ),
    linear-gradient(135deg, #8b7d6b 0%, #a09080 50%, #8b7d6b 100%);
}

/* ── fx-material-paper ── */
.${prefix}fx-material-paper {
  background: linear-gradient(
    160deg,
    #faf6f0 0%,
    #f5efe5 25%,
    #faf8f4 50%,
    #f2ece0 75%,
    #f8f4ee 100%
  );
}

/* ── fx-material-concrete ── */
.${prefix}fx-material-concrete {
  background:
    radial-gradient(circle 2px at 10% 15%, rgba(150, 150, 150, 0.3) 0%, transparent 100%),
    radial-gradient(circle 3px at 30% 40%, rgba(120, 120, 120, 0.2) 0%, transparent 100%),
    radial-gradient(circle 2px at 50% 20%, rgba(140, 140, 140, 0.25) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 70% 60%, rgba(130, 130, 130, 0.3) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 85% 30%, rgba(145, 145, 145, 0.2) 0%, transparent 100%),
    radial-gradient(circle 1px at 20% 70%, rgba(135, 135, 135, 0.25) 0%, transparent 100%),
    radial-gradient(circle 2px at 60% 80%, rgba(125, 125, 125, 0.3) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 90% 85%, rgba(140, 140, 140, 0.2) 0%, transparent 100%),
    linear-gradient(180deg, #a0a0a0 0%, #909090 30%, #959595 60%, #8a8a8a 100%);
  background-size:
    40px 40px,
    50px 50px,
    35px 35px,
    45px 45px,
    55px 55px,
    30px 30px,
    48px 48px,
    42px 42px,
    100% 100%;
}

/* ── fx-material-leather ── */
.${prefix}fx-material-leather {
  background:
    radial-gradient(ellipse 60% 40% at 30% 30%, rgba(80, 50, 30, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse 50% 35% at 70% 60%, rgba(90, 55, 35, 0.25) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 50% 80%, rgba(70, 45, 25, 0.2) 0%, transparent 70%),
    linear-gradient(180deg, #4a2c17 0%, #5c3820 25%, #4e3119 50%, #654321 75%, #4a2c17 100%);
}

/* ── fx-material-ice ── */
.${prefix}fx-material-ice {
  background:
    linear-gradient(
      125deg,
      transparent 35%,
      rgba(255, 255, 255, 0.4) 40%,
      rgba(255, 255, 255, 0.6) 42%,
      rgba(255, 255, 255, 0.4) 44%,
      transparent 49%
    ),
    linear-gradient(
      180deg,
      #d8eef8 0%,
      #c5e3f5 20%,
      #b8daf2 40%,
      #cce8f7 60%,
      #b0d5ee 80%,
      #d0eaf8 100%
    );
}

/* ── fx-material-silver ── */
.${prefix}fx-material-silver {
  background: linear-gradient(
    175deg,
    #c0c0c8 0%,
    #e0e0e8 12%,
    #a8a8b0 25%,
    #d0d0d8 38%,
    #909098 48%,
    #b8b8c0 60%,
    #a0a0a8 72%,
    #d8d8e0 85%,
    #b0b0b8 100%
  );
}

/* ── fx-material-copper ── */
.${prefix}fx-material-copper {
  background: linear-gradient(
    165deg,
    #d4875e 0%,
    #e8a878 12%,
    #b87333 28%,
    #daa06d 42%,
    #c07840 55%,
    #e0a070 68%,
    #b06830 82%,
    #d49060 100%
  );
}

/* ── fx-material-stone ── */
.${prefix}fx-material-stone {
  background:
    radial-gradient(circle 2px at 8% 15%, rgba(100, 95, 90, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 22% 40%, rgba(110, 105, 95, 0.35) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 38% 20%, rgba(95, 90, 85, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 52% 65%, rgba(105, 100, 90, 0.3) 0%, transparent 100%),
    radial-gradient(circle 2px at 68% 35%, rgba(100, 95, 88, 0.35) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 82% 70%, rgba(115, 110, 100, 0.4) 0%, transparent 100%),
    radial-gradient(circle 2px at 92% 25%, rgba(98, 93, 87, 0.35) 0%, transparent 100%),
    radial-gradient(circle 1px at 15% 80%, rgba(108, 103, 95, 0.3) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 45% 50%, rgba(102, 97, 90, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 75% 85%, rgba(112, 107, 98, 0.35) 0%, transparent 100%),
    linear-gradient(180deg, #8a8580 0%, #9a9590 25%, #8f8a85 50%, #958f88 75%, #8a8580 100%);
  background-size:
    35px 35px, 40px 40px, 30px 30px, 45px 45px,
    38px 38px, 42px 42px, 36px 36px, 48px 48px,
    32px 32px, 44px 44px, 100% 100%;
}

/* ── fx-material-plastic ── */
.${prefix}fx-material-plastic {
  background: linear-gradient(
    160deg,
    #f0f0f2 0%,
    #e8e8ec 20%,
    #dcdce2 35%,
    #eaeaf0 45%,
    #d8d8e0 55%,
    #f2f2f6 65%,
    #e0e0e6 80%,
    #ececf0 100%
  );
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* ── fx-material-ceramic ── */
.${prefix}fx-material-ceramic {
  background:
    linear-gradient(
      125deg,
      transparent 30%,
      rgba(255, 255, 255, 0.15) 42%,
      rgba(255, 255, 255, 0.3) 44%,
      rgba(255, 255, 255, 0.15) 46%,
      transparent 58%
    ),
    linear-gradient(
      180deg,
      #f5f0eb 0%,
      #ece5dd 20%,
      #f0ebe4 40%,
      #e8e0d8 60%,
      #f2ede6 80%,
      #ebe4dc 100%
    );
}

/* ── fx-material-brushed-steel ── */
.${prefix}fx-material-brushed-steel {
  background:
    repeating-linear-gradient(
      90deg,
      rgba(160, 160, 170, 0.0) 0px,
      rgba(180, 180, 190, 0.08) 1px,
      rgba(140, 140, 150, 0.05) 2px,
      rgba(170, 170, 180, 0.0) 3px
    ),
    linear-gradient(
      180deg,
      #b0b0b8 0%,
      #c8c8d0 20%,
      #a8a8b0 40%,
      #c0c0c8 55%,
      #b8b8c0 70%,
      #a0a0a8 85%,
      #c5c5cd 100%
    );
}

/* ── fx-material-copper-patina ── */
.${prefix}fx-material-copper-patina {
  background:
    radial-gradient(ellipse 40% 30% at 25% 30%, rgba(80, 160, 120, 0.35) 0%, transparent 70%),
    radial-gradient(ellipse 35% 25% at 65% 55%, rgba(70, 150, 110, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse 30% 20% at 45% 75%, rgba(90, 170, 130, 0.25) 0%, transparent 70%),
    radial-gradient(ellipse 25% 30% at 80% 20%, rgba(75, 155, 115, 0.3) 0%, transparent 70%),
    linear-gradient(
      165deg,
      #b87333 0%,
      #c88340 15%,
      #a06830 30%,
      #d09555 45%,
      #b07035 60%,
      #c88848 75%,
      #a56530 90%,
      #c08040 100%
    );
}

/* ── fx-material-rust ── */
.${prefix}fx-material-rust {
  background:
    radial-gradient(circle 3px at 10% 20%, rgba(120, 50, 20, 0.5) 0%, transparent 100%),
    radial-gradient(circle 2px at 30% 45%, rgba(140, 60, 25, 0.4) 0%, transparent 100%),
    radial-gradient(circle 3.5px at 50% 15%, rgba(110, 45, 18, 0.5) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 70% 60%, rgba(130, 55, 22, 0.45) 0%, transparent 100%),
    radial-gradient(circle 2px at 85% 30%, rgba(145, 65, 28, 0.4) 0%, transparent 100%),
    radial-gradient(circle 3px at 20% 75%, rgba(115, 48, 20, 0.5) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 60% 80%, rgba(135, 58, 24, 0.45) 0%, transparent 100%),
    radial-gradient(circle 2px at 90% 85%, rgba(125, 52, 21, 0.4) 0%, transparent 100%),
    linear-gradient(180deg, #8b4513 0%, #a0522d 25%, #8b4513 50%, #994420 75%, #8b4513 100%);
  background-size:
    50px 50px, 45px 45px, 55px 55px, 40px 40px,
    48px 48px, 52px 52px, 42px 42px, 46px 46px,
    100% 100%;
}

/* ── fx-material-obsidian ── */
.${prefix}fx-material-obsidian {
  background:
    linear-gradient(
      130deg,
      transparent 35%,
      rgba(255, 255, 255, 0.25) 42%,
      rgba(255, 255, 255, 0.5) 44%,
      rgba(255, 255, 255, 0.25) 46%,
      transparent 53%
    ),
    linear-gradient(
      180deg,
      #1a1a2e 0%,
      #16213e 20%,
      #0f0f1a 40%,
      #1a1a30 55%,
      #0d0d18 70%,
      #151528 85%,
      #0a0a15 100%
    );
}

/* ── fx-material-cork ── */
.${prefix}fx-material-cork {
  background:
    radial-gradient(circle 1.5px at 8% 12%, rgba(120, 90, 50, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 18% 28%, rgba(130, 100, 55, 0.35) 0%, transparent 100%),
    radial-gradient(circle 2px at 30% 8%, rgba(115, 85, 45, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 42% 38%, rgba(125, 95, 52, 0.35) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 55% 18%, rgba(120, 88, 48, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 65% 42%, rgba(130, 100, 55, 0.35) 0%, transparent 100%),
    radial-gradient(circle 2px at 78% 22%, rgba(115, 85, 45, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 88% 35%, rgba(125, 92, 50, 0.35) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 12% 55%, rgba(120, 90, 50, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 35% 62%, rgba(130, 98, 53, 0.35) 0%, transparent 100%),
    radial-gradient(circle 2px at 50% 50%, rgba(118, 86, 47, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 72% 58%, rgba(128, 96, 54, 0.35) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 22% 78%, rgba(122, 90, 50, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 60% 75%, rgba(132, 100, 56, 0.35) 0%, transparent 100%),
    radial-gradient(circle 2px at 85% 68%, rgba(116, 84, 46, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 45% 88%, rgba(126, 94, 52, 0.35) 0%, transparent 100%),
    linear-gradient(180deg, #c4a46c 0%, #d4b87c 25%, #c8a870 50%, #d0b078 75%, #c4a46c 100%);
  background-size:
    25px 25px, 20px 20px, 28px 28px, 22px 22px,
    26px 26px, 24px 24px, 30px 30px, 20px 20px,
    25px 25px, 22px 22px, 28px 28px, 24px 24px,
    26px 26px, 20px 20px, 30px 30px, 22px 22px,
    100% 100%;
}
}`;
}