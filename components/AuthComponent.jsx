import { router } from "expo-router";
import { useAuth } from "lib/hooks/useAuth";
import { supabase } from "lib/supabase";
import { Pressable, Text, View } from "react-native";

export default function AuthComponent() {

  const { session, profile, loading } = useAuth();

  const signOut = async () => {
    await supabase.auth.signOut();
  }

 if(loading){
  return(<View className="mt-3 mb-5">
        
        {/* Título de la sección (Cuenta) */}
        <View className="border-b-2 border-black dark:border-gray-500 mb-3">
            <Text className=" font-bold text-black dark:text-white border-b-2 border-black dark:border-gray-500 mb-3">Cuenta</Text>
        </View>
        
        {/* Contenido (Username y Cerrar Sesión) */}
        <View className="flex flex-row items-center justify-between w-full">
            
            {/* Esqueleto para el Username (Línea más larga para simular texto principal) */}
            <View className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
            
            {/* Esqueleto para el botón "Cerrar Sesión" (Línea más corta) */}
            <View className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse" />
            
        </View>
    </View>)
 }

  if (session) {
    return (
      <View className="mt-3 mb-5">
        <Text className=" font-bold text-black dark:text-white border-b-2 border-black dark:border-gray-500 mb-3">Cuenta</Text>
        <View className="flex flex-row items-center justify-between w-full" >
        <Text className="text-2xl font-bold text-black dark:text-white">{profile?.username}</Text>
        <Pressable onPress={signOut}><Text className="text-black dark:text-gray-400">Cerrar sesion</Text></Pressable>
      </View>
      </View>
    )
  }

  return (
    <View className="mt-3 mb-5">
        <Text className=" font-bold text-black dark:text-white border-b-2 border-black dark:border-gray-500 mb-3">Cuenta</Text>
        <Pressable onPress={() => router.navigate("/settings/authPage")}>
      <Text className="text-xl font-bold text-black dark:text-white">ACCEDER / CREAR CUENTA</Text>
    </Pressable>
      </View>
    
  )
}