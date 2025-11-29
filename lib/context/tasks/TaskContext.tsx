// context/TaskContext.tsx
import { createContext } from 'react';
import { TaskContextType } from '../../types/TaskContext.types';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);