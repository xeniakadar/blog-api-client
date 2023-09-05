import React, { useState, useEffect, useContext } from 'react';
import PostHomepage from './PostShort';

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

  if (!blogposts) {
    return (
      <div className='blogpost-detail-container h-screen md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto mb-3 p-3'>
        <p className='dark:text-white'>Loading ... </p>
      </div>
    )
  }


  return (
    <div className={`posts-container -z-0 p-2 mb-0`}>
        <h1 className='font-sans dark:text-white pb-2 z-0 text-3xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto'>Bloposts</h1>
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
