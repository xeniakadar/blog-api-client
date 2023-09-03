import React from 'react';
import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  function toggleDarkMode() {
    setIsDark(!isDark);
  }

  return (
    <DarkModeSwitch
    style={{ marginBottom: '0.8em', marginLeft: '1em' }}
    checked={isDark}
    onChange={toggleDarkMode}
    size={35}
  />
  );
}
