export const Spacing = {
  /** 2 */
  xxs: 2,
  /** 4 */
  xs: 4,
  /** 8 */
  sm: 8,
  /** 12 */
  md: 12,
  /** 16 — padding/margem mais comum */
  lg: 16,
  /** 24 — seções principais */
  xl: 24,
  /** 32 */
  xxl: 32,
  /** 48 — bottom padding de página */
  xxxl: 48,
  /** 64 */
  xxxxl: 64,
  /** 80 */
  xxxxxl: 80,
  /** 100 */
  xxxxxxl: 100,

  /** 1200 - maxWidth */
  maxWidth: 1200,

  absoluteBottomTabBarIOS: {
    position: "absolute",
    bottom: 85,
    left: 0,
    right: 0,
  },
  absoluteBottomTabBarAndroid: {
    position: "absolute",
    bottom: 95,
    left: 0,
    right: 0,
  },
} as const;
