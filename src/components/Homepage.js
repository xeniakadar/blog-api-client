import React, { useState, useEffect, createContext, useContext } from 'react';
import "../App.css"
import { NavLink } from 'react-router-dom';
import createPreview from '../helpers/createPreview';
import { formatTimestamp } from '../helpers/formatTimestamp';
import { useParams } from 'react-router-dom';
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

  let previewTextFirst = "";
  let latestBlogpostId = "";
  if (blogposts && blogposts.length > 0) {
    previewTextFirst = createPreview(blogposts[0].text, 120);
    latestBlogpostId = blogposts[0]._id
  }

  return (
    <div className='p-2 m-2'>
      {displayName && <h1 className={`homepage`}>{`Welcome to the homepage, ${displayName}!`}</h1> }
      {!displayName &&<h1 className={`homepage`}>Welcome to the homepage!</h1> }
      <div className="grid md:grid-cols-2 gap-4">
        <div className=" transition-transform duration-500 ease-in-out hover:scale-105 md:col-span-1 md:row-span-2 p-4 bg-cover rounded-3xl my-3 " style={blogposts && blogposts.length > 0 ? { backgroundImage: `url(${imageMap[blogposts[0].topic.title]})`, height: '450px' } : {}}>
          <h1 className='bg-white bg-opacity-50 font-secondary font-extrabold w-max text-xl rounded-2xl p-3 mb-2'>Check out the latest blogposts</h1>
          {blogposts && blogposts.length > 0 && (
            <div className='bg-white rounded-2xl p-3'>
              <NavLink to={`/blogposts/${latestBlogpostId}`}>
                <h1 className='pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-bold'>{blogposts[0].title}</h1>
              </NavLink>
              <p className='font-primary font-light'>{previewTextFirst}</p>
              <div className='info text-sky-900 pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-medium'>
                <p>{blogposts[0].username} - <span>{formatTimestamp(blogposts[0].timestamp)}</span></p>
              </div>
            </div >
        )}
        </div>
        <div className="md:col-span-1 bg-green-200 p-4">
        <NavLink to="/blogposts">
          <button className='blogposts--btn'>Read blogposts</button>
        </NavLink>
            Top Right Post
        </div>

        <div className="transform rounded-lg transition-transform hover:scale-110 md:col-span-1 bg-red-200 p-4">
            Bottom Right Post
        </div>
      </div>
    </div>




  )
}
