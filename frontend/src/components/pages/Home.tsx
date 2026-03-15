import MiCard from "../layout/MiCard";
import usePaginationFetch from "../hooks/usePaginationFetch";
import AnimePagination from "../layout/AnimePagination";
import AnimeSearchBar from "../layout/AnimeSearchBar";
import { useState } from "react";
import { useUserAnimeList } from "../hooks/useUserAnimeList";

const Home = () => {
  const { userList, handleToggleFavorite, handleToggleAddToList, handleRemoveFromList } = useUserAnimeList();
  const [search, setSearch] = useState("");

  const {
    data: paginatedData,
    pagination,
    page,
    setPage,
    loading: paginationLoading,
  } = usePaginationFetch("https://api.jikan.moe/v4/anime", search);

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  // Fusiona datos de la API con la lista del usuario
  const mergedData = paginatedData.map((anime) => {
    const userAnime = userList.find((u) => u.mal_id === anime.mal_id);
    return {
      ...anime,
      favorite: userAnime?.favorite || false,
      added_to_list: userAnime?.added_to_list || false,
    };
  });

  if (paginationLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-transparent pt-24 pb-10 px-8 lg:px-14">
      <div className="w-full flex flex-col items-center">
        <AnimeSearchBar onSearch={handleSearch} />

        {/* Cards */}
        <div className="w-[80%] flex justify-center mt-8 px-2 lg:px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-3 gap-y-14 w-full justify-items-center">
            {mergedData.map((anime) => (
              <MiCard
                key={anime.mal_id}
                mal_id={anime.mal_id}
                title={anime.title}
                synopsis={anime.synopsis}
                episodes={anime.episodes}
                image={anime.images.jpg.image_url}
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

        {/* Paginación */}
        <div className="py-14 px-2 lg:px-4 flex justify-center">
          <AnimePagination pagination={pagination} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Home;