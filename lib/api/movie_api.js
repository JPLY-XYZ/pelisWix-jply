import axios from 'axios';

export const movieApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_MOVIE_API_URL,
    params: {language: 'es-ES', api_key: process.env.EXPO_PUBLIC_MOVIE_API_KEY}});
