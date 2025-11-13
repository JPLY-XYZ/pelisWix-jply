import { useRef } from "react";
import { Text, useWindowDimensions, View } from "react-native";

import Carousel from "react-native-reanimated-carousel";
import MoviePoster from "./MoviePoster";


function MainSlideShow({ movies }) {
    const ref = useRef(null)
    const width = useWindowDimensions().width;

    return (<View className="h-[250px] w-full" >

        <Carousel
            width={200}
            height={350}
            ref={ref}
            data={movies}
            renderItem={({ item }) => <MoviePoster movie={item} /> }
            style={{ width: width, height: 350, justifyContent: 'center', alignItems: 'center' }}
            mode="parallax"
            defaultIndex={1}
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50
            }}
        />

    </View>);
}

export default MainSlideShow;