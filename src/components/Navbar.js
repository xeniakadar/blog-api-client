import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import menuSVG from './images/menu.svg';
import closeSVG from './images/close.svg';

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
    <nav>
      <ul>
        <li>
          <Link to={"/"} className="home-btn">
            <span>b</span>loggy
          </Link>
        </li>

        <li>
          <div className={`navbar--right ${menuVisible ? "show" : ""}`}>
            <img src={closeSVG} className={`close-icon ${menuVisible ? "" : "show"}`} onClick={toggleMenu} />
            <Link to={"/blogposts"} onClick={toggleMenu} >Blogposts</Link>
            <Link to={"/topics"} onClick={toggleMenu} >Categories</Link>
            <Link to={"/newpost"} onClick={toggleMenu} >Create Post</Link>
            {localStorage.getItem("token") !== "" &&  <Link to={"/"} onClick={logoutUser} >Log out</Link>}
            {localStorage.getItem("token") === "" &&
            <Link to={"/authenticate"} onClick={toggleMenu}>Register</Link>
            }
          </div>

          <img src={menuSVG} className="menu-icon" onClick={toggleMenu} />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
