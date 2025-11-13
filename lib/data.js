import { movieApi } from "lib/api/movie_api"
import ImagenNotFound from 'assets/imagenNotFound.png';
import { updateGit } from "./api/update_git";



//API CALL

//-------------- MOVIES -------------------//

export async function getNowPlayingMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/now_playing",{params: {page:page}});
    return mapMovieData(data);
}

export async function getPopularMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/popular",{params: {page:page}});
    return mapMovieData(data);
}

export async function GetTopRatedMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/top_rated",{params: {page:page}});
    return mapMovieData(data);
}
export async function getUpcomingMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/upcoming",{params: {page:page}});
    return mapMovieData(data);
}



//-------------- MOVIE -------------------//

export async function getMovieDataById(id) {
 const {data} = await movieApi.get("/" + id);
 return mapMovieDetailsData(data);
}

export async function getMovieCastById(id) {
 const {data} = await movieApi.get("/" + id + "/credits");
 return mapMovieCastData(data);
}



// -------------- VERSION MANAGER -------------------//

export async function getUpdateFileFromGit() {
    const { data } = await updateGit.get("/appVersionManagerFile.json");
    console.log("Archivo de actualización obtenido de GitHub:", data);
     return data;
}


//OBJECT MAPPER


// -------------- MOVIES -------------------//
export function mapMovieData(data) {
    return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: process.env.EXPO_PUBLIC_IMAGE_API_URL + movie.poster_path,
        releaseDate: movie.release_date,
        overview: movie.overview,
    }));
}
// -------------- MOVIE -------------------//
export function mapMovieDetailsData(data) {
    return {
        id: data.id,
        title: data.title,
        originalTitle: data.original_title,
        posterPath: process.env.EXPO_PUBLIC_IMAGE_API_URL + data.poster_path,
        releaseDate: data.release_date,
        overview: data.overview,
        genres: data.genres.map(genre => genre.name),
        budget: data.budget,
        runtime: data.runtime,
    };
}

export function mapMovieCastData(data) {
console.log(data);

    return data.cast.map(actor => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePath: actor.profile_path ? (process.env.EXPO_PUBLIC_IMAGE_API_URL + actor.profile_path) : ImagenNotFound,
    }));
}