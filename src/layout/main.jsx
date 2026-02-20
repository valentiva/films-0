import React, { useState, useEffect } from "react";
import { Movies } from "../componets/Movies";
import { Search } from "../componets/search";
import { fetchFromApi, getUrl } from "../services/api"; // Импортируем getUrl
import { useLang } from "../services/LangContext";
import { Skeleton } from "../componets/Skeleton";

const Main = () => {
    const { lang } = useLang();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMovies = async (str = "") => {
        setLoading(true);

        const { url, source } = getUrl(str, lang);
        
        const data = await fetchFromApi(url, source);
        setMovies(data);
        setLoading(false);
    };

    useEffect(() => {
        loadMovies();
    }, [lang]);

    return (
        <main className="container content fade_in">
            <Search searchMovies={loadMovies} />
            {loading ? <Skeleton /> : <Movies movies={movies} />}
        </main>
    );
};

export { Main };