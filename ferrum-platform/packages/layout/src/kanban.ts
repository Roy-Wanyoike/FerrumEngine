export function generateKanbanCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}kanban {
    display: flex;
    gap: var(--ferrum-kanban-gap, 16px);
    padding: var(--ferrum-kanban-padding, 24px);
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--ferrum-kanban-scrollbar-thumb, #d1d5db) transparent;
  }

  ${prefix}kanban::-webkit-scrollbar {
    height: 8px;
  }

  ${prefix}kanban::-webkit-scrollbar-track {
    background: transparent;
  }

  ${prefix}kanban::-webkit-scrollbar-thumb {
    background: var(--ferrum-kanban-scrollbar-thumb, #d1d5db);
    border-radius: 4px;
  }

  ${prefix}kanban-column {
    display: flex;
    flex-direction: column;
    min-width: var(--ferrum-kanban-column-width, 300px);
    max-width: var(--ferrum-kanban-column-max-width, 340px);
    width: var(--ferrum-kanban-column-width, 300px);
    flex-shrink: 0;
    background: var(--ferrum-kanban-column-bg, #f1f5f9);
    border-radius: var(--ferrum-kanban-column-radius, 12px);
    max-height: calc(100% - var(--ferrum-kanban-padding, 24px) * 2);
    scroll-snap-align: start;
    transition: box-shadow 0.2s ease;
  }

  ${prefix}kanban-column--drag-over {
    box-shadow: 0 0 0 2px var(--ferrum-kanban-column-highlight, #818cf8);
  }

  ${prefix}kanban-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 12px;
    flex-shrink: 0;
  }

  ${prefix}kanban-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--ferrum-kanban-header-fg, #334155);
    letter-spacing: -0.01em;
  }

  ${prefix}kanban-header-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    background: var(--ferrum-kanban-count-bg, #e2e8f0);
    color: var(--ferrum-kanban-count-fg, #475569);
  }

  ${prefix}kanban-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  ${prefix}kanban-header-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;
    color: var(--ferrum-kanban-action-fg, #94a3b8);
    transition: background 0.15s ease, color 0.15s ease;
    border: none;
    background: none;
  }

  ${prefix}kanban-header-action:hover {
    background: var(--ferrum-kanban-action-hover-bg, #e2e8f0);
    color: var(--ferrum-kanban-action-hover-fg, #334155);
  }

  ${prefix}kanban-cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 12px 12px;
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: var(--ferrum-kanban-scrollbar-thumb, #d1d5db) transparent;
    min-height: 8px;
  }

  ${prefix}kanban-cards::-webkit-scrollbar {
    width: 6px;
  }

  ${prefix}kanban-cards::-webkit-scrollbar-track {
    background: transparent;
  }

  ${prefix}kanban-cards::-webkit-scrollbar-thumb {
    background: var(--ferrum-kanban-scrollbar-thumb, #d1d5db);
    border-radius: 3px;
  }

  ${prefix}kanban-card {
    background: var(--ferrum-kanban-card-bg, #ffffff);
    border-radius: var(--ferrum-kanban-card-radius, 10px);
    padding: var(--ferrum-kanban-card-padding, 14px);
    box-shadow: var(--ferrum-kanban-card-shadow, 0 1px 3px rgba(0, 0, 0, 0.08));
    cursor: grab;
    transition: box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
    position: relative;
  }

  ${prefix}kanban-card:hover {
    box-shadow: var(--ferrum-kanban-card-hover-shadow, 0 4px 12px rgba(0, 0, 0, 0.1));
    transform: translateY(-1px);
  }

  ${prefix}kanban-card--dragging {
    opacity: 0.5;
    transform: rotate(2deg);
    cursor: grabbing;
  }

  ${prefix}kanban-card-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--ferrum-kanban-card-fg, #1e293b);
    line-height: 1.4;
    margin-bottom: 8px;
  }

  ${prefix}kanban-card-description {
    font-size: 13px;
    color: var(--ferrum-kanban-card-desc-fg, #64748b);
    line-height: 1.5;
    margin-bottom: 12px;
  }

  ${prefix}kanban-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  ${prefix}kanban-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  ${prefix}kanban-card-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
  }

  ${prefix}kanban-card-avatars {
    display: flex;
    margin-left: auto;
  }

  ${prefix}kanban-card-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid var(--ferrum-kanban-card-bg, #ffffff);
    margin-left: -6px;
    object-fit: cover;
  }

  ${prefix}kanban-card-avatar:first-child {
    margin-left: 0;
  }

  ${prefix}kanban-add-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    margin: 0 12px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--ferrum-kanban-add-fg, #64748b);
    cursor: pointer;
    border: 1px dashed var(--ferrum-kanban-add-border, #cbd5e1);
    background: transparent;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    flex-shrink: 0;
  }

  ${prefix}kanban-add-card:hover {
    background: var(--ferrum-kanban-add-hover-bg, #e2e8f0);
    color: var(--ferrum-kanban-add-hover-fg, #334155);
    border-color: var(--ferrum-kanban-add-hover-border, #94a3b8);
  }

  /* Color-coded columns */
  ${prefix}kanban-column--blue ${prefix}kanban-header { border-top: 3px solid #3b82f6; border-radius: 12px 12px 0 0; }
  ${prefix}kanban-column--green ${prefix}kanban-header { border-top: 3px solid #22c55e; border-radius: 12px 12px 0 0; }
  ${prefix}kanban-column--red ${prefix}kanban-header { border-top: 3px solid #ef4444; border-radius: 12px 12px 0 0; }
  ${prefix}kanban-column--yellow ${prefix}kanban-header { border-top: 3px solid #eab308; border-radius: 12px 12px 0 0; }
  ${prefix}kanban-column--purple ${prefix}kanban-header { border-top: 3px solid #8b5cf6; border-radius: 12px 12px 0 0; }

  /* Mobile */
  @media (max-width: 640px) {
    ${prefix}kanban {
      padding: 16px;
      gap: 12px;
    }

    ${prefix}kanban-column {
      min-width: 280px;
      width: 280px;
    }
  }
}
`;
}