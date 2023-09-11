import React, {useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import PostHomepage from './PostShort';

export default function UserDetail() {

  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const currentUserId = userId ||(user && user._id);
  const localUserId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [publishedBlogposts, setPublishedBlogposts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [postAuthor, setPostAuthor] = useState("");

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
        setPublishedBlogposts(data);
        if (data.length > 0 ) {
          setPostAuthor(data[0].user.username);
        }
      } else {
        console.error("failed to fetch published blogposts", data);
        throw new Error(`HTTP error! status ${response.status}`)
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
    fetchPublishedBlogposts();
    if ((user && user._id === currentUserId) || (localUserId === currentUserId)) {
      fetchDrafts();
    }
  }, []);

  return (
    <div className='-z-0 p-2 mb-0 max-h-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl md:rounded-3xl md:p-6 min-h-screen mx-auto mt-3 p-3'>
      { localUserId === currentUserId ?
        <div className='mb-3'>
          <h1 className=' dark:text-white font-secondary pb-2 z-0 text-3xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto'>Your posts</h1>
          <button className='btn-submit mt-4 w-max  border-2 bg-sky-400 dark:bg-sky-700 text-white rounded-xl px-3 py-2 hover:bg-white dark:hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' onClick={() => navigate("/newpost")}>Create Post</button>
        </div> :
        <div className='mb-3'>
        <h1 className=' dark:text-white font-secondary pb-2 z-0 text-3xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto'>{postAuthor}'s Posts</h1>

      </div>
      }
      {publishedBlogposts.map((post) => (
        <div key={post._id}>
        {/* {localUserId === currentUserId && <PostDropdown blogpost={post} deleteBlogpost={deleteBlogpost} />} */}
        <PostHomepage
        key={post._id}
        blogpostId={post._id}
        username={post.user.username}
        title={post.title}
        text={post.text}
        timestamp={post.timestamp}
        topic={post.topic.title}
        userId={post.user._id}
        />
        </div>

      ))}


      {localUserId === currentUserId &&
        <div className='mt-10'>
          {drafts.length > 0 &&
          <>
            <h1 className='dark:text-white font-secondary z-0 text-3xl md:text-5xl font-extrabold w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto'>Drafts</h1>
            <p className='font-primary dark:text-white font-light text-base md:text-lg pb-3'>Edit and publish your drafts</p>
          </>
          }

          {drafts.map((post) => (
            <div key={post._id}>
              {/* <PostDropdown blogpostId={post} deleteBlogpost={deleteBlogpost} /> */}
              <PostHomepage
              key={post._id}
              blogpostId={post._id}
              username={post.user.username}
              title={post.title}
              text={post.text}
              timestamp={post.timestamp}
              topic={post.topic.title}
              userId={post.user._id}
              />
            </div>
          ))}
        </div>
      }
    </div>
  )
}
