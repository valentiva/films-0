import React, { useState } from "react";
import { useLang } from "../services/LangContext";

const Search = ({ searchMovies }) => {
    const { lang } = useLang();
    const [search, setSearch] = useState('');

    const t = {
        ru: {
            placeholder: "Введите название фильма",
            button: "Поиск"
        },
        en: {
            placeholder: "Search by name",
            button: "Search"
        }
    }[lang];

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            searchMovies(search);
        }
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="input-field search_field">
                    <input
                        className="validate custom_input"
                        placeholder={t.placeholder}
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKey}
                    />
                    <button 
                        className="btn search_btn deep-purple darken-2"
                        onClick={() => searchMovies(search)}
                    >
                        {t.button}
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Search };