import Ionicons from "@react-native-vector-icons/ionicons";
import ActorHorizontalList from "components/ActorHorizontalList";
import MovieDescription from "components/MovieDescription";
import MovieHeader from "components/MovieHeader";
import { router, useLocalSearchParams } from "expo-router";

import { useMovie } from "lib/hooks/useMovie";

import { ActivityIndicator, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";


function MovieScreen() {

  const { id } = useLocalSearchParams();


  const { movieDataQuery, movieCastQuery } = useMovie(id);


  if (movieDataQuery.isLoading && movieCastQuery.isLoading) {
    return (<View className="flex-1 items-center justify-center bg-gray-100">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }

  return (<>

    <View style={{ position: 'absolute', top: 40, left: 20, zIndex: 10 }}>
      <View style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    <ScrollView>
      <MovieHeader uriPoster={movieDataQuery.data.posterPath} originalTitle={movieDataQuery.data.originalTitle} title={movieDataQuery.data.title} />
      <MovieDescription movie={movieDataQuery.data} />
      <ActorHorizontalList cast={movieCastQuery.data} title={"Actores"} />
    </ScrollView>
  </>
  );
}

export default MovieScreen;