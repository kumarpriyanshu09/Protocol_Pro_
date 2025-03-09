import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps, 
  ActivityIndicator 
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-primary',
      destructive: 'bg-destructive',
      outline: 'border border-input bg-background',
      secondary: 'bg-secondary',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps 
  extends TouchableOpacityProps, 
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const getStylesForVariant = (variant: string = 'default') => {
  switch (variant) {
    case 'destructive':
      return {
        backgroundColor: '#ef4444',
        color: '#ffffff',
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: '#d4d4d8',
        borderWidth: 1,
        color: '#18181b',
      };
    case 'secondary':
      return {
        backgroundColor: '#f4f4f5',
        color: '#18181b',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: '#18181b',
      };
    case 'link':
      return {
        backgroundColor: 'transparent',
        color: '#0891b2',
        textDecorationLine: 'underline',
      };
    default:
      return {
        backgroundColor: '#0891b2',
        color: '#ffffff',
      };
  }
};

const getSizeStyles = (size: string = 'default') => {
  switch (size) {
    case 'sm':
      return {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
      };
    case 'lg':
      return {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
      };
    case 'icon':
      return {
        width: 40,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 0,
        paddingVertical: 0,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      };
    default:
      return {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
      };
  }
};

export const Button = ({
  children,
  variant,
  size,
  isLoading = false,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const variantStyles = getStylesForVariant(variant);
  const sizeStyles = getSizeStyles(size);
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        sizeStyles,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' || variant === 'link' 
            ? '#0891b2' 
            : '#ffffff'} 
        />
      ) : (
        <Text 
          style={[
            styles.text, 
            { color: variantStyles.color },
            disabled && styles.disabledText
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
}); 