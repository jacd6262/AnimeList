import { useState, useRef } from "react";
import { ChevronDown, Heart, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

type AnimeCardProps = {
  title: string;
  synopsis: string;
  episodes: number;
  image: string;
};

const MiCard = ({ title, episodes, image }: AnimeCardProps) => {
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
      <Card className="w-full h-[250px] bg-pink-900 border-none rounded-md overflow-hidden shadow-md cursor-pointer">
        <img
          src={image}
          alt={title}
          className="absolute w-full h-full object-cover top-0 left-0 rounded-md"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-t from-black to-transparent rounded-md">
          <p className="text-white">{title}</p>
        </div>
      </Card>

      {/* 2) Expanded Hover Overlay (Netflix-style popout) */}
      {isHovered && (
        <Card
          className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[140%] w-min-[220px] h-[400px] bg-[#141414] border border-zinc-800 
            rounded-md overflow-hidden shadow-2xl shadow-black/80
            animate-in zoom-in-110 duration-3800 ease-out cursor-pointer
            focus:outline-none ring-1 ring-orange-500/50 transition-all duration-500 ease-in-out
            "
        >
          {/* Top Half: Image */}
          <div className="absolute w-full h-[230px] aspect-video top-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full m-auto"
            />
            {/* Remover el gradient para crear un "Sharp Line" entre imagen y panel */}
          </div>

          {/* Bottom Half: Info Section */}
          <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-3">
            {/* Action Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Heart / Favorites Button */}
                <button className="border-2 border-gray-500 text-white p-1.5 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-500 text-white p-1.5 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors duration-200">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Expansion/Details Arrow */}
              <button className="border-2 border-gray-500 text-white p-1.5 rounded-full hover:border-white hover:bg-zinc-800 transition-colors duration-200">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Information (Title, details) */}
            <div>
              <h3 className="text-white font-bold text-base leading-tight line-clamp-2 mb-1">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-green-500">Recomendado</span>
                <span className="text-gray-400 border border-gray-600 px-1 rounded-sm">
                  16+
                </span>
                <span className="text-gray-400">
                  {episodes > 0 ? `${episodes} Episodios` : "Emisión"}
                </span>
              </div>
            </div>

            <div className="flex gap-2 text-xs text-gray-400 font-medium">
              <span className="hover:text-orange-500 transition-colors">Acción</span> •
              <span className="hover:text-orange-500 transition-colors">Aventura</span> •
              <span className="hover:text-orange-500 transition-colors">Drama</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MiCard;
