import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  if (!topics) {
    return <p>Loading ... </p>
  }

  return (
    <div className='topics-container'>
      <h1>Topics</h1>
      {topics.map((topic) => {
        return (
          <h2 key={topic._id}> <Link to={`${topic._id}`}>{topic.title}</Link> </h2>
        )
      })}
    </div>
  )

}
