import React, { useState, useEffect, createContext, useContext } from 'react';
import PostHomepage from './PostHomepage';
import "../App.css"
import { NavLink } from 'react-router-dom';
import PostList from './PostList';



export default function Homepage() {

  return (
    <>
      <h1 className={`homepage`}>Welcome to the homepage!</h1>
      <NavLink to="/blogposts">
        <button className='blogposts--btn'>Read blogposts</button>
      </NavLink>
    </>
  )
}
