import { View, Text,  Switch } from 'react-native'
import React from 'react'
import { app_build, app_version } from 'lib/info'
import { useTheme } from 'lib/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function settings() {

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
 const insets = useSafeAreaInsets();

 const test = insets.bottom
  return (
    <View  className={`bg-gray-100 dark:bg-gray-800 justify-between h-full`}>

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
        {/* <View className="flex flex-row justify-between items-center border-b-2 border-black dark:border-gray-300">
          <AuthComponent />
        </View> */}
        
      </View>

      <View style={{paddingBottom: insets.bottom, alignItems:'center' }}>
        <Text className="font-normal text-sm text-gray-500 dark:text-gray-400">
          JPLY - PelisWIX - {app_version} - {app_build}
        </Text>
      </View>

    </View>
  )
}