import React from 'react';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { TaskForm } from '../../components/molecules/TaskForm';
import { useTasks } from '@/lib/hooks/useTasks';
import { CreateTaskInput } from '@/lib/types/task.types';

export default function CreateTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();

  const handleCreateTask = (taskData: CreateTaskInput) => {
    addTask(taskData);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TaskForm
        onSubmit={handleCreateTask}
        onCancel={() => router.back()}
      />
    </SafeAreaView>
  );
}