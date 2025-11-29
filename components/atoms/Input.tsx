// components/atoms/Input.tsx
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text 
          variant="caption" 
          className="mb-2 font-medium"
          style={{ color: theme.colors.text }}
        >
          {label}
        </Text>
      )}
      <TextInput
        className={`border rounded-lg px-4 py-3 text-base ${error ? 'border-red-500' : ''} ${className}`}
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: error ? theme.colors.error : theme.colors.border,
          color: theme.colors.text,
        }}
        placeholderTextColor={theme.colors.textTertiary}
        {...props}
      />
      {error && (
        <Text 
          variant="caption" 
          className="mt-1"
          style={{ color: theme.colors.error }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};