import { MovieCard } from './MovieCard';
import { useLang } from '../services/LangContext';

function Movies(props) {
    const { movies = [] } = props;
    const { lang } = useLang();

    const emptyText = lang === 'ru' ? 'Ничего не найдено' : 'Nothing found';

    return (
        <div className="movies">
            {movies.length ? (
                movies.map((movie) => (

                    <MovieCard key={movie.imdbID} {...movie} />
                ))
            ) : (
                <div className="center-align" style={{ width: '100%', marginTop: '2rem' }}>
                    <h4>{emptyText}</h4>
                </div>
            )}
        </div>
    );
}

export { Movies };