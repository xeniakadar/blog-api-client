import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';

export default function PostCreate() {
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
          setSelectedTopic(data[0]?._id || null)
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
  async function saveDraft(e) {
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
    return (
      <div className='dark:bg-sky-950 blogpost-detail-container h-screen md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto mb-3 p-3'>

        <p className='dark:text-white'>Loading ... </p>
      </div>
    )
  }

  return (
    <div className='blogpost-detail-container max-h-full md:w-9/10  lg:max-w-2xl mx-auto p-3 min-h-screen'>

      <h1 className='mx-4 dark:text-white pb-2 z-0 text-3xl md:text-5xl font-extrabold'>Create Post</h1>

      <form className='flex flex-col mx-4 '>
        <div className='relative border p-2 mt-2  ' >
          <label htmlFor="title" className="absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs -translate-y-2/4" >
            Title
          </label>
          <input type="text" className='w-full bg-sky-100 dark:bg-black dark:text-white rounded-2xl p-2 focus:outline-none' id="title" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='relative border p-2 mt-2' >
          <label htmlFor="text" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs -translate-y-2/4'>Post</label>
          <textarea className=' w-full dark:bg-black dark:text-white focus:outline-none bg-sky-100 rounded-2xl p-2' id="text" placeholder='What are your thoughts?' value={text} onChange={e => setText(e.target.value)} />
        </div>

        <label htmlFor="topic" className='dark:text-white pt-3 pb-2'>Select Topic:</label>
        <select name="topic" id="topic" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base md:text-lg'  value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>{topic.title}</option>
          ))}
        </select>
        <button className='btn-submit mt-4 w-full md:w-36 border-2 bg-sky-800 text-white rounded-xl px-3 py-2 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' onClick={saveDraft} >Save Draft</button>
        <button className='btn-submit mt-4 w-full md:w-36 border-2 bg-sky-800 text-white rounded-xl px-3 py-2 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' onClick={createBlogpost}>Create Post</button>
      </form>

    </div>
  )
}
