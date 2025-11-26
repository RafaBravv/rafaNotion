// context/TaskContext.types.ts
import { Task, CreateTaskInput } from '../types/task.types';

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: CreateTaskInput) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}