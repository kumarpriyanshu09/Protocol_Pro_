export const colors = {
  primary: '#0891b2',
  primaryDark: '#0e7490',
  primaryLight: '#22d3ee',
  secondary: '#f4f4f5',
  secondaryDark: '#e4e4e7',
  secondaryLight: '#fafafa',
  background: '#ffffff',
  foreground: '#18181b',
  muted: '#71717a',
  mutedLight: '#a1a1aa',
  border: '#d4d4d8',
  borderLight: '#e4e4e7',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  black: '#000000',
  white: '#ffffff',
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const theme = {
  colors,
  spacing,
  fontSizes,
  fontWeights,
  radii,
  shadows,
}; 