import { movieApi } from "lib/api/movie_api"
import ImagenNotFound from 'assets/imagenNotFound.png';
import { updateGit } from "./api/update_git";
import { supabase } from "./supabase";
import { Alert } from "react-native";



//API CALL

//-------------- MOVIES -------------------//

export async function getNowPlayingMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/movie/now_playing",{params: {page:page}});
    return mapMovieData(data);
}

export async function getPopularMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/movie/popular",{params: {page:page}});
    return mapMovieData(data);
}

export async function getTopRatedMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/movie/top_rated",{params: {page:page}});
    return mapMovieData(data);
}
export async function getUpcomingMovies({ page = 1, limit = 10 }) {
    const { data } = await movieApi.get("/movie/upcoming",{params: {page:page}});
    return mapMovieData(data);
}

export async function getByNameMovies({ page = 1, limit = 10, searchQuery }) {
    const { data } = await movieApi.get("/search/movie",{params: {page:page, query:searchQuery}});
    return mapMovieData(data);
}

export async function getMoviesByFilter({ page = 1, limit = 10, searchParamsObject }) {
    const { data } = await movieApi.get("/discover/movie",{params: {page:page, ...searchParamsObject}});
    return mapMovieData(data);
}


//-------------- MOVIE -------------------//

export async function getMovieDataById(id) {
 const {data} = await movieApi.get("/movie/" + id);
 return mapMovieDetailsData(data);
}

export async function getMovieCastById(id) {
 const {data} = await movieApi.get("/movie/" + id + "/credits");
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
        posterPath: movie.poster_path ? (process.env.EXPO_PUBLIC_IMAGE_API_URL + movie.poster_path) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgVZnS2wSlJYePRYydYsSgtM7fXrihTGZO7QEVgp93IFlZq1FLFNYG2b4HTemveGOqp4&usqp=CAU",
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
        profilePath: actor.profile_path ? (process.env.EXPO_PUBLIC_IMAGE_API_URL + actor.profile_path) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgVZnS2wSlJYePRYydYsSgtM7fXrihTGZO7QEVgp93IFlZq1FLFNYG2b4HTemveGOqp4&usqp=CAU",
    }));
}



const adjetivos = [
    "Silent", "Magic", "Fuzzy", "Brave", "Curious", "Electric", 
    "Wild", "Crazy", "Lucky", "Wandering", "Golden", "Rusty", 
    "Clever", "Salty", "Giant", "Tiny", "Fast", "Slow", 
    "Happy", "Grumpy", "Shy", "Bold", "Sparkling", "Velvet", 
    "Crystal", "Stealthy", "Vivid", "Ancient", "Neon", "Plastic",
    "Iron", "Wooden", "Cosmic", "Lunar", "Solar", "Hidden", 
    "Invisible", "Flying", "Aqua", "Crimson", "Emerald", "Obsidian",
    "Grizzly", "Humble", "Jolly", "Mystic", "Nimble", "Quirky", 
    "Vibrant", "Zenith"
];
const sustantivos = [
    "Wizard", "Panda", "Ninja", "Astronaut", "Gecko", "Raccoon", 
    "Pixel", "Robot", "Taco", "Ghost", "Captain", "Comet", 
    "Dragon", "Eagle", "Falcon", "Gamer", "Hunter", "Joker", 
    "Kraken", "Llama", "Monkey", "Nomad", "Oracle", "Phantom", 
    "Quasar", "Shark", "Titan", "Viking", "Wombat", "Yeti", 
    "Zombie", "Cactus", "Dolphin", "Meteor", "Sculptor", "Vortex",
    "Shadow", "Whisper", "Echo", "Glitch", "Cipher", "Squire",
    "Bandit", "Samurai", "Octopus", "Phoenix", "Sphinx", "Unicorn",
    "Mammoth", "Waffle"
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomName() {
    const adjetivo = getRandomElement(adjetivos);
    const sustantivo = getRandomElement(sustantivos);

    const numero = Math.floor(Math.random() * 90) + 10; 

    return `${adjetivo}${sustantivo}${numero}`;
}

function generateRandomGravatarRetro() {
    // Genera un string largo y único basado en el tiempo actual y un número aleatorio
    const uniqueSeed = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    // Calcula un hash simple del seed (o usa el seed directamente)
    // Gravatar utiliza el hash MD5 del email, pero usaremos el seed como un sustituto.
    const uniqueHash = uniqueSeed.split('').reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0).toString(16).replace('-', 'A');

    // La clave es el parámetro '?d=retro' (default=retro)
    return `https://www.gravatar.com/avatar/${uniqueHash}?d=retro`;
}




//ZONA DE AUTH

export async function insertRandomProfile(userId) {
    
    const today = new Date().toISOString().split('T')[0]; 

    const { error } = await supabase
        .from('profiles')
        .insert([
            { 
                id: userId,
                username: generateRandomName(),     
                avatar_url: generateRandomGravatarRetro(), 
                last_login: today,
                last_conection: today 
            }
        ]);

    if (error) {
        Alert.alert('Error de Perfil Aleatorio: ' + error.message);
        return false;
    }
    return true;
}
