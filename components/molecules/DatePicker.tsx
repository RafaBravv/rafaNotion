// components/molecules/DatePicker.tsx
import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { useTheme } from '@/lib/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

interface DatePickerProps {
  visible: boolean;
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  visible,
  selectedDate,
  onDateSelect,
  onClose,
}) => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Años en orden ascendente desde 2025 hasta 2035 (10 años al futuro)
  const currentYear = 2025;
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const handleDayPress = (day: any) => {
    const selected = new Date(day.dateString);
    setCurrentDate(selected);
  };

  const handleMonthChange = (month: any) => {
    // Actualiza currentDate cuando el usuario desliza el calendario
    const newDate = new Date(month.dateString);
    setCurrentDate(newDate);
  };

  const handleConfirm = () => {
    onDateSelect(currentDate);
    onClose();
  };

  const formattedDate = currentDate.toISOString().split('T')[0];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View 
          className="w-11/12 rounded-2xl p-4 shadow-2xl"
          style={{ backgroundColor: theme.colors.surface }}
        >
          {/* Header con selectores */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text 
                variant="subtitle"
                style={{ color: theme.colors.text }}
              >
                Seleccionar Fecha
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Selectores de Mes y Año */}
            <View className="flex-row gap-2">
              {/* Selector de Mes */}
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-between p-3 rounded-lg border"
                style={{ 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border 
                }}
                onPress={() => {
                  setShowMonthPicker(!showMonthPicker);
                  setShowYearPicker(false);
                }}
              >
                <Text style={{ color: theme.colors.text }}>
                  {months[currentDate.getMonth()]}
                </Text>
                <Ionicons 
                  name={showMonthPicker ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={theme.colors.textSecondary} 
                />
              </TouchableOpacity>

              {/* Selector de Año */}
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-between p-3 rounded-lg border"
                style={{ 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border 
                }}
                onPress={() => {
                  setShowYearPicker(!showYearPicker);
                  setShowMonthPicker(false);
                }}
              >
                <Text style={{ color: theme.colors.text }}>
                  {currentDate.getFullYear()}
                </Text>
                <Ionicons 
                  name={showYearPicker ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={theme.colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            {/* Lista desplegable de Meses */}
            {showMonthPicker && (
              <ScrollView 
                className="max-h-48 mt-2 rounded-lg border"
                style={{ 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border 
                }}
              >
                {months.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-3 border-b"
                    style={{ 
                      borderBottomColor: theme.colors.divider,
                      backgroundColor: currentDate.getMonth() === index 
                        ? theme.colors.primaryLight + '20' 
                        : 'transparent'
                    }}
                    onPress={() => handleMonthSelect(index)}
                  >
                    <Text 
                      style={{ 
                        color: currentDate.getMonth() === index 
                          ? theme.colors.primary 
                          : theme.colors.text 
                      }}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Lista desplegable de Años (orden ascendente 2025-2035) */}
            {showYearPicker && (
              <ScrollView 
                className="max-h-48 mt-2 rounded-lg border"
                style={{ 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border 
                }}
              >
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    className="p-3 border-b"
                    style={{ 
                      borderBottomColor: theme.colors.divider,
                      backgroundColor: currentDate.getFullYear() === year 
                        ? theme.colors.primaryLight + '20' 
                        : 'transparent'
                    }}
                    onPress={() => handleYearSelect(year)}
                  >
                    <Text 
                      style={{ 
                        color: currentDate.getFullYear() === year 
                          ? theme.colors.primary 
                          : theme.colors.text 
                      }}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Calendario con navegación por flechas */}
          {!showMonthPicker && !showYearPicker && (
            <View style={{ borderRadius: 12, overflow: 'hidden' }}>
              <Calendar
                current={formattedDate}
                onDayPress={handleDayPress}
                onMonthChange={handleMonthChange}
                enableSwipeMonths={false}
                hideExtraDays={true}
                markedDates={{
                  [formattedDate]: {
                    selected: true,
                    selectedColor: theme.colors.primary,
                  }
                }}
                minDate="2025-01-01"
                maxDate="2035-12-31"
                theme={{
                  backgroundColor: theme.colors.surface,
                  calendarBackground: theme.colors.surface,
                  textSectionTitleColor: theme.colors.textSecondary,
                  selectedDayBackgroundColor: theme.colors.primary,
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: theme.colors.primary,
                  dayTextColor: theme.colors.text,
                  textDisabledColor: theme.colors.textTertiary,
                  monthTextColor: theme.colors.text,
                  arrowColor: theme.colors.primary,
                  textDayFontSize: 16,
                  textMonthFontSize: 18,
                  textDayHeaderFontSize: 14,
                }}
                style={{
                  width: '100%',
                }}
              />
            </View>
          )}

          {/* Botones */}
          <View className="flex-row gap-2 mt-4">
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onClose}
              className="flex-1"
            />
            <Button
              title="Confirmar"
              onPress={handleConfirm}
              className="flex-1"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};