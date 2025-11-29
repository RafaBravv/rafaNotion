// context/ThemeContext.tsx
import { createContext } from 'react';
import { ThemeContextType } from '@/lib/types/ThemeContext.types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);