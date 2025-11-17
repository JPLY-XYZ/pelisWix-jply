import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useMovies } from "lib/hooks/useMovies";
import UpdateAdvisor from "components/UpdateAdvisor";
import { useTheme } from "lib/context/ThemeContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovieVerticalGrid from "components/MovieVerticalList";
import SearchBar from "components/SearchBar";
import { useState } from "react";


export default function SearchScreen() {

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  


  const { 
    searchQuery,
    startSearch,
    findByNameQuery 
  } = useMovies();

  const [inputText, setInputText] = useState("");

  const handleTextChange = (term) => {
    setInputText(term);
    startSearch(term);
  };
   const handleReset = () => {
    setInputText("");
     startSearch("");
  };

  const movies = findByNameQuery.data?.pages.flat() || [];

  return (
    <>
      <UpdateAdvisor />
      <View style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: isDark ? '#1e2939' : '#f3f4f6'
      }}>

        <SearchBar
          value={inputText}
          onChangeText={handleTextChange}
          reset = {handleReset}
        />

        <View className="flex-1 p-4">
          
          {findByNameQuery.isFetching ? (
            <MovieVerticalGrid 
              movies={movies} 
            />
          ) : (
            /* CASO 2: NO CARGANDO (Muestra datos o mensaje de vacío) */
            movies.length > 0 ? (
              <MovieVerticalGrid 
                movies={movies} 
                loadNextPage={findByNameQuery.fetchNextPage} 
              />
            ) : (
              <Text className="text-center mt-4 text-gray-500 dark:text-gray-400">
                Nada que mostrar
              </Text>
            )
          )}

        </View>
      </View>
    </>
  );
}