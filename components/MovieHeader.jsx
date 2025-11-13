import { Image,  Text, useWindowDimensions, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
function MovieHeader({ uriPoster, originalTitle, title }) {
  

const {height:screenHeigth} = useWindowDimensions();

    return (
        <>
            <View
                style={{ height: screenHeigth * 0.7 }}
                className="shadow-xl shadow-black">

                <View className="flex rounded-b-[25px] overflow-hidden">
                    <Image
                        source={{ uri: uriPoster }}
                        style={{ width: '100%', height: screenHeigth * 0.7 }}
                        resizeMode="cover"
                    />
                </View>

            </View>
            <View className="px-5 mt-5">
                <Text className="font-normal">{originalTitle}</Text>
                <Text className="font-semibold text-2xl">{title}</Text>
            </View>
        </>
    );
}

export default MovieHeader;