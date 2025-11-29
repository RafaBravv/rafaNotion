// components/molecules/ThemeToggle.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/hooks/useTheme';
import { Text } from '../atoms/Text';

export const ThemeToggle: React.FC = () => {
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="flex-row items-center px-4 py-3 rounded-lg active:opacity-70"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <View className="flex-row items-center flex-1">
        <Ionicons
          name={themeMode === 'dark' ? 'moon' : 'sunny'}
          size={24}
          color={theme.colors.primary}
        />
        <Text
          variant="body"
          className="ml-3"
          style={{ color: theme.colors.text }}
        >
          {themeMode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.textTertiary}
      />
    </TouchableOpacity>
  );
};