import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Проверяем localStorage и системные настройки
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        return storedTheme || (systemPrefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
        // Применяем тему при загрузке и изменении
        document.body.className = theme;
        document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#242424';
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};