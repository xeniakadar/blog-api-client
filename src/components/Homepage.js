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
import ItalyFig from './videos/Italy.gif';

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
    'Beach': { image: BeachImg, color: '#90e0ef' },
    'City': { image: CityImg, color: '#edede9' },
    'Desert': { image: DesertImg, color: '#ead2ac' },
    'Mountains': { image: MountainsImg, color: '#dde5b6' },
    'Tropics': { image: TropicsImg, color: '#ffc971' },
    'Winter': { image: WinterImg, color: '#caf0f8' }
  };

  let previewTextFirst = "";
  let latestBlogpostId = "";
  if (blogposts && blogposts.length > 0) {
    previewTextFirst = createPreview(blogposts[0].text, 450);
    latestBlogpostId = blogposts[0]._id
  }

  return (
    <div className='p-2 m-2'>
      {displayName && <h1 className={`homepage mb-2 font-secondary font-semibold text-2xl`}>{`Welcome to TripTrek, ${displayName}!`}</h1> }
      {!displayName &&<h1 className={`homepage mb-2 font-secondary font-semibold text-2xl`}>Welcome to the homepage!</h1> }
      <div className="grid md:grid-cols-2 gap-5">
      <div className=" md:col-span-1 p-4 bg-cover rounded-3xl md:h-[500px]" style={blogposts && blogposts.length > 0 ? { backgroundImage: `url(${PalmGif})` } : {}}>

      </div>
        <div className=" md:col-span-1 h-max md:row-span-2 p-4 bg-cover rounded-3xl" style={blogposts && blogposts.length > 0 ? { backgroundColor: imageMap[blogposts[0].topic.title].color } : {}}>
            <NavLink to="/blogposts">
                <h2 className='bg-white bg-opacity-50 font-secondary font-bold w-m text-lg rounded-2xl p-3 mb-2 transition-all ease-in-out duration-300 text-sky-950 hover:text-sky-500'>Check out the latest blogposts</h2>
            </NavLink>
            {blogposts && blogposts.length > 0 && (
                <div className='bg-white rounded-2xl p-3'>
                    <NavLink to={`/blogposts/${latestBlogpostId}`}>
                        <h3 className='pb-2 w-max rounded-2xl font-secondary text-sm md:text-lg font-bold'>{blogposts[0].title}</h3>
                    </NavLink>
                    <p className='font-primary font-light md:text-sm'>{previewTextFirst}</p>
                    <div className='info text-sky-900 pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-medium'>
                        <p>{blogposts[0].username} - <span>{formatTimestamp(blogposts[0].timestamp)}</span></p>
                    </div>
                </div>
            )}
        </div>

        <div className=" md:col-span-1 p-4 bg-cover rounded-3xl md:h-[500px]" style={blogposts && blogposts.length > 0 ? { backgroundImage: `url(${TravelImg})` } : {}}>
            <NavLink to="/topics">
                <button className='blogposts--btn font-secondary font-bold text-sm md:text-xl md:text-white hover:text-sky-500 transition-all ease-in-out duration-300 p-2 rounded'>Explore posts by your dream destinations and find your next adventure</button>
            </NavLink>
        </div>

        <div className="rounded-3xl font-secondary font-bold md:col-span-1 p-4 bg-sky-800 text-white" >
            {displayName ?
                <NavLink to="/newpost">
                  <h2 className='homepage text-xl md:text-2xl hover:text-sky-500 transition-all ease-in-out duration-300'>Share your journey with us. Craft your travel story and inspire wanderlust around the world!</h2>
                </NavLink>
                :
                <NavLink to="/authenticate">
                  <h2 className='homepage text-xl md:text-2xl hover:text-sky-500 transition-all ease-in-out duration-300'>Discover the world with TripTrek! Sign up today to join our vibrant community of travelers and unlock exclusive features and insights tailored just for you. Dive in and start your journey!</h2>
                </NavLink>
            }
        </div>
    </div>
    </div>




  )
}
