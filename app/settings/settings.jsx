import { View, Text, useWindowDimensions, Switch } from 'react-native'
import React from 'react'

import { app_build, app_version } from 'lib/info'
import { useTheme } from 'lib/context/ThemeContext';


export default function settings() {

  const { height: screenHeigth } = useWindowDimensions();

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  console.log("Altura de la pantalla:", screenHeigth);
  return (
    <View className="bg-gray-100 dark:bg-gray-800 justify-between h-full">

      <View className="space-y-5 px-5 pt-5">
        <View className="flex flex-row justify-between items-center border-b-2 pb-3 border-black dark:border-gray-300">
          <Text className="text-2xl font-bold text-black dark:text-white">Modo Oscuro</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
        />
        </View>
        
      </View>

      <View className="items-center pb-5 px-5">
        <Text className="font-normal text-sm text-gray-500 dark:text-gray-400">
          JPLY - PelisWIX - {app_version} - {app_build}
        </Text>
      </View>

    </View>
  )
}