// components/atoms/IconButton.tsx
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 24,
  color = '#374151',
  className = '',
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`p-2 rounded-lg active:bg-gray-100 ${className}`}
      {...props}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};