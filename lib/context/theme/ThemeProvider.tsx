// context/ThemeProvider.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { ThemeMode, Theme } from '@/lib/types/ThemeContext.types';
import { lightTheme, darkTheme } from './theme.constants';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  const theme: Theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    setThemeModeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  // Sincronizar con el tema del sistema si cambia
  useEffect(() => {
    if (systemColorScheme) {
      setThemeModeState(systemColorScheme as ThemeMode);
    }
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};