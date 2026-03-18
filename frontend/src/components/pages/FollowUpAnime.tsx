import MiCard from "../layout/MiCard";
import { useUserAnimeList } from "../hooks/useUserAnimeList";

const FollowUpAnime = () => {
    const { userList, handleToggleFavorite, handleToggleAddToList, handleRemoveFromList } = useUserAnimeList();

    if (!userList || userList.length === 0) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-white">
                <p>No tienes animes en tu lista de seguimiento.</p>
            </div>
        );
    }

    console.log(userList);

    return (
        <div className="w-full min-h-screen bg-transparent pt-24 pb-10 px-8 lg:px-14">
            <div className="w-full flex flex-col items-center">
                <h2 className="text-white text-2xl font-bold mb-6">Mi lista de seguimiento</h2>

                <div className="w-[80%] flex justify-center mt-8 px-2 lg:px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-3 gap-y-14 w-full justify-items-center">
                        {userList.map((anime: any) => (
                            <MiCard
                                key={anime.mal_id}
                                mal_id={anime.mal_id}
                                title={anime.title}
                                synopsis={anime.synopsis}
                                episodes={anime.episodes}
                                image={anime.image}
                                score={anime.score}
                                genres={anime.genres}
                                season={anime.season}
                                favorite={anime.favorite}
                                added_to_list={anime.added_to_list}
                                onToggleFavorite={handleToggleFavorite}
                                onToggleAddToList={() => handleToggleAddToList(anime)}
                                onRemoveFromList={() => handleRemoveFromList(anime)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowUpAnime;