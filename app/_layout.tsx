// app/_layout.tsx
import { Stack } from 'expo-router';
import { TaskProvider } from '@/lib/context/TaskProvider';
import { StatusBar } from 'expo-status-bar';
import "@/global.css";

export default function RootLayout() {
  return (
    <TaskProvider>
      <StatusBar style="dark"/>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "dark",
        }}
      >
        <Stack.Screen 
          name="task/create" 
          options={{ 
            presentation: 'modal',
          }} 
        />
      </Stack>
    </TaskProvider>
  );
}