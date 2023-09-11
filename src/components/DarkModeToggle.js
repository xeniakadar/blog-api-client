import React from 'react';
import { useEffect, useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ThemeContext from '../contexts/ThemeContext';

export default function DarkModeToggle() {

  const { theme, setTheme } = useContext(ThemeContext);

  function toggleDarkMode() {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);


  return (
    <DarkModeSwitch
    style={{ margin: '0.8rem' }}
    checked={theme === "dark"}
    onChange={toggleDarkMode}
    size={35}
  />
  );
}
