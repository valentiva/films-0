const API_KEY_TMDB = 'ab73cc6b9651891d6d3a1886a46a1b31';
const API_KEY_KP = 'e10593b3-468e-4fdf-9d2d-2fef87ff20b3'; 


const parseRating = (val) => {
    if (!val || val === 'null' || val === '-') return 0;
    let res = typeof val === 'string' && val.includes('%') ? parseFloat(val) / 10 : parseFloat(val);
    return isNaN(res) ? 0 : res;
};


export const formatMovieData = (m, source) => {
    const poster = m.posterUrl || m.posterUrlPreview || 
                  (m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null);
    return {
        Title: m.nameRu || m.nameEn || m.nameOriginal || m.title || "No Title",
        Year: m.year || (m.release_date ? m.release_date.split('-')[0] : '—'),
        imdbID: source === 'tmdb' ? `tmdb_${m.id}` : (m.kinopoiskId || m.filmId),
        Poster: poster || 'https://via.placeholder.com/300x450?text=No+Poster',
        rating: parseRating(m.ratingKinopoisk || m.rating || m.ratingImdb || m.vote_average),
        overview: m.description || m.shortDescription || m.overview || ""
    };
};

// апи
export const fetchFromApi = async (url, source) => {
    try {
        const headers = source === 'kp' ? { 'X-API-KEY': API_KEY_KP, 'Content-Type': 'application/json' } : {};
        const res = await fetch(url, { headers });
        const data = await res.json();
        const list = data.films || data.items || data.results || [];
        return list.map(item => formatMovieData(item, source));
    } catch (e) {
        console.error("Fetch error:", e);
        return [];
    }
};

// ссылкит
export const getUrl = (searchStr, lang) => {
    const tmdbLang = lang === 'ru' ? 'ru-RU' : 'en-US';
    if (searchStr.trim()) {
        const isRu = /[а-яё]/i.test(searchStr);
        const source = (isRu || lang === 'ru') ? 'kp' : 'tmdb';
        const url = source === 'kp'
            ? `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(searchStr)}`
            : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(searchStr)}&language=${tmdbLang}`;
        return { url, source };
    } else {
        const source = lang === 'ru' ? 'kp' : 'tmdb';
        const url = source === 'kp'
            ? 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL'
            : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=${tmdbLang}`;
        return { url, source };
    }
};

// детали фильма 
export const fetchMovieDetail = async (id, lang) => {
    const isTmdb = id.toString().startsWith('tmdb_');
    const tmdbLang = lang === 'ru' ? 'ru-RU' : 'en-US';

    try {
        if (isTmdb) {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id.replace('tmdb_', '')}?api_key=${API_KEY_TMDB}&language=${tmdbLang}`);
            const d = await res.json();
            return {
                title: d.title,
                poster: `https://image.tmdb.org/t/p/w500${d.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/original${d.backdrop_path}`,
                rating: d.vote_average,
                votes: d.vote_count,
                info: [d.release_date, `${d.runtime} min`],
                genres: d.genres.map(g => g.name),
                overview: d.overview,
                tagline: d.tagline
            };
        } else {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
                headers: { 'X-API-KEY': API_KEY_KP }
            });
            const d = await res.json();
            return {
                title: lang === 'en' ? (d.nameEn || d.nameRu) : (d.nameRu || d.nameEn),
                poster: d.posterUrl,
                backdrop: d.coverUrl || d.posterUrl,
                rating: parseRating(d.ratingKinopoisk || d.ratingImdb),
                votes: d.ratingKinopoiskVoteCount || 0,
                info: [d.year, d.filmLength ? `${d.filmLength} min` : '—'],
                genres: d.genres.map(g => g.genre),
                overview: d.description || d.shortDescription,
                tagline: d.slogan
            };
        }
    } catch (e) {
        console.error("Detail fetch error:", e);
        return null;
    }
};