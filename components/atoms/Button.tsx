// components/atoms/Button.tsx
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/hooks/useTheme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          textColor: '#FFFFFF',
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.textSecondary,
          textColor: '#FFFFFF',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
          borderWidth: 2,
          textColor: theme.colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: theme.colors.divider,
          textColor: theme.colors.textSecondary,
        };
    }
  };

  const sizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4',
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      className={`rounded-lg items-center justify-center ${sizeClasses[size]} ${isDisabled ? 'opacity-50' : ''} ${className}`}
      style={{
        backgroundColor: variantStyles.backgroundColor,
        borderColor: variantStyles.borderColor,
        borderWidth: variantStyles.borderWidth,
      }}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : '#fff'} />
      ) : (
        <Text 
          className="font-semibold"
          style={{ color: variantStyles.textColor }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};