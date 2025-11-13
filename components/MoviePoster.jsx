import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

function MoviePoster({ movie, smallPoster = false }) {


 return (
  <View
    style={{
      marginInline: smallPoster ? 5 : 0,
      borderRadius: 16,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: smallPoster ? 2 : 4 },
      shadowOpacity: smallPoster ? 0.15 : 0.3,
      shadowRadius: smallPoster ? 2.5 : 4.65,
      elevation: smallPoster ? 3 : 8,
      width: smallPoster ? 85 : 150,
      height: smallPoster ? 130 : 250,
    }}
  >
    <Pressable
      style={{
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
      }}

      onPress={()=> router.push("/movie/" + movie.id)}
      
    >
      <Image
        source={{ uri: movie.posterPath }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
    </Pressable>
  </View>
);



}
export default MoviePoster;