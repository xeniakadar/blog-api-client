import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

export default function Navbar () {

  return (
    <nav>
      <ul>
        <Link to={"/"}>Home</Link>
        <Link to={"/blogposts"}>Blogposts</Link>
      </ul>
    </nav>
  )

}
