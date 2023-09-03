import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PostHomepage from './PostHomepage';
import BeachImg from './images/Beach.jpeg';
import CityImg from './images/City.jpeg';
import DesertImg from './images/Desert.jpeg';
import MountainsImg from './images/Mountains.jpeg';
import TropicsImg from './images/Tropics.jpeg';
import WinterImg from './images/Winter.jpeg';

export default function TopicDetail() {
  const [blogposts, setBlogposts] = useState(null);
  const [topic, setTopic] = useState(null);

  const {topicId} = useParams();

  const imageMap = {
    'Beach': { image: BeachImg, color: '#8ecae6' },
    'City': { image: CityImg, color: '#edede9' },
    'Desert': { image: DesertImg, color: '#ead2ac' },
    'Mountains': { image: MountainsImg, color: '#dde5b6' },
    'Tropics': { image: TropicsImg, color: '#ffc971' },
    'Winter': { image: WinterImg, color: '#caf0f8' }
  };

  useEffect(() => {
    async function getBlogpostsForTopic() {
      try {
        const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/topics/${topicId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTopic(data.topic.title);
          setBlogposts(data.decodedBlogpost);
        } else {
          const errorData = await response.json();
          console.error("error getting blogposts for topic", errorData)
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getBlogpostsForTopic();
  }, [topicId]);

  if (!blogposts) {
    return <p>No blogposts about this topic yet</p>
  }

  return (
    <div className='p-2 m-2'>
      {topic?
      <div className="relative bg-no-repeat bg-cover rounded-3xl my-3 -z-10 w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto" style={{ backgroundImage: `url(${imageMap[topic].image})`, height: '450px' }}>
        <h2 className="topic--bg font-secondary text-3xl font-bold absolute bottom-0 left-0 z-10 p-2">{topic}</h2>
      </div>
       : null}

      {blogposts.map(post => {
        return (
          <PostHomepage
          key={post._id}
          blogpostId={post._id}
          username={post.username}
          title={post.title}
          text={post.text}
          timestamp={post.timestamp}
          topic={topic}
          />
        )
      })}
    </div>
  )
}
