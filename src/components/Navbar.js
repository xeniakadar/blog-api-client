import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import menuSVG from './images/menu.svg';
import closeSVG from './images/close.svg';
import "../App.css"

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  const logoutUser = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    window.location.reload();
  }

  return (
    <nav className="p-2 m-2">
      <ul className="flex justify-between list-none m-0 p-0">
        <li>
          <Link to={"/"} className="home-btn">
            <span>b</span>loggy
          </Link>
        </li>

        <li>
          <div className={`navbar--right ${menuVisible ? "flex" : "hidden"} flex-col justify-start items-end fixed top-0 left-0 w-full h-full bg-opacity-50 bg-red-500 z-50 backdrop-blur-md leading-16 md:flex-row md:static md:w-auto md:h-auto md:bg-transparent`}>
            <img src={closeSVG} className={`close-icon h-10 ${menuVisible ? "" : "hidden"}`} onClick={toggleMenu} />
            <Link to={"/blogposts"} onClick={toggleMenu} className="text-white font-bold py-2 px-4 text-3xl md:text-base md:text-gray-900">Blogposts</Link>
            <Link to={"/topics"} onClick={toggleMenu} className="text-white font-bold py-2 px-4 text-3xl md:text-base md:text-gray-900">Categories</Link>
            <Link to={"/newpost"} onClick={toggleMenu} className="text-white font-bold py-2 px-4 text-3xl md:text-base md:text-gray-900">Create Post</Link>
            {localStorage.getItem("token") !== "" &&  <Link to={"/"} onClick={logoutUser} className="text-white font-bold py-2 px-4 text-3xl md:text-base md:text-gray-900">Log out</Link>}
            {localStorage.getItem("token") === "" &&
            <Link to={"/authenticate"} onClick={toggleMenu} className="text-white font-bold py-2 px-4 text-3xl md:text-base md:text-gray-900">Register</Link>
            }
          </div>

          <img src={menuSVG} className="menu-icon block h-10 md:hidden" onClick={toggleMenu} />
        </li>
      </ul>
    </nav>

  );
}

export default Navbar;
