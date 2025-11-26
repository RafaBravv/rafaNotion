// components/atoms/Input.tsx
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Text } from './Text';

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
  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text variant="caption" className="mb-2 font-medium text-gray-700">
          {label}
        </Text>
      )}
      <TextInput
        className={`border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 bg-white ${error ? 'border-red-500' : 'focus:border-blue-500'} ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text variant="caption" className="mt-1 text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
};