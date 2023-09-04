import React from 'react';
import { useEffect, useState, useContext } from 'react';
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
    style={{ marginBottom: '0.8em', marginLeft: '1em' }}
    checked={theme === "dark"}
    onChange={toggleDarkMode}
    size={35}
  />
  );
}
