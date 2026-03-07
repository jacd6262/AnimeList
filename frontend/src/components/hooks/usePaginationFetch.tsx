import { useState, useEffect } from "react";

const usePaginationFetch = (urlBase: string, query: string) => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchData = async () => {
      setLoading(true);
      const url = new URL(urlBase);
      url.searchParams.set("sfw", "true");
      url.searchParams.set("page", String(page));
      if (query) url.searchParams.set("q", query);

      console.log(url.toString());

      try {
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        console.log(json);
        setData(json.data || []);
        setPagination(json.pagination || null);
      } catch (error: any) {
        if (error.message.includes("429")) {
          console.error(
            "Demasiadas peticiones, intenta de nuevo en unos segundos"
          );
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlBase, page, query]); // ✅ dependencias correctas

  return { data, pagination, page, setPage, loading };
};

export default usePaginationFetch;
