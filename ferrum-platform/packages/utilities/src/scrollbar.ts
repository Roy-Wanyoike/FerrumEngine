/**
 * Custom scrollbar utility classes
 */

export const scrollbarCSS = `
/* ===== Ferrum Scrollbar Utilities ===== */

/* === Thin Scrollbar (WebKit) === */
.fr-scrollbar-thin::-webkit-scrollbar {
  width: var(--ferrum-scrollbar-width, 6px);
  height: var(--ferrum-scrollbar-height, 6px);
}

.fr-scrollbar-thin::-webkit-scrollbar-track {
  background: var(--ferrum-scrollbar-track, transparent);
  border-radius: 9999px;
}

.fr-scrollbar-thin::-webkit-scrollbar-thumb {
  background: var(--ferrum-scrollbar-thumb, var(--ferrum-colors-muted-foreground, #cbd5e1));
  border-radius: 9999px;
  border: 2px solid var(--ferrum-scrollbar-track, transparent);
  background-clip: content-box;
}

.fr-scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: var(--ferrum-scrollbar-thumb-hover, var(--ferrum-colors-foreground, #94a3b8));
  background-clip: content-box;
}

.fr-scrollbar-thin::-webkit-scrollbar-corner {
  background: transparent;
}

/* Thin Scrollbar (Firefox) */
.fr-scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--ferrum-scrollbar-thumb, var(--ferrum-colors-muted-foreground, #cbd5e1))
                    var(--ferrum-scrollbar-track, transparent);
}

/* === No Scrollbar (WebKit) === */
.fr-scrollbar-none::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* No Scrollbar (Firefox) */
.fr-scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* === Default Scrollbar (WebKit) === */
.fr-scrollbar-default::-webkit-scrollbar {
  width: var(--ferrum-scrollbar-width, 12px);
  height: var(--ferrum-scrollbar-height, 12px);
}

.fr-scrollbar-default::-webkit-scrollbar-track {
  background: var(--ferrum-scrollbar-track, var(--ferrum-colors-muted, #f1f5f9));
  border-radius: 9999px;
}

.fr-scrollbar-default::-webkit-scrollbar-thumb {
  background: var(--ferrum-scrollbar-thumb, var(--ferrum-colors-muted-foreground, #cbd5e1));
  border-radius: 9999px;
  border: 3px solid var(--ferrum-scrollbar-track, var(--ferrum-colors-muted, #f1f5f9));
  background-clip: content-box;
}

.fr-scrollbar-default::-webkit-scrollbar-thumb:hover {
  background: var(--ferrum-scrollbar-thumb-hover, var(--ferrum-colors-foreground, #94a3b8));
  background-clip: content-box;
}

.fr-scrollbar-default::-webkit-scrollbar-corner {
  background: var(--ferrum-scrollbar-track, var(--ferrum-colors-muted, #f1f5f9));
}

/* Default Scrollbar (Firefox) */
.fr-scrollbar-default {
  scrollbar-width: auto;
  scrollbar-color: var(--ferrum-scrollbar-thumb, var(--ferrum-colors-muted-foreground, #cbd5e1))
                    var(--ferrum-scrollbar-track, var(--ferrum-colors-muted, #f1f5f9));
}
`.trim();