import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../helpers/formatTimestamp";
import createPreview from "../helpers/createPreview";
import PostDropdown from "./PostDropdown";
import ThemeContext from "../contexts/ThemeContext";
import deleteBlogpost from "../helpers/deleteBlogpost";

export default function PostShort({
  title,
  text,
  username,
  timestamp,
  topic,
  blogpostId,
  userId,
  topicId,
}) {
  const { theme } = useContext(ThemeContext);
  const previewText = createPreview(text, 300);

  const colorMap = {
    Beach: { color: "#8ecae6" },
    City: { color: "#edede9" },
    Desert: { color: "#ead2ac" },
    Mountains: { color: "#dde5b6" },
    Tropics: { color: "#ffc971" },
    Winter: { color: "#caf0f8" },
  };

  const colorDarkMap = {
    Beach: { color: "#2b93c3" },
    City: { color: "#a1a18c" },
    Desert: { color: "#cc9337" },
    Mountains: { color: "#aabe49" },
    Tropics: { color: "#ec9200" },
    Winter: { color: "#3bc7e5" },
  };

  const colorDarkerMap = {
    Beach: { color: "#113b4e" },
    City: { color: "#424236" },
    Desert: { color: "#533b15" },
    Mountains: { color: "#454d1c" },
    Tropics: { color: "#1c1f0b" },
    Winter: { color: "#0d5666" },
  };

  const currentColorMap = theme === "dark" ? colorDarkerMap : colorMap;
  const currentUser = localStorage.getItem("userId");

  return (
    <div
      className="blogpost-container w-full md:w-9/10 lg:w-9/10 dark:text-white xl:w-88 xl:max-w-6xl mx-auto mb-3 rounded-2xl p-3"
      style={topic ? { backgroundColor: currentColorMap[topic].color } : {}}
    >
      <div className="post">
        <div className="flex justify-between">
          {topicId ? (
            <h2
              className="title  ease-in-out duration-300 w-max py-1 px-3 rounded-2xl md:text-lg font-secondary font-bold "
              style={
                topic
                  ? {
                      backgroundColor: colorDarkMap[topic].color,
                      color: colorMap[topic].color,
                    }
                  : {}
              }
            >
              {" "}
              <Link to={`/topics/${topicId}`}>{topic.toUpperCase()}</Link>{" "}
              <span>/</span>{" "}
              <span className="text-white">
                {" "}
                <Link to={`/blogposts/${blogpostId}`}>
                  {title.toUpperCase()}
                </Link>
              </span>{" "}
            </h2>
          ) : (
            <h2
              className="title ease-in-out duration-300 w-max py-1 px-3 rounded-2xl md:text-lg font-secondary font-bold "
              style={
                topic
                  ? {
                      backgroundColor: colorDarkMap[topic].color,
                      color: colorMap[topic].color,
                    }
                  : {}
              }
            >
              {topic.toUpperCase()} <span>/</span>{" "}
              <span className="text-white">
                {" "}
                <Link to={`/blogposts/${blogpostId}`}>
                  {title.toUpperCase()}
                </Link>
              </span>{" "}
            </h2>
          )}
          {currentUser === userId ? (
            <div className="ml-1">
              <PostDropdown
                blogpostId={blogpostId}
                deleteBlogpost={deleteBlogpost}
              />
            </div>
          ) : null}
        </div>
        <p className="text font-primary font-light text-sm md:text-base py-3">
          {previewText}
        </p>
      </div>
      <div
        className="info pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-bold"
        style={topic ? { color: colorDarkMap[topic].color } : {}}
      >
        <p>
          <Link to={`/users/${userId}`}>{username}</Link> -{" "}
          <span>{formatTimestamp(timestamp)}</span>
        </p>
      </div>
    </div>
  );
}
