// components/atoms/Text.tsx
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  className?: string;
}

export const Text: React.FC<CustomTextProps> = ({ 
  variant = 'body', 
  className = '',
  children,
  ...props 
}) => {
  const variantClasses = {
    title: 'text-2xl font-bold text-gray-900',
    subtitle: 'text-lg font-semibold text-gray-800',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-500',
  };

  return (
    <RNText 
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
};