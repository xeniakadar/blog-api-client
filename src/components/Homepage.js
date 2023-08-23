import React, { useState, useEffect, createContext, useContext } from 'react';
import "../App.css"
import { NavLink } from 'react-router-dom';

export default function Homepage() {
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    setDisplayName(localStorage.getItem("username"));
  }, []);


  return (
    <>
    {displayName && <h1 className={`homepage`}>{`Welcome to the homepage, ${displayName}!`}</h1> }
    {!displayName &&<h1 className={`homepage`}>Welcome to the homepage!</h1> }
      <NavLink to="/blogposts">
        <button className='blogposts--btn'>Read blogposts</button>
      </NavLink>
    </>
  )
}
