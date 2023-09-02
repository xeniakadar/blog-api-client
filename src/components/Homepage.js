import React, { useState, useEffect, createContext, useContext } from 'react';
import "../App.css"
import { NavLink } from 'react-router-dom';
import createPreview from '../helpers/createPreview';
import { formatTimestamp } from '../helpers/formatTimestamp';
import BeachImg from './images/Beach.jpeg';
import CityImg from './images/City.jpeg';
import DesertImg from './images/Desert.jpeg';
import MountainsImg from './images/Mountains.jpeg';
import TropicsImg from './images/Tropics.jpeg';
import WinterImg from './images/Winter.jpeg';

export default function Homepage() {
  const [displayName, setDisplayName] = useState(null);
  const [blogposts, setBlogposts] = useState(null);

  useEffect(() => {
    setDisplayName(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    async function fetchBlogposts() {
      try {
        const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/blogposts");
        const data = await response.json();

        if (response.ok) {
          setBlogposts(data);
        } else {
          console.error("failed to fetch blogposts", data);
        }
      } catch (error) {
        console.error("an error occured:", error);
      }
    }

    fetchBlogposts();
  }, []);

  const imageMap = {
    'Beach': BeachImg,
    'City': CityImg,
    'Desert': DesertImg,
    'Mountains': MountainsImg,
    'Tropics': TropicsImg,
    'Winter': WinterImg
  }

  let previewText = "";
  if (blogposts && blogposts.length > 0) {
    previewText = createPreview(blogposts[0].text, 200);
  }


  return (
    <>
      {displayName && <h1 className={`homepage`}>{`Welcome to the homepage, ${displayName}!`}</h1> }
      {!displayName &&<h1 className={`homepage`}>Welcome to the homepage!</h1> }
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-1 md:row-span-2 bg-blue-200 p-4">
        {blogposts && blogposts.length > 0 && (
          <>
            <h1>{blogposts[0].title}</h1>
            <p>{previewText}</p>
            <div className='info text-sky-900 pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-bold'>
              <p>{blogposts[0].username} - <span>{formatTimestamp(blogposts[0].timestamp)}</span></p>
            </div>
          </>
        )}
        </div>
        <div className="md:col-span-1 bg-green-200 p-4">
        <NavLink to="/blogposts">
          <button className='blogposts--btn'>Read blogposts</button>
        </NavLink>
            Top Right Post
        </div>

        <div className="md:col-span-1 bg-red-200 p-4">
            Bottom Right Post
        </div>
      </div>
    </>




  )
}
