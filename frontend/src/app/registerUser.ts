// app/registerUser.ts
import type { Anime, User } from "./types.ts";

const API_URL = "http://localhost:4000";

//registrar usuario
export async function registerUser(user: User) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Error al registrar usuario");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Login usuario
export async function loginUser(email: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Credenciales inválidas");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//registrar AnimeAddTolist
export async function addAnimeToList(anime: Anime) {
    console.log(anime);
    try {
        const response = await fetch(`${API_URL}/users/addAnimeToList`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(anime),
        });

        if (!response.ok) {
            throw new Error("Error al agregar anime a la lista");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Obtiene la lista de animes de un usuario desde el backend.
// Devuelve un array con los animes y sus flags (favorite, added_to_list)
export async function getUserAnimeList(userId: number) {
    const res = await fetch(`${API_URL}/users/user_anime_list/${userId}`);
    if (!res.ok) throw new Error("Error al obtener lista de animes del usuario");
    return res.json();
}

// Alterna el estado de 'favorite' para un anime específico de un usuario.
// Si estaba marcado como favorito, lo desmarca; si no, lo marca.
// Devuelve el nuevo estado (favorite: true/false).
export async function toggleFavorite(userId: number, id_anime: number) {
    const res = await fetch(`${API_URL}/users/user_anime_list/${userId}/${id_anime}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Error al actualizar estado de favorito");
    return res.json();
}

// Obtiene la lista de animes agregados por el usuario (follow-up).
export async function getUserFollowUpList(userId: number) {
    const res = await fetch(`${API_URL}/users/user_follow_up_list/${userId}`);
    if (!res.ok) throw new Error("Error al obtener lista de seguimiento");
    return res.json();
}
