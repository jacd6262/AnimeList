import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; // ícono opcional
import { useState } from "react";

type AnimeSearchBarProps = {
  onSearch: (query: string) => void;
};

const AnimeSearchBar = ({ onSearch }: AnimeSearchBarProps) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
      className="flex w-full max-w-md items-center gap-2 mx-auto mt-1"
    >
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar animes..."
        className="flex-1 bg-black/60 text-orange-50 placeholder-gray-500
             border border-orange-500/30 rounded-lg px-4 py-2
             focus:outline-none focus:bg-black/90
             focus:ring-2 focus:ring-orange-500 focus:border-orange-500
             focus-visible:ring-orange-500
             transition-all duration-300"
      />

      <Button
        type="submit"
        variant="default"
        className="bg-orange-600 hover:bg-orange-500 text-white font-bold
                   rounded-lg px-6 py-2 flex items-center gap-2
                   shadow-lg shadow-orange-900/20 hover:shadow-orange-700/40
                   transition-all duration-300 cursor-pointer"
      >
        <Search className="w-4 h-4" />
        Buscar
      </Button>
    </form>
  );
};

export default AnimeSearchBar;
