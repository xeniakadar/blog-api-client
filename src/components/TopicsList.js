import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BeachImg from './images/Beach.jpeg';
import CityImg from './images/City.jpeg';
import DesertImg from './images/Desert.jpeg';
import MountainsImg from './images/Mountains.jpeg';
import TropicsImg from './images/Tropics.jpeg';
import WinterImg from './images/Winter.jpeg';

export default function Topics() {

  const [topics, setTopic] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/topics");
        const data = await response.json();

        if (response.ok) {
          setTopic(data);
        } else {
          console.error("failed to fetch topics", data);
        }
      } catch (error) {
        console.error("an error occured while fetching topics:", error);
      }
    }

    fetchTopics();
  }, []);

  const imageMap = {
    'Beach': BeachImg,
    'City': CityImg,
    'Desert': DesertImg,
    'Mountains': MountainsImg,
    'Tropics': TropicsImg,
    'Winter': WinterImg
  }

  if (!topics) {
    return <p>Loading ... </p>
  }

  return (
    <div className='topics-container p-2 m-2 z-10'>
        <h1 className='font-sans pb-2 z-0 text-3xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto'>Destinations</h1>
        {topics.map((topic) => {
            const topicImage = imageMap[topic.title];
            return (
              <Link key={topic._id} to={`${topic._id}`} className="">
                <div className="relative bg-no-repeat bg-cover rounded-3xl my-3 inverted-scoop -z-10 w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto" style={{ backgroundImage: `url(${topicImage})`, height: '450px' }}>
                  <h2 className="topic--bg font-secondary text-3xl font-bold absolute bottom-0 left-0 z-10 p-2">{topic.title}</h2>
                </div>
              </Link>
            )
        })}
    </div>
  )
}
