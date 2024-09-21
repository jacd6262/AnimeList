import { useState } from "react";
import BuscarAnime from "../components/BuscarAnime"
import Layout from "../components/Layout"
import { useEffect } from "react";
import Card from "../components/Card";

const Home = () => {

    const [getAnimeSearch, setGetAnimeSearch] = useState("");
    const [getAnime, setGetAnime] = useState([]);

    const getFetchAnime = async () => {
        const URL = `https://api.jikan.moe/v4/anime?q=${getAnimeSearch}`;
        const resp = await fetch(URL);
        const  {data}  = await resp.json();
        setGetAnime(data);
    }

    useEffect(() => {
        getFetchAnime();
    }, [getAnimeSearch])

   // console.log(getAnime);


    return (
        <Layout>
            <BuscarAnime animeSearch={setGetAnimeSearch} />
            <div className="grid grid-cols-4 w-full max-w-screen-lg mt-8">
                {
                    getAnime.map((item)=>(
                        <Card anime={item} key={item.mal_id}/>
                    ))
                }
            </div>
        </Layout>
    )
}

export default Home