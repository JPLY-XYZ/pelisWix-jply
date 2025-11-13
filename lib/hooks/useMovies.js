import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getNowPlayingMovies, getPopularMovies, GetTopRatedMovies, getUpcomingMovies } from "lib/data"


export const useMovies = () => {

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
        queryFn: ({ pageParam }) => GetTopRatedMovies({ page: pageParam }),
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

    return { nowPlayingQuery, popularQuery, topRatedQuery, upcommingQuery }

}