// context/TaskProvider.tsx
import React, { useCallback, useState } from 'react';
import { CreateTaskInput, Task } from '../../types/task.types';
import { TaskContext } from './TaskContext';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((taskInput: CreateTaskInput) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updatedFields: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updatedFields, updatedAt: new Date() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getTaskById = useCallback((id: string) => {
    return tasks.find(task => task.id === id);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};