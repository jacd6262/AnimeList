import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import Card from "../components/Card";
import Pagination from "../components/Pagination";

const Season = () => {

    const [seansonDetail, setSeasonDetail] = useState("");
    const [seansonYear, setSeasonYear] = useState("");
    const [getSeason, setGetSeason] = useState([{ season: "", year: "" }]);
    const [animeSeason, setAnimeSeason] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [ispagination, setIspagination] = useState(false);
    const currentYear = new Date().getFullYear();
    const years = [];
    const [pageActive, setPageActive] = useState(1);
    const items = [];

    // Genera los años desde el actual hasta 1990
    for (let i = currentYear; i >= 1990; i--) {
        years.push(i);
    }

    const handleSeasonChange = (e) => {
        setSeasonDetail(e.target.value);
        getSeason.season = e.target.value;
    }

    const habndleYearChange = (e) => {
        setSeasonYear(e.target.value);
        getSeason.year = e.target.value;
    }

    const handlegetSeason = async ({ season, year }, page) => {
        const URL = `https://api.jikan.moe/v4/seasons/${year}/${season}?limit=20&page=${page}`;
        const resp = await fetch(URL);
        const { pagination, data } = await resp.json();
        setAnimeSeason(data);
        setCurrentPage(pagination);
        setIspagination(true);
    }

    // console.log(currentPage);

    useEffect(() => {
        pageActive > 1 && handlegetSeason(getSeason, pageActive);
    }, [pageActive])


    return (
        <Layout>
            <div className="flex justify-center items-center gap-4">
                <select
                    name="temporada"
                    id="temporada"
                    className="border-2 border-slate-900 rounded-md p-2"
                    value={seansonDetail}
                    onChange={handleSeasonChange}>
                    <option >seleccione temporada</option>
                    <option value="winter">Invierno</option>
                    <option value="summer">Verano</option>
                    <option value="fall">Otoño</option>
                    <option value="spring">Primavera</option>
                </select>
                <select
                    name="año" id="año" className="border-2 border-slate-900 rounded-md p-2"
                    value={seansonYear}
                    onChange={habndleYearChange}
                >
                    <option>Seleccione año</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-slate-900 text-white rounded-md p-2 hover:bg-slate-700"
                    onClick={() => handlegetSeason(getSeason, pageActive)}
                >Buscar</button>
            </div>
            <div className="grid grid-cols-4 w-full max-w-screen-lg mt-8">
                {
                    animeSeason?.map((item) => {
                        items.push(item.title);
                        return (
                            items.filter((itendo) => itendo ===item.title).length <= 1 &&
                            <Card anime={item} key={item.mal_id} />
                        )
                    }
                    )
                }
            </div>
            {ispagination && <Pagination pagination={currentPage} setPageActive={setPageActive} />}
        </Layout>
    )
}

export default Season