import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from 'lib/context/ThemeContext';
import React from 'react';
import { View, TextInput, Pressable } from 'react-native';

export default function SearchBarWithFilter({ value, onChangeText, reset }) {

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tintColor = isDark ? '#ffffff' : '#000000';

  return (
    <View className="p-4 w-full">
      <View
        className="flex-row items-center p-1 pr-4 rounded-xl 
                   bg-white dark:bg-gray-700 
                   shadow-md border border-gray-200 dark:border-gray-600"
      >
        <View className="flex-row items-center flex-1 ml-2">
          <Ionicons name="search" size={23}
            color={tintColor}
            className="shadow" />
          <TextInput
            className="flex-1 text-base py-3 ml-0.5 mr-12 text-black dark:text-white"
            placeholder="Buscar películas..."
            placeholderTextColor="#A0AEC0"
            value={value}
            onChangeText={onChangeText}
            autoCapitalize="none"
            keyboardType="default"
          />

          {value ? <Pressable onPress={() => { reset() }}>
            <Ionicons name="close" size={23}
              color={tintColor}
              className="shadow" />
          </Pressable> : <></>}

        </View>
      </View>
    </View>
  );
}