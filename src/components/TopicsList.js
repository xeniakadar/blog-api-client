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
    <div className='topics-container'>
      <h1>Destinations</h1>
      {topics.map((topic) => {
        const topicImage = imageMap[topic.title];
        return (
          <div key={topic._id}>
            <h2> <Link to={`${topic._id}`}>{topic.title}</Link> </h2>
            <img src={topicImage} alt={`${topic.title}`} />
          </div>
        )
      })}
    </div>
  )

}
