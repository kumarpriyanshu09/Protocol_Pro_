// Core utilities and business logic
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Constants
export const APP_NAME = 'Protocol Pro';
export const APP_VERSION = '1.0.0'; 