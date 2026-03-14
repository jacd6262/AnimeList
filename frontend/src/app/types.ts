// app/types.ts

export interface User {
    id_user?: number;
    username: string;
    email: string;
    password?: string; // solo se usa al registrar/login
}

export interface Anime {
    id_anime?: number;
    id_anime_genre: number;
    id_season: number;
    name: string;
    score?: number;
    episodes?: number;
    synopsis?: string;
    mal_id: number;
}