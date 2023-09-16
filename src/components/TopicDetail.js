import React, { useEffect, useState, lazy } from "react";
import { useParams, Link } from "react-router-dom";
import PostShort from "./PostShort";

import BeachImg from "./images/Beach.jpeg";
import CityImg from "./images/City.jpeg";
import DesertImg from "./images/Desert.jpeg";
import MountainsImg from "./images/Mountains.jpeg";
import TropicsImg from "./images/Tropics.jpeg";
import WinterImg from "./images/Winter.jpeg";
import SeaGif from "./videos/Sea.gif";

export default function TopicDetail() {
  const [blogposts, setBlogposts] = useState([]);
  const [topic, setTopic] = useState(null);
  const loggedIn = localStorage.getItem("token");

  const { topicId } = useParams();

  const imageMap = {
    Beach: { image: BeachImg, color: "#8ecae6" },
    City: { image: CityImg, color: "#edede9" },
    Desert: { image: DesertImg, color: "#ead2ac" },
    Mountains: { image: MountainsImg, color: "#dde5b6" },
    Tropics: { image: TropicsImg, color: "#ffc971" },
    Winter: { image: WinterImg, color: "#caf0f8" },
  };

  useEffect(() => {
    async function getBlogpostsForTopic() {
      try {
        const response = await fetch(
          `https://blog-api-production-c42d.up.railway.app/api/topics/${topicId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setTopic(data.topic.title);
          setBlogposts(data.decodedBlogpost);
        } else {
          const errorData = await response.json();
          console.error("error getting blogposts for topic", errorData);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getBlogpostsForTopic();
  }, [topicId]);

  if (!blogposts) {
    return (
      <div className="blogpost-detail-container h-screen md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto mb-3 p-3">
        <p className="dark:text-white">Loading ... </p>
      </div>
    );
  }

  return (
    <div className="p-2 mx-2 h-screen">
      {topic ? (
        <div
          className="relative overflow-hidden rounded-3xl my-3 w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto"
          style={{ height: "450px" }}
        >
          <div
            className="bg-image-container absolute inset-0 bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${imageMap[topic].image})`,
              height: "450px",
            }}
          ></div>
          <h2 className="topic--bg font-secondary text-3xl font-bold absolute dark:text-white bottom-0 left-0 z-10 p-2">
            {topic}
          </h2>
        </div>
      ) : null}
      {blogposts.length < 1 && (
        <>
          <div
            className="relative h-72 p-4 bg-cover rounded-3xl md:h-[400px]"
            style={
              blogposts.length < 1 ? { backgroundImage: `url(${SeaGif})` } : {}
            }
          >
            <div className="absolute inset-0 rounded-3xl bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-30"></div>
            <h1 className="relative text-black dark:text-white font-extrabold text-2xl md:text-6xl">
              No posts yet. Be the first one to blog about this destination
            </h1>
            {loggedIn ? (
              <h1 className="relative pt-2 md:pt-4 dark:text-white font-semibold md:text-2xl opacity-70">
                <span className="underline">
                  <Link to={"/newpost"}>Click here</Link>
                </span>{" "}
                to write a new blog!
              </h1>
            ) : (
              <h1 className="relative pt-2 md:pt-4 dark:text-white font-semibold md:text-2xl opacity-70">
                <span className="underline">
                  <Link to={"/authenticate"}>Click here</Link>
                </span>{" "}
                to sign up!
              </h1>
            )}
          </div>
        </>
      )}

      {blogposts.map((post) => {
        return (
          <PostShort
            key={post._id}
            blogpostId={post._id}
            username={post.user.username}
            userId={post.user._id}
            title={post.title}
            text={post.text}
            timestamp={post.timestamp}
            topic={topic}
          />
        );
      })}
    </div>
  );
}
