import React, { createContext, useState, useContext } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
    const [lang, setLang] = useState(sessionStorage.getItem('app_lang') || 'ru');

    const toggleLang = (newLang) => {
        setLang(newLang);
        sessionStorage.setItem('app_lang', newLang);
    };

    return (
        <LangContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);