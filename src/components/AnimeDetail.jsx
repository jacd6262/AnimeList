import React from 'react'
import { useContext } from 'react'
import { Contexto1Context } from '../context/Contexto1'
import { XMarkIcon, HeartIcon, QueueListIcon } from "@heroicons/react/24/solid"
import '../index.css'

const AnimeDetail = () => {

    const { animeContext, isAnimeDetail, setIsAnimeDetail } = useContext(Contexto1Context);

    console.log(animeContext);


    return (
        <>
            {isAnimeDetail && <aside className="anime-detail p-6 bg-white/80 fixed top-28 right-0 box-sizing: border-box; border-2 border-slate-900" >
                <button
                    className='absolute top-0 right-0 m-4 '
                    onClick={() => { setIsAnimeDetail(false) }}
                >
                    <XMarkIcon className='h-8 w-8 text-slate-900' aria-hidden="true" />
                </button>
                <div className='flex flex-col gap-4 justify-center items-center mt-5'>
                    <h2 className='font-semibold text-slate-900'>{animeContext.title}</h2>
                    <img src={animeContext.images.webp.image_url} alt={animeContext.title} />
                    <p className='overflow-auto max-h-[130px]' >{animeContext.synopsis}</p>
                    <ul>
                        <li> <span>Status:</span> {animeContext.status}</li>
                        <li> <span>Episodios:</span> {animeContext.episodes}</li>
                        <li> <span>Score:</span> {animeContext.score}</li>
                        <li> <span>Estreno:</span> {animeContext.aired.string}</li>
                    </ul>
                    <div className='flex gap-3'>
                        <button className="rounded-full bg-slate-900 p-2 text-white hover:bg-slate-500">  Añadir a favoritos </button>
                    </div>
                </div>
            </aside>}
        </>
    )
}

export default AnimeDetail