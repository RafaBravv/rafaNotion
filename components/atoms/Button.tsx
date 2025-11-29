import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';

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
  const variantClasses = {
    primary: 'bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-600 active:bg-gray-700',
    outline: 'bg-transparent border-2 border-blue-600 active:bg-blue-50',
    ghost: 'bg-transparent active:bg-gray-100',
  };

  const sizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4',
  };

  const textColors = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-blue-600',
    ghost: 'text-gray-700',
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`rounded-xl items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? 'opacity-50' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#fff'} />
      ) : (
        <Text className={`font-semibold ${textColors[variant]}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};