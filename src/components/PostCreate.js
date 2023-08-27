import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';

export default function PostCreate() {
  //
  //get topics
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/topics");
        const data = await response.json();

        if (response.ok) {
          setTopics(data);
          setSelectedTopic(data[0]?.title || null)
        } else {
          console.error("failed to fetch topics", data);
        }
      } catch (error) {
        console.error("an error occured while fetching topics:", error);
      }
    }

    fetchTopics();
  }, []);

  async function createBlogpost(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/blogposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "title": title,
          "text": text,
          "topic": selectedTopic,
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("blogpost created", data);
        navigate("/blogposts")
      } else {
        const errorData = await response.json();
        console.error("Error creating post :", errorData);
      }
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  }

  if (!topics) {
    return <p>Loading ... </p>
  }

  return (
    <div>
      <h1>Create Post</h1>

      <form onSubmit={createBlogpost}>
      <label htmlFor="title">Post title</label>
        <input type="text" id="title" placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
        <label htmlFor="text">Text Title</label>
        <input type="text" id="text" placeholder='your post' value={text} onChange={e => setText(e.target.value)} />
        <label htmlFor="topic">Topic</label>
        <select name="topic" id="topic">
          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>{topic.title}</option>
          ))}
        </select>
        <input className='btn-submit' type="submit" value="Create Post" />

      </form>

    </div>
  )
}
