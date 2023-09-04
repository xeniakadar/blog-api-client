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
import TravelImg from './images/Travel.jpeg'
import PalmGif from './videos/Palm.gif';
import ItalyGif from './videos/Italy.gif';
import SeaGif from './videos/Sea.gif';
import ThemeContext from '../contexts/ThemeContext';

export default function Homepage() {
  const [displayName, setDisplayName] = useState(null);
  const [blogposts, setBlogposts] = useState(null);
  const { theme } = useContext(ThemeContext);

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

  const colorMap = {
    'Beach': {  color: '#8ecae6' },
    'City': { color: '#edede9' },
    'Desert': { color: '#ead2ac' },
    'Mountains': { color: '#dde5b6' },
    'Tropics': { color: '#ffc971' },
    'Winter': { color: '#caf0f8' }
  };

  const colorDarkerMap = {
    'Beach': { color: '#113b4e' },
    'City': {  color: '#424236' },
    'Desert': { color: '#533b15' },
    'Mountains': { color: '#454d1c' },
    'Tropics': { color: '#1c1f0b' },
    'Winter': { color: '#0d5666' }
  };

  const currentColorMap = theme === 'dark' ? colorDarkerMap : colorMap;

  let previewTextFirst = "";
  let BlogpostIdFirst = "";
  if (blogposts && blogposts.length > 0) {
    previewTextFirst = createPreview(blogposts[0].text, 450);
    BlogpostIdFirst = blogposts[0]._id
  }
  let previewTextSecond = "";
  let BlogpostIdSecond = "";
  if (blogposts && blogposts.length > 0) {
    previewTextSecond = createPreview(blogposts[1].text, 450);
    BlogpostIdSecond = blogposts[1]._id
  }

  return (
    <div className='p-2 m-2'>
      {displayName && <h1 className={`homepage mb-2 font-secondary font-semibold text-2xl`}>{`Welcome to TripTrek, ${displayName}!`}</h1> }
      <div className="grid md:grid-cols-2 gap-5">
      <div className=" md:col-span-2 p-4 text-white bg-cover rounded-3xl h-48 md:h-[600px]" style={blogposts && blogposts.length > 0 ? { backgroundImage: `url(${PalmGif})` } : {}}>
            <NavLink to="/topics">
                <h1 className='blogposts--btn font-secondary text-left font-bold text-base md:text-7xl md:text-white hover:text-sky-200 transition-all ease-in-out duration-300 p-2 leading-6 '>Explore your dream destinations, delve into unique cultures, and find your next adventure.</h1>
            </NavLink>
        </div>
        <div className=" md:col-span-1 h-max md:row-span-2 p-4 bg-cover rounded-3xl" style={blogposts && blogposts.length > 0 ? { backgroundColor: currentColorMap[blogposts[0].topic.title].color } : {}}>
            <NavLink to="/blogposts">
                <h2 className='bg-white bg-opacity-50 font-secondary font-bold w-m text-lg rounded-2xl p-3 mb-2 transition-all ease-in-out duration-300 text-sky-950 hover:text-sky-400'>Click here for the latest blogposts!</h2>
            </NavLink>
            {blogposts && blogposts.length > 0 && (
              <>
                <div className='bg-white dark:bg-opacity-20 rounded-2xl p-3'>
                    <NavLink to={`/blogposts/${BlogpostIdFirst}`}>
                        <h3 className='pb-2 dark:text-white w-max rounded-2xl font-secondary text-sm md:text-lg font-bold hover:text-sky-500 transition-all ease-in-out duration-300 '>{blogposts[0].title}</h3>
                    </NavLink>
                    <p className='font-primary dark:text-white font-light md:text-sm'>{previewTextFirst}</p>
                    <div className='info text-sky-900  dark:text-opacity-40 dark:text-white  pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-medium'>
                        <p>{blogposts[0].username} - <span>{formatTimestamp(blogposts[0].timestamp)}</span></p>
                    </div>
                </div>
                <div className='bg-white dark:bg-opacity-20 rounded-2xl p-3 mt-2'>
                    <NavLink to={`/blogposts/${BlogpostIdSecond}`}>
                        <h3 className='pb-2 dark:text-white w-max rounded-2xl font-secondary hover:text-sky-500 text-sm md:text-lg font-bold transition-all ease-in-out duration-300'>{blogposts[1].title}</h3>
                    </NavLink>
                    <p className='font-primary dark:text-white font-light md:text-sm'>{previewTextSecond}</p>
                    <div className='info text-sky-900 dark:text-opacity-40 dark:text-white pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-medium'>
                        <p>{blogposts[1].username} - <span>{formatTimestamp(blogposts[1].timestamp)}</span></p>
                    </div>
                </div>
              </>
            )}
        </div>



        <div className="rounded-3xl font-secondary font-bold md:col-span-1 p-4 bg-sky-800 text-white" >
            {displayName ?
                <NavLink to="/newpost">
                  <h2 className='homepage text-xl md:text-2xl hover:text-sky-200 transition-all ease-in-out duration-300'>Share your journey with us. Craft your travel story and inspire wanderlust around the world!</h2>
                </NavLink>
                :
                <NavLink to="/authenticate">
                  <h2 className='homepage text-xl md:text-2xl'>Discover the world with TripTrek! <span className=' text-lime-100 hover:underline  transition-all ease-in-out duration-300'>Sign up</span> today to join our vibrant community of travelers and unlock exclusive features and insights tailored just for you. Dive in and start your journey!</h2>
                </NavLink>
            }
        </div>
        <div className=" md:col-span-1 h-72 row-span-3 p-4 bg-cover rounded-3xl md:h-[500px]" style={blogposts && blogposts.length > 0 ? { backgroundImage: `url(${ItalyGif})` } : {}}> </div>
    </div>
    </div>




  )
}
