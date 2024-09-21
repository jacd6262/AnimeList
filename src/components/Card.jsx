import { PlusIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { Contexto1Context } from "../context/Contexto1"
const Card = ({ anime }) => {    

    const { setAnimeContext, setIsAnimeDetail,isAnimeDetail } = useContext(Contexto1Context);

    const handleclick = (anime,e) => {
        e.stopPropagation();
        setIsAnimeDetail(true);
        setAnimeContext(anime);
    }

    return (
        <div 
            className="cursor-pointer  w-56 h-[350px] pb-1 my-3 bg-slate-300 rounded-lg shadow-mb hover:shadow-2xl hover:border-2 box-sizing: border-box; border-slate-900 "
            onClick={(e)=> handleclick(anime,e) }
            >
            <figure className="relative mb-1 w-full h-[80%]">
                <img className="w-full h-full object-cover rounded-lg" src={anime.images.webp.image_url} alt="" />
            </figure>
            <div className="flex items-center justify-center flex-col px-2 overflow-auto h-[20%] ">
                <span className="font-semibold text-sm text-slate-900" >{anime.title}</span>
            </div>
        </div>
    )
}

export default Card