import React, { useState, useEffect, useContext } from 'react';
import PostHomepage from './PostHomepage';

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


  return (
    <div>
        <h1 className={`posts-container`}>Bloposts</h1>
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
