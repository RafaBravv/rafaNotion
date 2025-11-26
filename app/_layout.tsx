// app/_layout.tsx
import { Stack } from 'expo-router';
import { TaskProvider } from '@/lib/context/TaskProvider';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <TaskProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#374151',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Mis Tareas',
            headerLargeTitle: true,
          }} 
        />
        <Stack.Screen 
          name="task/create" 
          options={{ 
            title: 'Nueva Tarea',
            presentation: 'modal',
          }} 
        />
      </Stack>
    </TaskProvider>
  );
}