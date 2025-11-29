// context/theme.constants.ts
import { Theme } from '../../types/ThemeContext.types';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    // Fondos
    background: '#F9FAFB',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    layout: "dark",
    
    // Texto
    text: '#111827',
    textSecondary: '#4B5563',
    textTertiary: '#9CA3AF',
    
    // Primarios
    primary: '#2563EB',
    primaryLight: '#3B82F6',
    primaryDark: '#1D4ED8',
    
    // Estados
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Bordes y divisores
    border: '#E5E7EB',
    divider: '#F3F4F6',
    
    // Prioridades de tareas
    priorityLow: '#059669',
    priorityLowBg: '#D1FAE5',
    priorityMedium: '#D97706',
    priorityMediumBg: '#FEF3C7',
    priorityHigh: '#DC2626',
    priorityHighBg: '#FEE2E2',
    
    // Estados de tareas
    statusPending: '#9CA3AF',
    statusInProgress: '#F59E0B',
    statusCompleted: '#10B981',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    // Fondos
    background: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    layout: "light",
    
    // Texto
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textTertiary: '#64748B',
    
    // Primarios
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#2563EB',
    
    // Estados
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    
    // Bordes y divisores
    border: '#475569',
    divider: '#334155',
    
    // Prioridades de tareas
    priorityLow: '#34D399',
    priorityLowBg: '#064E3B',
    priorityMedium: '#FBBF24',
    priorityMediumBg: '#78350F',
    priorityHigh: '#F87171',
    priorityHighBg: '#7F1D1D',
    
    // Estados de tareas
    statusPending: '#64748B',
    statusInProgress: '#FBBF24',
    statusCompleted: '#34D399',
  },
};