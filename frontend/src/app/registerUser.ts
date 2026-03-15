// app/registerUser.ts
import type { Anime, User } from "./types.ts";

const API_URL = "http://localhost:4000";

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

