
import React, { useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '@/lib/hooks/useTasks';
import { useTheme } from '@/lib/hooks/useTheme';
import { TaskCard } from '../components/molecules/TaskCard';
import { ThemeToggle } from '../components/molecules/ThemeToggle';
import { Button } from '../components/atoms/Button';
import { Text } from '../components/atoms/Text';
import { TaskStatus } from '@/lib/types/task.types';
import { Ionicons } from '@expo/vector-icons';
import "@/global.css"

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, deleteTask } = useTasks();
  const { theme } = useTheme();
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
    <View className='flex-1' style={{backgroundColor: theme.colors.background}}>
      {/* =========== Encabezado =========== */}
      <View className="py-3 border-b px-4 pt-2 pb-3" style={{ backgroundColor: theme.colors.surface }}>
        <SafeAreaView>
          <Text variant='title' className="text-center" style={{color: theme.colors.text}}>
            Mis Tareas
          </Text>

          <ThemeToggle/>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filterOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Button
                title={item.label}
                variant={filterStatus === item.value ? 'primary' : 'ghost'}
                size="small"
                onPress={() => setFilterStatus(item.value)}
                className="mr-2"
              />
            )}
          />
        </SafeAreaView>
      </View>

      <SafeAreaView 
        className="flex-1" 
        style={{ backgroundColor: theme.colors.background }}
      >
        <View className="flex-1">
          

          {/* Lista de tareas */}
          {filteredTasks.length === 0 ? (
            <View className="flex-1 items-center justify-center px-6">
              <Ionicons 
                name="checkmark-circle-outline" 
                size={80} 
                color={theme.colors.textTertiary} 
              />
              <Text 
                variant="subtitle" 
                className="mt-4 text-center"
                style={{ color: theme.colors.textSecondary }}
              >
                {filterStatus === 'all' 
                  ? 'No tienes tareas' 
                  : `No hay tareas ${filterOptions.find(f => f.value === filterStatus)?.label.toLowerCase()}`}
              </Text>
              <Text 
                variant="body" 
                className="mt-2 text-center"
                style={{ color: theme.colors.textTertiary }}
              >
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
          <View className="absolute bottom-6 right-6">
            <Button
              title="+ Nueva Tarea"
              onPress={() => router.push('/task/create')}
              className="shadow-lg"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
