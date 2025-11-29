import { useTasks } from '@/lib/hooks/useTasks';
import { TaskStatus } from '@/lib/types/task.types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/atoms/Button';
import { Text } from '../components/atoms/Text';
import { TaskCard } from '../components/molecules/TaskCard';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, deleteTask } = useTasks();
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  const filterOptions: { value: TaskStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completadas' },
  ];

  return (
    <SafeAreaView className='bg-grey-100 flex-1 gap-10'>
      <View className="px-4 py-2 bg-red-6 border-b border-gray-200 flex-col min-w-40 gap-2">
          <Text variant='title' className="text-center">
            Mis Tareas
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filterOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Button
                title={item.label}
                variant={filterStatus === item.value ? 'primary' : 'ghost'}
                size="medium"
                onPress={() => setFilterStatus(item.value)}
              />
            )}
          />
        </View>

      
      
        <View className="flex-1">
          {/* Lista de tareas */}
          {filteredTasks.length === 0 ? (
            <View className="flex-1 items-center justify-center px-6">
              <Ionicons name="checkmark-circle-outline" size={80} color="#D1D5DB" />
              <Text variant="subtitle" className="mt-4 text-center text-gray-500">
                {filterStatus === 'all' 
                  ? 'No tienes tareas' 
                  : `No hay tareas ${filterOptions.find(f => f.value === filterStatus)?.label.toLowerCase()}`}
              </Text>
              <Text variant="body" className="mt-2 text-center text-gray-400">
                Crea una nueva tarea para comenzar
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onDelete={() => deleteTask(item.id)}
                />
              )}
              contentContainerClassName="p-4"
            />
          )}

          {/* Botón flotante para crear tarea */}
          <View className="absolute bottom-6 right-6 left-6">
            <Button
              title="+ Nueva Tarea"
              onPress={() => router.push('/task/create')}
              className="w-auto px-8 py-4 shadow-2xl shadow-black/30 bg-blue-600"
            />
          </View>
        </View>
      
    </SafeAreaView>
  );
}
