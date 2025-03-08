import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}

export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export interface CardTitleProps {
  children: React.ReactNode;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
}

export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ 
  children, 
  variant = 'default', 
  style, 
  ...props 
}: CardProps) => {
  return (
    <View 
      style={[
        styles.card, 
        variant === 'outline' ? styles.cardOutline : styles.cardDefault,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

export const CardHeader = ({ 
  children, 
  style, 
  ...props 
}: CardHeaderProps) => {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
};

export const CardTitle = ({ 
  children 
}: CardTitleProps) => {
  return (
    <Text style={styles.cardTitle}>
      {children}
    </Text>
  );
};

export const CardDescription = ({ 
  children 
}: CardDescriptionProps) => {
  return (
    <Text style={styles.cardDescription}>
      {children}
    </Text>
  );
};

export const CardContent = ({ 
  children, 
  style, 
  ...props 
}: CardContentProps) => {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
};

export const CardFooter = ({ 
  children, 
  style, 
  ...props 
}: CardFooterProps) => {
  return (
    <View style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardDefault: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardOutline: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
  },
  cardDescription: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}); 