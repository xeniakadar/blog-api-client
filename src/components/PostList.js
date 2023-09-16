import React, { useState, useEffect } from "react";
import PostShort from "./PostShort";

export default function PostList() {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    async function fetchBlogposts() {
      try {
        const response = await fetch(
          "https://blog-api-production-c42d.up.railway.app/api/blogposts",
        );
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
      <div className="blogpost-detail-container h-screen md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto mb-3 p-3">
        <p className="dark:text-white">Loading ... </p>
      </div>
    );
  }

  return (
    <div
      className={`posts-container max-h-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl md:rounded-3xl md:p-6 min-h-screen mx-auto mt-3 p-3`}
    >
      <h1 className="font-secondary dark:text-white pb-2 z-0 text-4xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto">
        Blogposts
      </h1>
      {blogposts.map((post) => (
        <PostShort
          key={post._id}
          blogpostId={post._id}
          username={post.user.username}
          userId={post.user._id}
          title={post.title}
          text={post.text}
          timestamp={post.timestamp}
          topic={post.topic.title}
          topicId={post.topic._id}
        />
      ))}
    </div>
  );
}
