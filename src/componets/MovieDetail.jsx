import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLang } from "../services/LangContext";
import { fetchMovieDetail } from "../services/api";

const Movie = () => {
    const { id } = useParams();
    const { lang } = useLang();
    const [movie, setMovie] = useState(null);

    useEffect(() => {

        setMovie(null); 
        fetchMovieDetail(id, lang).then(setMovie);
        window.scrollTo(0, 0);
    }, [id, lang]);

    const t = lang === 'ru' 
        ? { desc: 'Описание', votes: 'голосов', runtime: 'мин.' } 
        : { desc: 'Synopsis', votes: 'votes', runtime: 'min' };


    if (!movie) {
        return (
            <div className="movie fade_in">
                <div className="movie_intro">
                    <div className="movie_backdrop skeleton_pulse" style={{ height: '550px' }}></div>
                </div>
                <div className="movie_detail">
                    <div className="movie_detailLeft">
                        <div className="movie_poster skeleton_pulse" style={{ height: '450px', width: '300px' }}></div>
                    </div>
                    <div className="movie_detailRight">
                        <div className="movie_detailRightTop">
                            <div className="skeleton_pulse" style={{ height: '50px', width: '80%', marginBottom: '20px' }}></div>
                            <div className="skeleton_pulse" style={{ height: '20px', width: '40%', marginBottom: '20px' }}></div>
                            <div className="skeleton_pulse" style={{ height: '30px', width: '30%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="movie fade_in">
            <div className="movie_intro">
                <div className="movie_backdrop_container">
                    <img className="movie_backdrop" src={movie.backdrop} alt="backdrop" />
                    <div className="movie_overlay"></div> 
                </div>
            </div>

            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <img className="movie_poster" src={movie.poster} alt="poster" />
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{movie.title}</div>
                        <div className="movie_tagline">{movie.tagline}</div>
                        <div className="movie_rating">
                            ⭐ {movie.rating?.toFixed(1)} 
                            <span className="movie_voteCount">({movie.votes} {t.votes})</span>
                        </div>
                        <div className="movie_info_row">{movie.info?.join(' | ')} {t.runtime}</div>
                        <div className="movie_genres">
                            {movie.genres?.map((g, i) => (
                                <span className="movie_genre" key={i}>{g}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="movie_description_section container">
                <div className="synopsisText">
                    <div>{t.desc}</div>
                </div>
                <p className="movie_overview_text">{movie.overview}</p>
            </div>
        </div>
    );
};

export { Movie };