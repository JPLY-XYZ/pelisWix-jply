import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";

function MovieDescription({ movie }) {

    const { height: screenHeigth } = useWindowDimensions();


    const budgetFormatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',         // 'compact' usa K, M, B, etc.
        maximumFractionDigits: 1     // Máximo 1 decimal
    });

    return (
        <View className="mx-5">
            <View className="flex flex-row items-center">
                <Text className="font-bold">
                    {movie.releaseDate} - {budgetFormatter.format(movie.budget)} $
                </Text>
            </View>
            <View className="flex flex-row">
                <Text>{movie.averageVote}</Text>
                <Text>{movie.genres.join(', ')}</Text>
            </View>
            <Text className="my-3">{movie.overview}</Text>

        </View>
    );
}

export default MovieDescription;