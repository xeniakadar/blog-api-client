import React, { useState, useEffect, useContext } from 'react';
import PostHomepage from './PostHomepage';
import BeachImg from './images/Beach.jpeg';
import CityImg from './images/City.jpeg';
import DesertImg from './images/Desert.jpeg';
import MountainsImg from './images/Mountains.jpeg';
import TropicsImg from './images/Tropics.jpeg';
import WinterImg from './images/Winter.jpeg';

export default function PostList() {

  const [blogposts, setBlogposts] = useState([]);

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

  if (!blogposts) {
    <h1>Loading</h1>
  }


  return (
    <div className={`posts-container -z-0 p-2 m-2 mb-0`}>
        <h1 className='font-sans pb-2 z-0 text-3xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto'>Bloposts</h1>
        {blogposts.map((post) => (
          <PostHomepage
          key={post._id}
          blogpostId={post._id}
          username={post.username}
          title={post.title}
          text={post.text}
          timestamp={post.timestamp}
          topic={post.topic.title}
          />
        ))}
      </div>
  )
}
