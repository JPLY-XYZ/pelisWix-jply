import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainSlideShow from "components/MainSlideShow";
import MovieHorizontalList from "components/MovieHorizontalList";

import { useMovies } from "lib/hooks/useMovies";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import UpdateAdvisor from "components/UpdateAdvisor";
import { useTheme } from "lib/context/ThemeContext";

export default function HomeScreen() {

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { nowPlayingQuery, popularQuery, topRatedQuery, upcommingQuery } = useMovies();

  if (nowPlayingQuery.isLoading && popularQuery.isLoading && topRatedQuery.isLoading && upcommingQuery.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <UpdateAdvisor />
      <SafeAreaView style={{ backgroundColor: isDark ? '#1e2939' : '#f3f4f6', flex: 1 }}>
        <View className="bg-gray-100 dark:bg-gray-800 p-4 mx-3 border-b-2 dark:border-white pb-2 flex flex-row justify-between items-center rounded-lg">
          <Text className="text-5xl font-bold text-red-600">
            PelisWix
          </Text>
          <Pressable
            onPress={() => router.push("/settings/settings")}>
            <Ionicons name="settings" size={40}
              color={isDark ? 'white' : 'black'}
              className="shadow" />
          </Pressable>
        </View>
        <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-800">
          <View className="pb-10">
            <MainSlideShow movies={nowPlayingQuery.data?.pages.flat()} loadNextPage={nowPlayingQuery.fetchNextPage} />
            <MovieHorizontalList movies={popularQuery.data?.pages.flat()} title={"Populares"} loadNextPage={popularQuery.fetchNextPage} />
            <MovieHorizontalList movies={topRatedQuery.data?.pages.flat()} title={"Mejor valoradas"} loadNextPage={topRatedQuery.fetchNextPage} />
            <MovieHorizontalList movies={upcommingQuery.data?.pages.flat()} title={"Proximos lanzamientos"} loadNextPage={upcommingQuery.fetchNextPage} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}