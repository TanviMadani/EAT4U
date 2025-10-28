import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode] = useState(true);

    useEffect(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {};

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext; 