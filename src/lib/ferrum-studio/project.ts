/**
 * @module ferrum-studio/project
 * Project and canvas element management utilities.
 * Provides CRUD operations for projects and their elements, including
 * hit-testing, z-ordering, and duplication.
 */

import type {
  StudioProject,
  CanvasElement,
  AnimationTimeline,
  CanvasConfig,
} from './types';

let _idCounter = 0;

/** Generate a unique ID string. */
function uid(): string {
  _idCounter += 1;
  return `fs_${Date.now().toString(36)}_${(_idCounter).toString(36)}`;
}

/** Reset the internal ID counter (exposed for testing). */
export function _resetIdCounter(): void {
  _idCounter = 0;
}

/**
 * Create a new StudioProject with default canvas and timeline.
 * @param name - Project name.
 * @param description - Optional description.
 * @returns A fresh StudioProject instance.
 */
export function createProject(name: string, description?: string): StudioProject {
  const now = new Date().toISOString();
  const canvas: CanvasConfig = {
    width: 1280,
    height: 720,
    background: '#ffffff',
  };
  const timeline: AnimationTimeline = {
    duration: 1000,
    keyframes: [],
    loop: false,
    direction: 'normal',
  };
  return {
    id: uid(),
    name,
    description: description ?? '',
    canvas,
    elements: [],
    timeline,
    tokens: [],
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Add a new element to the project canvas.
 * @param project - Target project (mutated in-place).
 * @param element - Element data without an id.
 * @returns The newly created CanvasElement with a generated id.
 */
export function addElement(
  project: StudioProject,
  element: Omit<CanvasElement, 'id'>,
): CanvasElement {
  const newElement: CanvasElement = {
    ...element,
    id: uid(),
  };
  project.elements.push(newElement);
  project.updatedAt = new Date().toISOString();
  return newElement;
}

/**
 * Remove an element from the project by id.
 * @param project - Target project.
 * @param elementId - The id of the element to remove.
 * @returns A new project with the element removed.
 */
export function removeElement(
  project: StudioProject,
  elementId: string,
): StudioProject {
  return {
    ...project,
    elements: project.elements.filter((el) => el.id !== elementId),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Move an element to a new position.
 * @param project - Target project.
 * @param elementId - The id of the element to move.
 * @param x - New horizontal position.
 * @param y - New vertical position.
 * @returns A new project with the element repositioned.
 */
export function moveElement(
  project: StudioProject,
  elementId: string,
  x: number,
  y: number,
): StudioProject {
  return {
    ...project,
    elements: project.elements.map((el) =>
      el.id === elementId ? { ...el, x, y } : el,
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Resize an element.
 * @param project - Target project.
 * @param elementId - The id of the element to resize.
 * @param width - New width.
 * @param height - New height.
 * @returns A new project with the element resized.
 */
export function resizeElement(
  project: StudioProject,
  elementId: string,
  width: number,
  height: number,
): StudioProject {
  return {
    ...project,
    elements: project.elements.map((el) =>
      el.id === elementId ? { ...el, width, height } : el,
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Retrieve an element by id.
 * @param project - Target project.
 * @param elementId - The id to look up.
 * @returns The matching CanvasElement, or undefined.
 */
export function getElement(
  project: StudioProject,
  elementId: string,
): CanvasElement | undefined {
  return project.elements.find((el) => el.id === elementId);
}

/**
 * Find the topmost element at a given canvas coordinate using bounding-box
 * collision detection. Checks elements in reverse z-order (topmost first).
 * @param project - Target project.
 * @param x - Horizontal canvas coordinate.
 * @param y - Vertical canvas coordinate.
 * @returns The topmost CanvasElement under the point, or undefined.
 */
export function findElementAt(
  project: StudioProject,
  x: number,
  y: number,
): CanvasElement | undefined {
  const sorted = [...project.elements].sort((a, b) => b.zIndex - a.zIndex);
  for (const el of sorted) {
    if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height) {
      return el;
    }
  }
  return undefined;
}

/**
 * Duplicate an element, placing the copy offset by (20, 20).
 * @param project - Target project (mutated in-place).
 * @param elementId - The id of the element to duplicate.
 * @returns The new duplicated CanvasElement, or null if not found.
 */
export function duplicateElement(
  project: StudioProject,
  elementId: string,
): CanvasElement | null {
  const source = getElement(project, elementId);
  if (!source) return null;

  const copy: CanvasElement = {
    ...source,
    id: uid(),
    x: source.x + 20,
    y: source.y + 20,
    props: { ...source.props },
    styles: { ...source.styles },
    children: source.children
      ? source.children.map((child) => ({
          ...child,
          id: uid(),
          props: { ...child.props },
          styles: { ...child.styles },
        }))
      : undefined,
  };

  project.elements.push(copy);
  project.updatedAt = new Date().toISOString();
  return copy;
}

/**
 * Move an element to the top of the z-order stack.
 * @param project - Target project.
 * @param elementId - The id of the element to bring forward.
 * @returns A new project with updated z-indices.
 */
export function bringToFront(
  project: StudioProject,
  elementId: string,
): StudioProject {
  const maxZ = project.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
  return {
    ...project,
    elements: project.elements.map((el) =>
      el.id === elementId ? { ...el, zIndex: maxZ + 1 } : el,
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Move an element to the bottom of the z-order stack.
 * @param project - Target project.
 * @param elementId - The id of the element to send backward.
 * @returns A new project with updated z-indices.
 */
export function sendToBack(
  project: StudioProject,
  elementId: string,
): StudioProject {
  const minZ = project.elements.reduce(
    (min, el) => Math.min(min, el.zIndex),
    Infinity,
  );
  return {
    ...project,
    elements: project.elements.map((el) =>
      el.id === elementId ? { ...el, zIndex: minZ - 1 } : el,
    ),
    updatedAt: new Date().toISOString(),
  };
}
