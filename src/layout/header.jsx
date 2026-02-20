import { Link } from 'react-router-dom';
import { useLang } from '../services/LangContext';

function Header() {
    const { lang, toggleLang } = useLang();

    const content = {
        ru: { main: 'Главная', top: 'Топ-100' },
        en: { main: 'Home', top: 'Top-100' }
    }[lang];

    return (
        <nav className="deep-purple darken-2">
            <div className="nav-wrapper container">
                <ul className="left">
                    <li><Link to="/" className="breadcrumb">{content.main}</Link></li>
                    <li><Link to="/top100">{content.top}</Link></li>
                </ul>

                <Link to="/" className="brand-logo center">
                    <span className="hide-on-small-only">Search4Movies</span>
                    <span className="hide-on-med-and-up">S4M</span>
                </Link>

                <ul className="right">
                    {['en', 'ru'].map((l) => (
                        <li key={l} style={{ marginLeft: '10px' }}>
                            <button 
                                onClick={() => toggleLang(l)}
                                className={`waves-effect btn-small ${lang === l ? 'deep-purple lighten-4 black-text' : 'white black-text'}`}
                            >
                                {l.toUpperCase()}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export { Header };