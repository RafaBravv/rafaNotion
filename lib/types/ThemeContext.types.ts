// context/ThemeContext.types.ts
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Fondos
  background: string;
  surface: string;
  card: string;
  layout: string;
  
  // Texto
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Primarios
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Estados
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Bordes y divisores
  border: string;
  divider: string;
  
  // Prioridades de tareas
  priorityLow: string;
  priorityLowBg: string;
  priorityMedium: string;
  priorityMediumBg: string;
  priorityHigh: string;
  priorityHighBg: string;
  
  // Estados de tareas
  statusPending: string;
  statusInProgress: string;
  statusCompleted: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}