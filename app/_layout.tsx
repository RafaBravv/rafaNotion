// app/_layout.tsx
import { Stack } from 'expo-router';
import { TaskProvider } from '@/lib/context/tasks/TaskProvider';
import { ThemeProvider } from '@/lib/context/theme/ThemeProvider';
import { useTheme } from '@/lib/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';

// Componente interno que usa el theme
function RootLayoutContent() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="task/create" 
          options={{ 
            title: 'Nueva Tarea',
            presentation: 'modal',
            headerShown: true,
          }} 
        />
      </Stack>
    </>
  );
}

// Componente principal que provee los contextos
export default function RootLayout() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <RootLayoutContent />
      </TaskProvider>
    </ThemeProvider>
  );
}