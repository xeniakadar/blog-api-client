import React, {useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function UserDetail() {

  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const currentUserId = userId ||(user && user._id);

  const [publishedBlogposts, setPublishedBlogposts] = useState([]);
  const [drafts, setDrafts] = useState([]);

  async function fetchPublishedBlogposts() {
    try {
      const response = await fetch(
        `https://blog-api-production-c42d.up.railway.app/api/users/${userId}/blogposts`,
        {
          headers: {
            'Content-Type': "application/json"
          }
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setPublishedBlogposts(data);
      } else {
        console.error("failed to fetch published blogposts", data);
      }
    } catch (error) {
      console.error("an error occured:", error);
    }
  }

  async function fetchDrafts() {
    try {
      const response = await fetch(
        `https://blog-api-production-c42d.up.railway.app/api/users/${userId}/drafts`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setDrafts(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("an error occured:", error);
    }
  }
  useEffect(() => {
    console.log(user)
    if (!currentUserId) return;
    console.log("currentUserId",currentUserId);
    console.log("userId",userId);
    fetchPublishedBlogposts();
    if (user && user._id === currentUserId) {
      fetchDrafts();
    }
  }, []);

  return (
    <>
      <h1>Welcome to your page user!</h1>
      {publishedBlogposts.map((blogpost) => {
        return (
          <div key={blogpost._id}>
            <h1>{blogpost.title}</h1>
            <p>{blogpost.text}</p>
          </div>
        )
      })}
      {drafts.map((blogpost) => {
        return (
          <div key={blogpost._id}>
            <h1 className='dark:text-white'>DRAFTS</h1>
            <h1>{blogpost.title}</h1>
            <p>{blogpost.text}</p>
          </div>
        )
      })}
    </>
  )
}
