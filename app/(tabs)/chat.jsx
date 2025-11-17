import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useMovies } from "lib/hooks/useMovies";
import UpdateAdvisor from "components/UpdateAdvisor";
import { useTheme } from "lib/context/ThemeContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovieVerticalGrid from "components/MovieVerticalList";
import SearchBar from "components/SearchBar";
import { useState } from "react";


export default function ChatScreen() {

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <>
      <UpdateAdvisor />
      <View style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: isDark ? '#1e2939' : '#f3f4f6'
      }}>

        <Text className="text-center my-auto dark:text-white text-black">ACTUALMENTE EN DESARROLLO</Text>

      </View>
    </>
  );
}