import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

function ActorPoster({ actor, smallPoster = false }) {

  let finalUrl = process.env.EXPO_PUBLIC_IMAGE_API_URL + actor.profile_path;

  console.log("Poster URL:", finalUrl);
  return (
    <View className="flex flex-col">

      <Image
        source={
    typeof actor.profilePath === 'string' // Si es un string...
      ? { uri: actor.profilePath }        // ...úsalo como URL.
      : actor.profilePath                // Si no (es el require/número), úsalo directamente.
  }
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
        resizeMode="cover"
      />



      <View className="mt-2 px-3 max-w-[85px]">
        <Text className=" dark:text-white text-black font-bold">{actor.character}</Text>
        <Text className=" dark:text-gray-500 text-black text-xs">{actor.name}</Text>
      </View>
    </View >
  );



}
export default ActorPoster;