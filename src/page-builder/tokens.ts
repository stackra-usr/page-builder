/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HeroUI Design Tokens — Extracted from @heroui/styles source
 * Source: .docs/heroui-3/packages/styles/themes/
 * Source: .docs/heroui-native-main/src/styles/
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ── Primitive Colors (shared, do not change between light/dark) ──
export const PRIMITIVE_COLORS = {
  white: "oklch(100% 0 0)",
  black: "oklch(0% 0 0)",
  snow: "oklch(0.9911 0 0)",
  eclipse: "oklch(0.2103 0.0059 285.89)",
} as const;

// ── Semantic Color Tokens ──
export interface SemanticColorSet {
  background: string;
  foreground: string;
  surface: string;
  surfaceForeground: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  overlay: string;
  overlayForeground: string;
  muted: string;
  default: string;
  defaultForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
  border: string;
  separator: string;
  focus: string;
  link: string;
  backdrop: string;
  fieldBackground: string;
  fieldForeground: string;
  fieldPlaceholder: string;
  fieldBorder: string;
  segment: string;
  segmentForeground: string;
}

export const LIGHT_COLORS: SemanticColorSet = {
  background: "oklch(0.9702 0 0)",
  foreground: "oklch(0.2103 0.0059 285.89)",
  surface: "oklch(100% 0 0)",
  surfaceForeground: "oklch(0.2103 0.0059 285.89)",
  surfaceSecondary: "oklch(0.9524 0.0013 286.37)",
  surfaceTertiary: "oklch(0.9373 0.0013 286.37)",
  overlay: "oklch(100% 0 0)",
  overlayForeground: "oklch(0.2103 0.0059 285.89)",
  muted: "oklch(0.5517 0.0138 285.94)",
  default: "oklch(94% 0.001 286.375)",
  defaultForeground: "oklch(0.2103 0.0059 285.89)",
  accent: "oklch(0.6204 0.195 253.83)",
  accentForeground: "oklch(0.9911 0 0)",
  success: "oklch(0.7329 0.1935 150.81)",
  successForeground: "oklch(0.2103 0.0059 285.89)",
  warning: "oklch(0.7819 0.1585 72.33)",
  warningForeground: "oklch(0.2103 0.0059 285.89)",
  danger: "oklch(0.6532 0.2328 25.74)",
  dangerForeground: "oklch(0.9911 0 0)",
  border: "oklch(90% 0.004 286.32)",
  separator: "oklch(92% 0.004 286.32)",
  focus: "oklch(0.6204 0.195 253.83)",
  link: "oklch(0.2103 0.0059 285.89)",
  backdrop: "rgba(0, 0, 0, 0.5)",
  fieldBackground: "oklch(100% 0 0)",
  fieldForeground: "oklch(0.2103 0.0059 285.89)",
  fieldPlaceholder: "oklch(0.5517 0.0138 285.94)",
  fieldBorder: "transparent",
  segment: "oklch(100% 0 0)",
  segmentForeground: "oklch(0.2103 0.0059 285.89)",
};

export const DARK_COLORS: SemanticColorSet = {
  background: "oklch(12% 0.005 285.823)",
  foreground: "oklch(0.9911 0 0)",
  surface: "oklch(0.2103 0.0059 285.89)",
  surfaceForeground: "oklch(0.9911 0 0)",
  surfaceSecondary: "oklch(0.257 0.0037 286.14)",
  surfaceTertiary: "oklch(0.2721 0.0024 247.91)",
  overlay: "oklch(0.2103 0.0059 285.89)",
  overlayForeground: "oklch(0.9911 0 0)",
  muted: "oklch(70.5% 0.015 286.067)",
  default: "oklch(27.4% 0.006 286.033)",
  defaultForeground: "oklch(0.9911 0 0)",
  accent: "oklch(0.6204 0.195 253.83)",
  accentForeground: "oklch(0.9911 0 0)",
  success: "oklch(0.7329 0.1935 150.81)",
  successForeground: "oklch(0.2103 0.0059 285.89)",
  warning: "oklch(0.8203 0.1388 76.34)",
  warningForeground: "oklch(0.2103 0.0059 285.89)",
  danger: "oklch(0.594 0.1967 24.63)",
  dangerForeground: "oklch(0.9911 0 0)",
  border: "oklch(28% 0.006 286.033)",
  separator: "oklch(25% 0.006 286.033)",
  focus: "oklch(0.6204 0.195 253.83)",
  link: "oklch(0.9911 0 0)",
  backdrop: "rgba(0, 0, 0, 0.6)",
  fieldBackground: "oklch(0.2103 0.0059 285.89)",
  fieldForeground: "oklch(0.9911 0 0)",
  fieldPlaceholder: "oklch(70.5% 0.015 286.067)",
  fieldBorder: "transparent",
  segment: "oklch(0.3964 0.01 285.93)",
  segmentForeground: "oklch(0.9911 0 0)",
};

// ── Radius Tokens ──
export const RADIUS_TOKENS = {
  xs: { label: "XS", value: "0.125rem", multiplier: 0.25, px: 2 },
  sm: { label: "SM", value: "0.25rem", multiplier: 0.5, px: 4 },
  md: { label: "MD", value: "0.375rem", multiplier: 0.75, px: 6 },
  lg: { label: "LG", value: "0.5rem", multiplier: 1, px: 8 },
  xl: { label: "XL", value: "0.75rem", multiplier: 1.5, px: 12 },
  "2xl": { label: "2XL", value: "1rem", multiplier: 2, px: 16 },
  "3xl": { label: "3XL", value: "1.5rem", multiplier: 3, px: 24 },
  "4xl": { label: "4XL", value: "2rem", multiplier: 4, px: 32 },
  full: { label: "Full", value: "9999px", multiplier: 0, px: 9999 },
  none: { label: "None", value: "0", multiplier: 0, px: 0 },
} as const;

export type RadiusToken = keyof typeof RADIUS_TOKENS;

// ── Spacing Tokens (based on --spacing: 0.25rem) ──
export const SPACING_TOKENS = {
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// ── Shadow Tokens ──
export const SHADOW_TOKENS = {
  surface: {
    light:
      "0 2px 4px 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.06), 0 0 1px 0 rgba(0,0,0,0.06)",
    dark: "0 0 0 0 transparent inset",
  },
  overlay: {
    light:
      "0 2px 8px 0 rgba(0,0,0,0.06), 0 -6px 12px 0 rgba(0,0,0,0.03), 0 14px 28px 0 rgba(0,0,0,0.08)",
    dark: "0 0 1px 0 rgba(255,255,255,0.3) inset",
  },
  field: {
    light:
      "0 2px 4px 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.06), 0 0 1px 0 rgba(0,0,0,0.06)",
    dark: "0 0 0 0 transparent inset",
  },
} as const;

// ── Easing Tokens ──
export const EASING_TOKENS = {
  smooth: "ease",
  inQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  inCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  inQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
  outQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  outCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  outQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  outQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  outFluid: "cubic-bezier(0.32, 0.72, 0, 1)",
  inOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  inOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
  linear: "linear",
} as const;

// ── Opacity Tokens ──
export const OPACITY_TOKENS = {
  disabled: 0.5,
} as const;

// ── Border Width Tokens ──
export const BORDER_WIDTH_TOKENS = {
  default: "1px",
  field: "0px",
} as const;

// ── Cursor Tokens ──
export const CURSOR_TOKENS = {
  interactive: "pointer",
  disabled: "not-allowed",
} as const;

// ── Skeleton Animation Tokens ──
export const SKELETON_ANIMATION_TOKENS = ["shimmer", "pulse", "none"] as const;
export type SkeletonAnimation = (typeof SKELETON_ANIMATION_TOKENS)[number];
