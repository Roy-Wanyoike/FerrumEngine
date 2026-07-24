export type ZIndexScale = {
  hide: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  popover: number;
  tooltip: number;
  skipLink: number;
};

export const zIndex: ZIndexScale = {
  hide: -1,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  skipLink: 1070,
} as const;