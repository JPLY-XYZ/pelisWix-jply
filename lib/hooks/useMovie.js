import { useQuery } from "@tanstack/react-query"
import { getMovieCastById, getMovieDataById } from "lib/data"


export const useMovie = (id) => {

    const movieDataQuery = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieDataById(id),
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
    })

    const movieCastQuery = useQuery({
        queryKey: ['movie', id, 'cast'],
        queryFn: () => getMovieCastById(id),
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
    })



    return { movieDataQuery, movieCastQuery }

}