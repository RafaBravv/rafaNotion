// context/TaskContext.types.ts
import { CreateTaskInput, Task } from './task.types';

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: CreateTaskInput) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}