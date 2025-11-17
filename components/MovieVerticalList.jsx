import { FlatList, Text, View, Dimensions } from "react-native";
import MoviePoster from "./MoviePoster";
import { useEffect, useRef, useState } from "react";

// Usamos las dimensiones de la ventana para el cálculo
const SCREEN_HEIGHT = Dimensions.get('window').height;

function MovieVerticalGrid({ movies, loadNextPage }) {

    // Cambiado de useRef a useState para forzar el re-renderizado
    // solo para la lógica de carga inicial.
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const isLoading = useRef(false);
    const hasCheckedInitialSize = useRef(false);

    useEffect(() => {
        // Reiniciar el estado de carga después de que se añaden nuevas películas
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
        
        // Cuando las películas cambian, asumimos que se terminó una carga inicial.
        if (movies?.length > 0) {
            setIsLoadingInitial(false);
        }
    }, [movies]);

    const onScroll = (event) => {
        if (isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        // 🎯 Chequear el final en el eje Y (vertical)
        const isEndReached = (contentOffset.y + layoutMeasurement.height + 600) >= contentSize.height;

        if (!isEndReached) return;

        isLoading.current = true;
        loadNextPage && loadNextPage();
    }

    // 🎯 NUEVA LÓGICA: Verifica si el contenido es menor que la pantalla
    const checkInitialLoad = (contentWidth, contentHeight) => {
        if (hasCheckedInitialSize.current || isLoadingInitial) {
            return;
        }
        
        // Si la altura del contenido es menor que la altura de la pantalla,
        // y tenemos películas (para evitar llamada en vacío)
        if (contentHeight < SCREEN_HEIGHT && movies?.length > 0) {
            hasCheckedInitialSize.current = true;
            isLoading.current = true;
            // Forzar la carga de la siguiente página sin necesidad de hacer scroll
            loadNextPage && loadNextPage();
        }
    }

    const renderGridItem = ({ item }) => (
        <View style={{ width: '25%', marginBlock:10 }}> 
            <MoviePoster movie={item} smallPoster />
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                numColumns={4} 
                style={{ rowGap: 10, paddingBottom: 10, marginTop: 10, paddingHorizontal: 4, minHeight: SCREEN_HEIGHT }} 
                showsHorizontalScrollIndicator={false}
                data={movies}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={renderGridItem} 
                onScroll={onScroll}
                scrollEventThrottle={16} 
                
                // 🎯 AÑADIDO: Llama a la función de chequeo de altura después del renderizado
                onContentSizeChange={checkInitialLoad}
            ></FlatList>
        </View>
    );
}

export default MovieVerticalGrid;