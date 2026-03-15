import { useState, useRef } from "react";
import { ChevronDown, Heart, Plus, StarIcon, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AnimeCardProps = {
  mal_id: number;
  title: string;
  synopsis: string;
  episodes: number;
  image: string;
  score: number;
  genres: Genre[];
  season: string;
  favorite: boolean;
  added_to_list: boolean;
  onToggleFavorite: (mal_id: number) => void;
  onToggleAddToList: (anime: any) => void;
  onRemoveFromList: () => void;
};

const MiCard = ({
  mal_id, title,
  episodes,
  image,
  score,
  genres,
  favorite,
  added_to_list,
  onToggleFavorite,
  onToggleAddToList,
  onRemoveFromList }: AnimeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const handleMouseEnter = () => {
    // Add a slight delay so it doesn't pop up instantly while scrolling across many
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 400); // 400ms delay mimics netflix feel
  };
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };
  return (
    <div
      className="relative w-full aspect-video rounded-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1) Base Static Poster (Siempre visible debajo) */}
      <Card className="w-full h-62.5 border-none rounded-md overflow-hidden shadow-md cursor-pointer">
        <img
          src={image}
          alt={title}
          className="absolute w-full h-full object-cover top-0 left-0 rounded-md"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full h-1 rounded-md">
          <p className="text-white font-bold pt-2">{title}</p>
        </div>
      </Card>

      {/* 2) Expanded Hover Overlay (Netflix-style popout) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[130%] min-w-[220px] h-[400px] bg-[#141414] border border-zinc-800
               rounded-md overflow-hidden shadow-2xl shadow-black/80 cursor-pointer"
          >
            {/* Top Half: Image */}
            <div className="absolute w-full h-[230px] aspect-video top-0">
              <img src={image} alt={title} className="w-full h-full m-auto" />
            </div>

            {/* Bottom Half: Info Section */}
            <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-3">
              {/* Action Buttons Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Heart / Favorites Button */}
                  {added_to_list && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => onToggleFavorite(mal_id)}
                            className={`border-2 p-1.5 rounded-full transition-colors duration-200 cursor-pointer
            ${favorite
                                ? "border-red-500 text-red-500 hover:border-red-600 hover:bg-red-900/30"
                                : "border-gray-500 text-white hover:border-gray-400 hover:bg-zinc-800"
                              }`}
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {favorite ? "En favoritos" : "Añadir a favoritos"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  {/* Plus / Add to List Button */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={added_to_list ? onRemoveFromList : onToggleAddToList}
                          className={`border-2 p-1.5 rounded-full transition-colors duration-200 cursor-pointer
          ${added_to_list
                              ? "border-purple-500 text-purple-500 hover:border-purple-600 hover:bg-purple-900/30"
                              : "border-gray-500 text-white hover:border-gray-400 hover:bg-zinc-800"
                            }`}
                        >
                          {added_to_list ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {added_to_list ? "Quitar de lista" : "Añadir a lista"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>


                </div>

                {/* Expansion/Details Arrow */}
                <button className="border-2 border-gray-500 text-white p-1.5 rounded-full hover:border-white hover:bg-zinc-800 transition-colors duration-200 cursor-pointer">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Information (Title, details) */}
              <div>
                <h3 className="text-white font-bold text-base leading-tight line-clamp-2 mb-1">
                  {title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span
                  className={`
                              flex items-center gap-1
                              ${score >= 7 ? "text-green-500" : score >= 5 ? "text-yellow-500" : "text-red-500"}
                            `}
                >
                  {score}
                  <StarIcon className="w-4 h-4" />
                </span>
                <span className="text-gray-400">
                  {episodes > 0 ? `${episodes} Episodios` : "Emisión"}
                </span>
              </div>

              {/* Genres */}
              <div
                className={`flex text-xs font-medium ${genres.length === 1
                  ? "justify-center text-gray-400"
                  : "gap-2 text-gray-400"
                  }`}
              >
                {genres.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {genre.name}
                    {genres.length > 1 &&
                      index < genres.slice(0, 3).length - 1 &&
                      " •"}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiCard;
