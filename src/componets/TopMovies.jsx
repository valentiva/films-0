import React, { useState, useEffect } from 'react';
import { Movies } from '../componets/Movies';
import { Preloader } from '../componets/preloader';
import { fetchFromApi } from '../services/api';
import { useLang } from '../services/LangContext';

const TopMovies = () => {
    const { lang } = useLang();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState(lang === 'ru' ? 'kp' : 'tmdb');

    const loadTop100 = async () => {
        setLoading(true);
        const allMovies = [];
        const tmdbLang = lang === 'ru' ? 'ru-RU' : 'en-US';

        const baseUrl = source === 'kp' 
            ? 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page='
            : `https://api.themoviedb.org/3/movie/top_rated?api_key=ab73cc6b9651891d6d3a1886a46a1b31&language=${tmdbLang}&page=`;

        try {
            for (let i = 1; i <= 5; i++) {
                const data = await fetchFromApi(`${baseUrl}${i}`, source);
                allMovies.push(...data);
                // gfepf паузща
                if (source === 'kp') await new Promise(r => setTimeout(r, 200));
            }
            setMovies(allMovies);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // язык
    useEffect(() => {
        loadTop100();
    }, [source, lang]);

    return (
        <div className="container content">
            <h2 className="center-align">
                {lang === 'ru' ? 'Топ-100 фильмов' : 'Top 100 Movies'}
            </h2>
            
            <div className="center-align" style={{ marginBottom: '2rem' }}>
                <button 
                    className={`btn ${source === 'kp' ? 'deep-purple' : 'grey'}`}
                    onClick={() => setSource('kp')}
                    style={{ marginRight: '10px' }}
                >
                    {lang === 'ru' ? 'Кинопоиск' : 'by Kinopoisk'}
                </button>
                <button 
                    className={`btn ${source === 'tmdb' ? 'deep-purple' : 'grey'}`}
                    onClick={() => setSource('tmdb')}
                >
                    {lang === 'ru' ? 'TMDB' : 'by TMDB'}
                </button>
            </div>

            {loading ? <Preloader /> : <Movies movies={movies} />}
        </div>
    );
};

export { TopMovies };