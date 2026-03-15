import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { getUserFollowUpList, addAnimeToList } from "@/app/registerUser";
import { toast } from "sonner";


export const useUserAnimeList = () => {
    const { user, toggleFavorite, } = useAuth();
    const [userList, setUserList] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            getUserFollowUpList(user.id).then(setUserList);
        }
    }, [user]);

    // Toggle favoritos
    const handleToggleFavorite = async (mal_id: number) => {
        const result = await toggleFavorite(mal_id);
        setUserList(prev =>
            prev.map(anime =>
                anime.mal_id === mal_id ? { ...anime, favorite: result.favorite } : anime
            )
        );
    };

    // Añadir a lista
    const handleToggleAddToList = async (anime: any) => {
        if (!user || !user.id) {
            alert("Debes iniciar sesión para añadir a tu lista");
            return;
        }
        //normalizar imagen
        const imageUrl = anime.image || anime.images?.jpg?.image_url || null;

        await addAnimeToList({
            id_user: user.id,
            mal_id: anime.mal_id,
            favorite: anime.favorite,
            added_to_list: true,
            season: anime.season,
            name: anime.title,
            genres: anime.genres.map((g: any) => g.name),
            score: anime.score,
            episodes: anime.episodes,
            synopsis: anime.synopsis,
            image: imageUrl,
        });

        setUserList(prev =>
            prev.some(a => a.mal_id === anime.mal_id)
                ? prev.filter(a => a.mal_id !== anime.mal_id)
                : [...prev, {
                    mal_id: anime.mal_id,
                    title: anime.title,
                    synopsis: anime.synopsis,
                    episodes: anime.episodes,
                    image: imageUrl, // 👈 normalizado
                    score: anime.score,
                    season: anime.season,
                    genres: anime.genres.map((g: any) => g.name ?? g),
                    favorite: false,
                    added_to_list: true,
                },
                ]
        );
    };

    // Remover de lista con toast y undo
    const handleRemoveFromList = (anime: any) => {
        setUserList(prev => prev.filter(a => a.mal_id !== anime.mal_id));

        const timeoutId = setTimeout(async () => {
            if (!user || !user.id) return;
            //normalizar imagen
            const imageUrl = anime.image || anime.images?.jpg?.image_url || null;
            await addAnimeToList({
                id_user: user.id,
                mal_id: anime.mal_id,
                favorite: false,
                added_to_list: false,
                season: anime.season,
                name: anime.title,
                genres: anime.genres.map((g: any) => g.name),
                score: anime.score,
                episodes: anime.episodes,
                synopsis: anime.synopsis,
                image: imageUrl,
            });
        }, 4000);

        toast("Gracias por tus comentarios", {
            description: "El anime fue eliminado de tu lista.",
            action: {
                label: "Deshacer",
                onClick: () => {
                    clearTimeout(timeoutId);
                    setUserList(prev => [...prev, anime]);
                },
            },
        });
    };

    return {
        userList,
        handleToggleFavorite,
        handleToggleAddToList,
        handleRemoveFromList,
    };
};