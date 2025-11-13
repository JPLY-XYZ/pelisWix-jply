import Ionicons from "@react-native-vector-icons/ionicons";
import ActorHorizontalList from "components/ActorHorizontalList";
import MovieDescription from "components/MovieDescription";
import MovieHeader from "components/MovieHeader";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "lib/context/ThemeContext";

import { useMovie } from "lib/hooks/useMovie";

import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";


function MovieScreen() {

  const { id } = useLocalSearchParams();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { movieDataQuery, movieCastQuery } = useMovie(id);


  if (movieDataQuery.isLoading && movieCastQuery.isLoading) {
    return (<View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }

   if (!movieDataQuery.data || !movieCastQuery.data) { 
    return (<View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800"><Ionicons name="alert" size={40}
      color={isDark ? "white" : "black"}
      className="shadow" />
      <Text className="text-black dark:text-white text-2xl mt-4">FALLO AL CARGAR DATOS</Text>
      <Pressable
        className="items-center mt-6 bg-gray-950/50 dark:bg-white/50 px-6 py-3 rounded-full"
        onPress={() => router.dismiss()}>
        <Ionicons name="home" size={40}
          color={isDark ? "white" : "black"}
          className="shadow" />
        <Text className="text-black dark:text-white text-2xl mt-2">Volver al inicio</Text>
      </Pressable></View>)
  }

  return (<>

    <View style={{ position: 'absolute', top: 40, left: 20, zIndex: 10 }}>
      <View style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 20,
        padding: 4,
      }}>
        <Pressable
          onPress={() => router.dismiss()}>
          <Ionicons name="arrow-back" size={40}
            color="white"
            className="shadow" />
        </Pressable>
      </View>
    </View>
    <ScrollView className="bg-white dark:bg-gray-800">
      <MovieHeader uriPoster={movieDataQuery.data?.posterPath} originalTitle={movieDataQuery.data?.originalTitle} title={movieDataQuery.data?.title} />
      <MovieDescription movie={movieDataQuery.data} />
      <ActorHorizontalList cast={movieCastQuery.data} title={"Actores"} />
    </ScrollView>
  </>
  );
}

export default MovieScreen;