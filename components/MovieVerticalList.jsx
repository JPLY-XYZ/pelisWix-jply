import { FlatList, Text, View, Dimensions, ActivityIndicator } from "react-native";
import MoviePoster from "./MoviePoster";
import { useEffect, useRef, useState } from "react";

const SCREEN_HEIGHT = Dimensions.get('window').height; 

function MovieVerticalGrid({ movies, loadNextPage }) {

    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const isLoading = useRef(false);
    const hasCheckedInitialSize = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
        
        if (movies?.length > 0) {
            setIsLoadingInitial(false);
        }
    }, [movies]);

    const handleEndReached = () => {
        if (isLoading.current || isLoadingInitial) return;
        
        isLoading.current = true;
        loadNextPage && loadNextPage();
    };

    const checkInitialLoad = (contentWidth, contentHeight) => {
        if (hasCheckedInitialSize.current || isLoadingInitial || movies?.length === 0) {
            return;
        }

        if (contentHeight < SCREEN_HEIGHT) {
            console.log("Forzando carga inicial: Contenido < Pantalla");
            hasCheckedInitialSize.current = true;
            isLoading.current = true;
            loadNextPage && loadNextPage();
        }
    }

    const renderGridItem = ({ item }) => (
        <View style={{ width: '25%', marginBlock: 10 }}> 
            <MoviePoster movie={item} smallPoster />
        </View>
    );
    
    const renderFooter = () => {
        if (!isLoading.current) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}> 
            <FlatList
                numColumns={4} 
                style={{ rowGap: 10, paddingBottom: 10, marginTop: 10, paddingHorizontal: 4 }} 
                
                showsHorizontalScrollIndicator={false}
                data={movies}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={renderGridItem} 

                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5} 

                onContentSizeChange={checkInitialLoad}
                
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}

export default MovieVerticalGrid;