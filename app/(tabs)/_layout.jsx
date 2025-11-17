// app/(tabs)/_layout.jsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native'; // Necesitas importar Text para usarlo en tabBarIcon
import { useTheme } from "../../lib/context/ThemeContext"; // Importa tu hook de tema
import Ionicons from '@react-native-vector-icons/ionicons';

export default function TabsLayout() {
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';

  const tintColor = isDark ? '#ffffff' : '#000000'; 

  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: isDark ? '#161d29' : '#ffffff',
        borderTopColor: isDark ? '#333' : '#eee',
      },
      tabBarActiveTintColor: '#3b82f6', 
      
      headerStyle: {
        backgroundColor: isDark ? '#161d29' : '#ffffff',
      },
      headerTintColor: tintColor,
    }}>
      
      <Tabs.Screen
        name="home" 
        options={{
          title: "Inicio",
          headerShown: false, 
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={23}
                          color= {color}
                          className="shadow" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Buscador",
          headerShown: false,
          tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={23}
                          color= {color}
                          className="shadow" />
          ),
        }}
      />
    
      <Tabs.Screen
        name="chat"
        options={{
          title: "Mensajes",
           headerShown: false,
          tabBarIcon: ({ color }) => (
             <Ionicons name="chatbox" size={23}
                          color= {color}
                          className="shadow" />
          ),
        }}
      />

    </Tabs>
  );
}