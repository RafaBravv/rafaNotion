// components/atoms/DateInput.tsx
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/hooks/useTheme';
import { DatePicker } from '../molecules/DatePicker';
import { formatDate } from '@/lib/utils/dateHelpers';
import { Ionicons } from '@expo/vector-icons';

interface DateInputProps {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  error?: string;
  containerClassName?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  error,
  containerClassName = '',
}) => {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateSelect = (date: Date) => {
    onChange(date);
  };

  const handleClear = () => {
    onChange(undefined);
  };

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
      
      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-between border rounded-lg px-4 py-3"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.error : theme.colors.border,
          }}
          onPress={() => setShowPicker(true)}
        >
          <View className="flex-row items-center flex-1">
            <Ionicons 
              name="calendar-outline" 
              size={20} 
              color={value ? theme.colors.primary : theme.colors.textTertiary} 
            />
            <Text 
              className="ml-2"
              style={{ 
                color: value ? theme.colors.text : theme.colors.textTertiary 
              }}
            >
              {value ? formatDate(value) : placeholder}
            </Text>
          </View>
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color={theme.colors.textSecondary} 
          />
        </TouchableOpacity>

        {value && (
          <TouchableOpacity
            className="items-center justify-center w-12 border rounded-lg"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
            onPress={handleClear}
          >
            <Ionicons 
              name="close" 
              size={20} 
              color={theme.colors.error} 
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text 
          variant="caption" 
          className="mt-1"
          style={{ color: theme.colors.error }}
        >
          {error}
        </Text>
      )}

      <DatePicker
        visible={showPicker}
        selectedDate={value}
        onDateSelect={handleDateSelect}
        onClose={() => setShowPicker(false)}
      />
    </View>
  );
};