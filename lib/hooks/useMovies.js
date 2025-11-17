import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getByNameMovies, getMoviesByFilter, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "lib/data"
import { useState } from "react";


export const useMovies = () => {


    const [searchQuery, setSearchQuery] = useState('');
    const [searchFilterObject, setSearchFilterObject] = useState({});


    const nowPlayingQuery = useInfiniteQuery({
        queryKey: ['movies', 'nowPlaying'],
        queryFn: ({ pageParam }) => getNowPlayingMovies({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
    })

    const popularQuery = useInfiniteQuery({
        queryKey: ['movies', 'popular'],
        queryFn: ({ pageParam }) => getPopularMovies({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
    })

    const topRatedQuery = useInfiniteQuery({
        queryKey: ['movies', 'topRated'],
        queryFn: ({ pageParam }) => getTopRatedMovies({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
    })

    const upcommingQuery = useInfiniteQuery({
        queryKey: ['movies', 'upcoming'],
        queryFn: ({ pageParam }) => getUpcomingMovies({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
    })

    const findByNameQuery = useInfiniteQuery({
      
        queryKey: ['movies', 'searchByName', searchQuery],

        queryFn: ({ pageParam, queryKey }) => {
            
            const currentSearchQuery = queryKey[2];

            return getByNameMovies({
                page: pageParam,
                searchQuery: currentSearchQuery
            });
        },

        initialPageParam: 1,

        getNextPageParam: (lastPage, allPages) => allPages.length + 1,

        staleTime: 1000 * 60 * 60 * 24, 
        // La consulta solo se ejecuta si hay un término de búsqueda (no vacío)
        enabled: !!searchQuery,
    });


    const startSearch = (term) => {
        const trimmedTerm = term.trim();

         //    ("Ant Man" se convierte en "Ant%20Man")
        const encodedTerm = encodeURIComponent(trimmedTerm);

        if (encodedTerm !== searchQuery) {
            setSearchQuery(encodedTerm);
        }
    };

    return {
        nowPlayingQuery, popularQuery, topRatedQuery, upcommingQuery, findByNameQuery, searchQuery, startSearch
    }

}