import { StyleSheet } from 'react-native';
import { theme } from '../theme';

/**
 * Utility function to create responsive styles
 */
export const createStyles = (
  styleCreator: (theme: typeof theme) => ReturnType<typeof StyleSheet.create>
) => {
  return StyleSheet.create(styleCreator(theme));
};

/**
 * Utility function to merge classNames (similar to clsx/classnames)
 */
export const cn = (...classNames: (string | undefined | null | false)[]) => {
  return classNames.filter(Boolean).join(' ');
};

/**
 * Utility function to handle responsive spacing
 */
export const getSpacing = (value: keyof typeof theme.spacing | number) => {
  if (typeof value === 'number') {
    return value;
  }
  return theme.spacing[value] || 0;
};

/**
 * Utility function to handle responsive font sizes
 */
export const getFontSize = (value: keyof typeof theme.fontSizes | number) => {
  if (typeof value === 'number') {
    return value;
  }
  return theme.fontSizes[value] || theme.fontSizes.md;
};

/**
 * Utility function to handle responsive radii
 */
export const getRadius = (value: keyof typeof theme.radii | number) => {
  if (typeof value === 'number') {
    return value;
  }
  return theme.radii[value] || theme.radii.md;
}; 