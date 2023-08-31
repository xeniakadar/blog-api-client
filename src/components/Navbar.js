import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import menuSVG from './images/menu.svg';
import closeSVG from './images/close.svg';
import tripImg from './images/triptrek.png';
import "../App.css"

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 770) {
       toggleMenu();
    }
 };

  const logoutUser = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    window.location.reload();
  }

  return (
    <nav className="p-2 m-2">
       <ul className="flex justify-between items-center list-none m-0 p-0">
        <li>
            <Link to={"/"} className="home-btn">
                <img src={tripImg} className="h-10 md:h-12" alt="home" />
            </Link>
        </li>
        <li className="relative w-full">
        <button className={`fixed top-2 right-2 w-24 text-center font-bold md:hidden z-50 border-2 rounded-2xl border-gray-950 p-2 ${menuVisible? "bg-red-300" : ""}`} onClick={toggleMenu}>
          {menuVisible ? "Close" : "Menu"}
        </button>
        <div className={`navbar--right ${menuVisible ? 'absolute md:relative mt-8 flex top-full -right-2 md:right-0 z-60' : 'hidden'} md:flex flex-col w-full justify-end items-end bg-red-300 md:bg-white leading-16 md:flex-row md:w-auto md:h-auto rounded-3xl`}>
          <Link to={"/blogposts"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white w-full md:w-auto p-4 text-3xl  md:text-2xl  border-gray-700  md:text-gray-900">Blogposts</Link>
          <Link to={"/topics"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white w-full md:w-auto p-4 text-3xl  md:text-2xl  border-gray-700  md:text-gray-900">Destinations</Link>
          <Link to={"/newpost"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white w-full md:w-auto p-4 text-3xl  md:text-2xl  border-gray-700  md:text-gray-900">Create Post</Link>
          {localStorage.getItem("token") !== "" && <Link to={"/"} onClick={logoutUser} className="text-white hover:underline  w-full md:w-auto p-4 text-3xl  md:text-2xl  border-gray-700  md:text-gray-900">Log out</Link>}
          {localStorage.getItem("token") === "" &&
              <Link to={"/authenticate"} onClick={handleLinkClick} className="text-white hover:underline  w-full md:w-auto p-4 text-3xl  md:text-2xl  md:text-gray-900">Login / Sign up</Link>
          }
        </div>
        </li>
      </ul>
    </nav>


  );
}

export default Navbar;
