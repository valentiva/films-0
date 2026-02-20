import { Link } from 'react-router-dom';

function MovieCard(props) {
    const {
        Title: title,
        Year: year,
        imdbID: id,
        Poster: poster,
        rating: rating,
        overview: overview
    } = props;

    const getRatingClass = (num) => {
        if (!num) return 'rating-grey';
        if (num >= 7.0) return 'rating-green';
        if (num >= 5.0) return 'rating-yellow';
        return 'rating-red';
    };

    return (
        <Link to={`/movie/${id}`} className="movie-card-link">
            <div className="movie-card-custom">
                <div className={`movie-rating-badge ${getRatingClass(rating)}`}>
                    {rating > 0 ? rating.toFixed(1) : '—'}
                </div>

                <div className="card-image-custom">
                    <img src={poster === 'N/A' ? `https://via.placeholder.com/300x450?text=${title}` : poster} alt={title} />
                    
                    <div className="card-overlay">
                        <div className="overlay-content">
                            <span className="overlay-title">{title}</span>
                            <p className="overlay-year">{year}</p>
                            {}
                            <p className="overlay-description">
                                {overview ? overview : "Описание временно отсутствует..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export { MovieCard };