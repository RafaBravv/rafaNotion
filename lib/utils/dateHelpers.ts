// utils/dateHelpers.ts
import { format, isToday, isTomorrow, isPast, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  if (!isValid(date)) return 'Fecha inválida';
  
  if (isToday(date)) return 'Hoy';
  if (isTomorrow(date)) return 'Mañana';
  
  return format(date, "d 'de' MMMM", { locale: es });
};

export const formatDateTime = (date: Date): string => {
  if (!isValid(date)) return 'Fecha inválida';
  return format(date, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
};

export const isOverdue = (date: Date): boolean => {
  return isPast(date) && !isToday(date);
};

export const getDateInputValue = (date?: Date): string => {
  if (!date || !isValid(date)) return '';
  return format(date, 'yyyy-MM-dd');
};