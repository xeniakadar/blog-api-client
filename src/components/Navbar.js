import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tripImg from './images/triptrek.png';
import darkTripImg from './images/triptrek-dark.png';
import DarkModeToggle from './DarkModeToggle';
import ThemeContext from "../contexts/ThemeContext";
import UserContext from "../contexts/UserContext";

import "../App.css"

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);


  const [menuVisible, setMenuVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);


  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme'));
    };

    setCurrentUserId(localStorage.getItem("userId"));

    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUser({ id: storedUserId});
    }

    window.addEventListener('storage', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 770) {
       toggleMenu();
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  }

  return (
    <nav className="p-2 z-70 relative">
       <ul className="flex justify-between items-center list-none m-0 p-0">
        <li>
            <Link to={"/"} className="home-btn">
                {theme === "light"
                ? <img src={tripImg} className="h-10 md:h-12 " alt="home" />
                : <img src={darkTripImg} className="h-10 md:h-12" alt="home" />}
            </Link>
        </li>
        <button className={`absolute top-2 right-2 w-24 text-center font-bold md:hidden z-50 border-2 rounded-2xl border-gray-950 dark:border-white dark:text-white p-2 ${menuVisible? "bg-black text-white" : ""}`} onClick={toggleMenu}>
            {menuVisible ? "Close" : "Menu"}
          </button>

        <li className="relative w-full md:flex md:justify-end">
          <div className={`navbar--right ${menuVisible ? 'absolute md:relative mt-8 flex top-full -right-2 md:right-0 z-60 border-2 border-black dark:border-white' : 'hidden'} md:flex flex-col w-full justify-end items-end bg-white dark:bg-sky-950 md:bg-black/[.06] dark:md:bg-white/[.1] md:rounded-2xl z-20 leading-16 md:flex-row md:w-fit md:h-auto rounded-3xl`}>
            <DarkModeToggle />
            <Link to={"/"} onClick={handleLinkClick} className="dark:text-white text-black hover:underline border-y-2 border-y-black dark:border-y-white md:border-none w-full md:w-auto p-4 text-3xl  md:text-xl md:text-black">Homepage</Link>
            <Link to={"/blogposts"} onClick={handleLinkClick} className="dark:text-white text-black hover:underline border-b-2 border-b-black dark:border-b-white   md:border-none w-full md:w-auto p-4 text-3xl md:text-xl md:text-black">Blogposts</Link>
            <Link to={"/topics"} onClick={handleLinkClick} className="dark:text-white text-black hover:underline border-b-2 border-b-black dark:border-b-white  md:border-none w-full md:w-auto p-4 text-3xl  md:text-xl md:text-black">Destinations</Link>
            {localStorage.getItem("token") !== null &&  <Link to={"/newpost"} onClick={handleLinkClick} className="dark:text-white text-black hover:underline border-b-2 border-b-black dark:border-b-white  md:border-none w-full md:w-auto p-4 text-3xl md:text-xl md:text-black">Create Post</Link> }
            {localStorage.getItem("token") !== null && user && <Link to={`/users/${currentUserId}`} onClick={handleLinkClick} className="dark:text-white text-black hover:underline border-b-2 border-b-black dark:border-b-white  md:border-none w-full md:w-auto p-4 text-3xl md:text-xl md:text-black">Profile</Link> }
            {localStorage.getItem("token") !== null && <Link to={"/"} onClick={logoutUser} className="dark:text-white text-black hover:underline  w-full md:w-auto p-4 text-3xl  md:text-xl md:text-black">Log out</Link>}
            {localStorage.getItem("token") === null &&
                <Link to={"/authenticate"} onClick={handleLinkClick} className="dark:text-white text-black hover:underline w-full md:w-auto p-4 text-3xl  md:text-xl   md:text-black">Login / Sign up</Link>
            }
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
