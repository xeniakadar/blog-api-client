import React, {useContext, Fragment, useRef, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import PostHomepage from './PostShort';
import PostDropdown from './PostDropdown';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function UserDetail() {

  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const currentUserId = userId ||(user && user._id);
  const localUserId = localStorage.getItem("userId");

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

      if (response === []) {
        console.log("no drafts")
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
    if (user && user._id === currentUserId || localUserId === currentUserId) {
      fetchDrafts();
    }
  }, []);

  return (
    <>
      {/* <h1>Welcome to your page {user.username}!</h1> */}
      {publishedBlogposts.map((post) => (
        <div key={post._id}>
        <PostDropdown blogpost={post}/>
        <PostHomepage
        key={post._id}
        blogpostId={post._id}
        username={post.username}
        title={post.title}
        text={post.text}
        timestamp={post.timestamp}
        topic={post.topic.title}
        />
        </div>

      ))}

      <h1>Drafts</h1>

      {drafts.map((post) => (
        <div>
          <PostDropdown blogpost={post}/>
          <PostHomepage
          key={post._id}
          blogpostId={post._id}
          username={post.username}
          title={post.title}
          text={post.text}
          timestamp={post.timestamp}
          topic={post.topic.title}
          />
        </div>
      ))}
    </>
  )
}