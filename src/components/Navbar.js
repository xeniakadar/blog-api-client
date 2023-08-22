import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import menuSVG from './images/menu.svg';
import closeSVG from './images/close.svg';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


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
            {/* <h1 className={`close-icon ${menuVisible ? "" : "show"}`} onClick={toggleMenu} >x</h1> */}
            <img src={closeSVG} className={`close-icon ${menuVisible ? "" : "show"}`} onClick={toggleMenu} />
            <Link to={"/blogposts"} onClick={toggleMenu} >Blogposts</Link>
            <Link to={"/topics"} onClick={toggleMenu} >Categories</Link>
            <Link to={"/blogposts/create"} onClick={toggleMenu} >Create Post</Link>
            <Link to={"/authenticate"} onClick={toggleMenu} >Login/Register</Link>
          </div>

          <img src={menuSVG} className="menu-icon" onClick={toggleMenu} />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
