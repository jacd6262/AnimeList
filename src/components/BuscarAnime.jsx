import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const BuscarAnime = ({animeSearch}) => {

    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search.trim().length <=2) return;
        animeSearch(search);
    }

    const handleSearch = ({target})=>{
      setSearch(target.value);
    }

    return (
        <form className='flex gap-0.5' onSubmit={handleSubmit}>
            <input
                class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-900 focus:ring-sky-900 focus:ring-1 sm:text-sm" placeholder="Anime..." type="text" name="search"
                value={search}
                onChange={handleSearch}
            />
            <button
                className="bg-slate-900 text-white px-4 py-2 rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
                <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
        </form>
    )
}

export default BuscarAnime