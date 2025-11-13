import "../global.css"; // ¡Mueve la importación del CSS aquí!
import { Stack } from 'expo-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>   
      <Stack>
        <Stack.Screen name="home/index" options={{ headerShown: false }} />
         <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
         <Stack.Screen name="settings/settings" options={{ headerShown: true, title:"Configuración" }} />
      </Stack>
    </QueryClientProvider>   
    </SafeAreaProvider>
  );
}