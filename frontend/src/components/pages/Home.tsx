import MiCard from "../layout/MiCard";
import usePaginationFetch from "../hooks/usePaginationFetch";
import AnimePagination from "../layout/AnimePagination";
import AnimeSearchBar from "../layout/AnimeSearchBar";
import { useState } from "react";


const Home = () => {
  const [search, setSearch] = useState("");
  const {
    data: paginatedData,
    pagination,
    page,
    setPage,
    loading: paginationLoading,
  } = usePaginationFetch("https://api.jikan.moe/v4/anime", search);

  const handleSearch = (q: string) => {
    setSearch(q);   // actualiza el query
    setPage(1);     // 👈 reinicia la paginación visual
  };

  if (paginationLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-transparent pt-24 pb-10 px-8 lg:px-14">
      {/* Contenedor central expandido */}
      <div className="w-full flex flex-col items-center">
        <AnimeSearchBar onSearch={(handleSearch)} />
        {/* Cards */}
        {paginationLoading ? (
          <p className="text-white">Cargando...</p>
        ) : (
          <div className="w-[80%] flex justify-center mt-8 px-2 lg:px-4">
            {/* Grid ajustado tipo Netflix: Mucho más pegado horizontalmente, 5-6 elementos */}
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-3 gap-y-12 w-full justify-items-center">
              {paginatedData.map((anime) => (
                <MiCard
                  key={anime.mal_id}
                  title={anime.title}
                  synopsis={anime.synopsis}
                  episodes={anime.episodes}
                  image={anime.images.jpg.image_url}
                />
              ))}
            </div>
          </div>
        )}

        {/* Paginación */}
        <div className="py-1">
          <AnimePagination
            pagination={pagination}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
