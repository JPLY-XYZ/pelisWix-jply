import { router } from 'expo-router';
import { insertRandomProfile } from 'lib/data';
import { supabase } from 'lib/supabase';
import React, { useState } from 'react';
import { Alert, View, TextInput, Pressable, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomButton = ({ title, onPress, loading, colorClass }) => (
  <Pressable
    onPress={onPress}
    disabled={loading}
    className={`p-3 rounded-md items-center justify-center h-15 ${colorClass} ${loading ? 'opacity-50' : ''}`}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text className="text-white font-bold text-xl ">{title}</Text>
    )}
  </Pressable>
);

const authPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error al iniciar sesión: ' + error.message);
    } else if (session) {
      router.dismiss();
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { user, session },
      error
    } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      Alert.alert('Error de Registro: ' + error.message);
    } else if (user && session) {
      Alert.alert('¡Cuenta registrada!', 'Ya tienes acceso a todas las funcionalidades de la app.');
      insertRandomProfile(user.id)
      router.dismiss();
    }

    setLoading(false);
  }

  return (
    <View className=" bg-gray-100 dark:bg-gray-800 p-3 flex-1">

      <SafeAreaView>
        <Text className='mb-5 text-3xl font-bold text-center text-black dark:text-white'>ACCESO / CREAR CUENTA</Text>

        <View className="py-2 self-stretch border-t-2 border-black dark:border-white">
          <Text className="text-base mb-1 font-bold text-black dark:text-white">Email</Text>
          <TextInput
            className="h-15 border border-gray-300 dark:border-gray-500 text-xl bg-white dark:bg-gray-700 text-black dark:text-white px-3 rounded-md"
            onChangeText={setEmail}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor="#A0AEC0"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="py-2 self-stretch">
          <Text className="text-base mb-1 font-bold text-black dark:text-white">Contraseña</Text>
          <TextInput
            className="h-15 border border-gray-300 text-xl dark:border-gray-500 bg-white dark:bg-gray-700 text-black dark:text-white px-3 rounded-md"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Contraseña"
            placeholderTextColor="#A0AEC0"
            autoCapitalize="none"
          />
        </View>

        <View className="py-2 self-stretch mt-5">
          <CustomButton
            title="Iniciar Sesión"
            onPress={signInWithEmail}
            loading={loading}
            colorClass="bg-green-500"
          />
        </View>

        <View className="py-2 self-stretch">
          <CustomButton
            title="Registrarse"
            onPress={signUpWithEmail}
            loading={loading}
            colorClass="bg-blue-500"
          />
        </View>
        <View className="py-2 self-stretch">
          <Pressable onPress={() => router.dismiss()}><Text className='text-center text-black dark:text-white'>Cancelar</Text></Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}


export default authPage; 