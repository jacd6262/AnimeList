import { useState, useEffect } from "react";

export function useFetchAnime() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.jikan.moe/v4/top/anime?sfw");
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        const json = await res.json();
        console.log(json);
        setData(json.data); // la API devuelve los animes en `data`
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}