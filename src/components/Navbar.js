import React, {useContext} from 'react';
import ThemeContext from '../contexts/ThemeContext';

export default function Navbar () {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme}>Change to ${() => theme ==="light" ? "Dark" : "Light"} theme</button>
  )

}
