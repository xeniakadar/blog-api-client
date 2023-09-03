import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import tripImg from './images/triptrek.png';
import DarkModeToggle from './DarkModeToggle';

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
    <nav className="p-2 m-2 z-70 relative">
       <ul className="flex justify-between items-center list-none m-0 p-0">
        <li>
            <Link to={"/"} className="home-btn">
                <img src={tripImg} className="h-10 md:h-12" alt="home" />
            </Link>
        </li>
        <button className={`absolute top-2 right-2 w-24 text-center font-bold md:hidden z-50 border-2 rounded-2xl border-gray-950 p-2 ${menuVisible? "bg-black text-white" : ""}`} onClick={toggleMenu}>
            {menuVisible ? "Close" : "Menu"}
          </button>

        <li className="relative w-full md:flex md:justify-end">
          <div className={`navbar--right ${menuVisible ? 'absolute md:relative mt-8 flex top-full -right-2 md:right-0 z-60' : 'hidden'} md:flex flex-col w-full justify-end items-end bg-black md:bg-black/[.06] md:rounded-2xl z-20 leading-16 md:flex-row md:w-fit md:h-auto rounded-3xl`}>
            <DarkModeToggle />
            <Link to={"/"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white   md:border-none w-full md:w-auto p-4 text-3xl  md:text-xl  border-gray-700  md:text-black">Homepage</Link>
            <Link to={"/blogposts"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white   md:border-none w-full md:w-auto p-4 text-3xl  md:text-xl  border-gray-700  md:text-black">Blogposts</Link>
            <Link to={"/topics"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white  md:border-none w-full md:w-auto p-4 text-3xl  md:text-xl  border-gray-700  md:text-black">Destinations</Link>
            <Link to={"/newpost"} onClick={handleLinkClick} className="text-white hover:underline border-b-2 border-b-white  md:border-none w-full md:w-auto p-4 text-3xl  md:text-xl  border-gray-700  md:text-black">Create Post</Link>
            {localStorage.getItem("token") !== "" && <Link to={"/"} onClick={logoutUser} className="text-white hover:underline  w-full md:w-auto p-4 text-3xl  md:text-xl  border-gray-700  md:text-black">Log out</Link>}
            {localStorage.getItem("token") === "" &&
                <Link to={"/authenticate"} onClick={handleLinkClick} className="text-white hover:underline w-full md:w-auto p-4 text-3xl  md:text-xl  border-gray-700  md:text-black">Login / Sign up</Link>
            }
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
