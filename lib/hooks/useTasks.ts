// hooks/useTasks.ts
import { useContext } from 'react';
import { TaskContext } from '../context/tasks/TaskContext';

export const useTasks = () => {
  const context = useContext(TaskContext);
  
  if (!context) {
    throw new Error('useTasks debe ser usado dentro de un TaskProvider');
  }
  
  return context;
};