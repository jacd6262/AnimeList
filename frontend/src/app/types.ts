// app/types.ts

export interface User {
    id_user?: number;
    username: string;
    email: string;
    password?: string; // solo se usa al registrar/login
}

export interface Anime {
    id_user: number;
    favorite: boolean;
    added_to_list: boolean;
    genres: string[];
    season: string;
    name: string;
    score?: number;
    episodes?: number;
    synopsis?: string;
    mal_id: number;
    image?: string;
}
