import { FlatList, Text, View } from "react-native";
import MoviePoster from "./MoviePoster";
import { useEffect, useRef } from "react";

function MovieHorizontalList({ movies, title, loadNextPage }) {

    const isLoading = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
    }, [movies]);

    const onScroll = (event) => {
        if (isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;

        if (!isEndReached) return;

        isLoading.current = true;

        loadNextPage && loadNextPage();

        isLoading.current = true;
    }

    return (
        <View>
            <Text className="text-3xl font-bold px-4">{title}</Text>
            <FlatList

                style={{ rowGap: 10, paddingBottom: 10, marginTop: 10 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={movies}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={({ item }) => <MoviePoster movie={item} smallPoster />}

                onScroll={onScroll}
            ></FlatList>
        </View>
    );
}

export default MovieHorizontalList;