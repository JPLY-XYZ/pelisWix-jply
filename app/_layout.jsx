import "../global.css";
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from "react-native-safe-area-context";
// Importa AMBOS
import { ThemeProvider, useTheme } from "../lib/context/ThemeContext";

const queryClient = new QueryClient();

function AppStack() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerStyle: { 
          backgroundColor: isDark ? '#161d29' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#000000',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      <Stack.Screen 
        name="settings/settings" 
        options={{ 
          headerShown: true, 
          title:"Configuración",
        }} 
      />
    </Stack>
  );
}



export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider> 
        <QueryClientProvider client={queryClient}>   
          <AppStack /> 
        </QueryClientProvider>   
      </ThemeProvider>
    </SafeAreaProvider>
  );
}