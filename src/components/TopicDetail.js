import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';
import PostHomepage from './PostHomepage';

export default function TopicDetail() {
  const [blogposts, setBlogposts] = useState(null);
  const [topic, setTopic] = useState(null);

  const {topicId} = useParams();



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
          setBlogposts(data);
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
    <div>
      <h1>{topic}</h1>

      {blogposts.blogpostsInTopic.map(post => {
        return (
          <PostHomepage
          key={post._id}
          blogpostId={post._id}
          username={post.username}
          title={post.title}
          text={post.text}
          timestamp={post.timestamp}
          />
        )
      })}
    </div>
  )
}
