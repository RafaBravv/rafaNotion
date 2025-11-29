// hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  
  return context;
};