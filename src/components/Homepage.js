import React, { useState, useEffect, createContext, useContext } from 'react';
import PostHomepage from './PostHomepage';
import "../App.css"
import PostList from './PostList';
import ThemeContext from '../contexts/ThemeContext';


export default function Homepage() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
      <h1 className={`${theme}`}>Welcome to the homepage!</h1>
  )
}
