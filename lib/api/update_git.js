import axios from "axios";

export const updateGit = axios.create({
    baseURL: "https://raw.githubusercontent.com/JPLY-XYZ/pelisWix-jply/main/", 
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    }
});