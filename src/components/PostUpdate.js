import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PostUpdate() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const {blogpostId} = useParams();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/topics");
        const data = await response.json();

        if (response.ok) {
          setTopics(data);
        } else {
          console.error("failed to fetch topics", data);
        }
      } catch (error) {
        console.error("an error occured while fetching topics:", error);
      }
    }

    async function fetchBlogpost() {
      try {
        const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}`);
        const data = await response.json();

        if (response.ok) {
          setTitle(data.title);
          setText(data.text);
          setSelectedTopic(data.topic._id);
        } else {
          console.error("failed to fetch blogpost", data);
        }
      } catch (error) {
        console.error("an error occured while fetching blogpost:", error);
      }
    }

    fetchTopics();
    fetchBlogpost();
  }, [blogpostId]);

  async function updateDraft(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}`, {
        method: "PUT",
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
  async function updateAndPostBlogpost(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "title": title,
          "text": text,
          "topic": selectedTopic,
          "published": true,
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
    <div className='w-full  md:max-w-xl md:mx-auto'>
      <h1 className='mx-4 '>Update Post</h1>

      <form className='flex flex-col mx-4 '>
        <div className='relative border p-2 mt-2  ' >
          <label htmlFor="title" className="absolute top-0 left-2 bg-white px-1 text-xs -translate-y-2/4" >
            Title
          </label>
          <input type="text" className='w-full focus:outline-none' id="title" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='relative border p-2 mt-2' >
          <label htmlFor="text" className='absolute top-0 left-2 bg-white px-1 text-xs -translate-y-2/4'>Post</label>
          <textarea className=' w-full focus:outline-none' id="text" placeholder='What are your thoughts?' value={text} onChange={e => setText(e.target.value)} />
        </div>

        <label htmlFor="topic">Topic</label>
        <select name="topic" id="topic" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base md:text-lg'  value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>{topic.title}</option>
          ))}
        </select>
        <button className='btn-submit mt-4 w-full md:w-36 border-2 bg-sky-600 text-white rounded-xl px-3 py-2 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' onClick={updateAndPostBlogpost} >Update Post</button>
        <button className='btn-submit mt-4 w-full md:w-36 border-2 bg-sky-600 text-white rounded-xl px-3 py-2 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' onClick={updateDraft}>Save Draft</button>

      </form>

    </div>
  )
}
