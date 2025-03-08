import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
}

export const Text = ({
  variant = 'body',
  weight = 'normal',
  style,
  children,
  ...props
}: TextProps) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        styles[`weight${weight.charAt(0).toUpperCase() + weight.slice(1)}`],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#18181b',
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  muted: {
    fontSize: 14,
    lineHeight: 20,
    color: '#71717a',
  },
  weightNormal: {
    fontWeight: '400',
  },
  weightMedium: {
    fontWeight: '500',
  },
  weightSemibold: {
    fontWeight: '600',
  },
  weightBold: {
    fontWeight: '700',
  },
}); 