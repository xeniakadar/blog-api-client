import React, {useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';

export default function PostDetail() {
  const { theme } = useContext(ThemeContext);

  const [blogpost, setBlogpost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [blogpostDeleted, setBlogpostDeleted] = useState(false);
  const [deletedComments, setDeletedComments] = useState([]);

  const colorMap = {
    'Beach': { color: '#8ecae6' },
    'City': {  color: '#edede9' },
    'Desert': { color: '#ead2ac' },
    'Mountains': { color: '#dde5b6' },
    'Tropics': { color: '#ffc971' },
    'Winter': { color: '#caf0f8' }
  };
  const colorDarkMap = {
    'Beach': { color: '#2b93c3' },
    'City': {  color: '#a1a18c' },
    'Desert': { color: '#cc9337' },
    'Mountains': { color: '#aabe49' },
    'Tropics': { color: '#ec9200' },
    'Winter': { color: '#3bc7e5' }
  };

  const colorDarkerMap = {
    'Beach': { color: '#113b4e' },
    'City': {  color: '#424236' },
    'Desert': { color: '#533b15' },
    'Mountains': { color: '#454d1c' },
    'Tropics': { color: '#1c1f0b' },
    'Winter': { color: '#0d5666' }
  };

  const currentColorMap = theme === 'dark' ? colorDarkerMap : colorMap;
  const currentDarkColorMap = theme === 'dark' ? colorDarkMap : colorDarkMap;
  const {blogpostId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogpost() {
      try {
        const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}`);
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setBlogpost(data);
        } else {
          console.error("failed to fetch blogposts", data);
        }
      } catch (error) {
        console.error("an error occured:", error);
      }
    }

    fetchBlogpost();
  }, [blogpostId]);

  async function deleteBlogpost(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.ok) {
        console.log("blogpost deleted");
        setBlogpostDeleted(true);
        setTimeout(() => {
          navigate("/blogposts");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("error creating post:", errorData);
      }
    } catch(error) {
      console.error("an error occurred: ", error);
    }
  }

  async function createComment(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}/comments`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "text": commentText
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("comment added", data);
        setCommentText('');
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("error creating post: ", errorData);
      }
    } catch (error) {
      console.error("an error occurred: ", error)
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${blogpostId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.ok) {
        console.log("comment deleted");
        setDeletedComments(prevComments => [...prevComments, commentId]);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("error deleting comment:", errorData);
      }
    } catch(error) {
      console.error("an error occurred: ", error);
    }
  }

  if (!blogpost) {
    return (
      <div className='blogpost-detail-container h-screen md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto mb-3 p-3'>

        <p className='dark:text-white'>Loading ... </p>
      </div>
    )
  }

  return (
    <div className='blogpost-detail-container max-h-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl md:rounded-3xl md:p-6 min-h-screen mx-auto mt-3 p-3' style={blogpost ? { backgroundColor: currentColorMap[blogpost.topic.title].color } : {}}>

      {blogpostDeleted? <h1>Post Deleted</h1> :
      <>
        <h1 className='topic text-sky-100 w-max py-2 mt-2 px-3 rounded-2xl md:text-xl font-secondary font-bold' style={blogpost? {backgroundColor: colorDarkMap[blogpost.topic.title].color} : {}}>
          <Link to={`/topics/${blogpost.topic._id}`} className='hover:text-sky-500'>{blogpost.topic.title.toUpperCase()}</Link>
          <span className='text-white'> / {blogpost.title.toUpperCase()}</span>
        </h1>
        <p className='text dark:text-white font-primary md:text-lg mb-2 mt-2 pl-0.5'>{blogpost.text}</p>
        <p className='info pb-1 w-max rounded-2xl font-secondary text-sm md:text-lg pl-0.5 font-bold' style={blogpost ? { color: currentDarkColorMap[blogpost.topic.title].color } : {}}>By <span className='span-user'><Link to={`/users/${blogpost.user._id}`}>{blogpost.user.username}</Link></span> - <span>{formatTimestamp(blogpost.timestamp)}</span></p>

        {blogpost.user._id === localStorage.getItem("userId") &&
          <div className='manage-post'>
            <Link to={`/updatepost/${blogpost._id}`}><button className=' border-white border-2  text-white rounded-xl p-2 mr-2 hover:border-sky-900 hover:text-sky-900 ease-in-out duration-300' style={blogpost? {backgroundColor: colorDarkMap[blogpost.topic.title].color} : {}} >Update Post</button></Link>
            <button className='border-white border-2  text-white rounded-xl p-2 bg-red-700 hover:bg-red-400 ease-in-out duration-300' onClick={deleteBlogpost}>Delete Post</button>
          </div>
        }
        <div className='comments-container rounded-2xl px-3 py-2 mt-10' style={blogpost ? { backgroundColor: colorDarkMap[blogpost.topic.title].color } : {}}>
        {blogpost.comments.length? <h3>Comments</h3> : <h3>No comments yet</h3>}

          {blogpost.comments.map(comment => (
            <div className='comment-details' key={comment.id || comment._id}>
              {deletedComments.includes(comment._id)? <p className='comment-text'>Comment successfully deleted</p> :
              <div className='bg-white rounded-xl my-2 p-2 flex justify-between items-start'>
                <div>
                  <p className='comment-info'> <span className='font-bold'><Link to={`/users/${comment.userid}`}>{comment.username}</Link></span> - <span className=' font-light'>{formatTimestamp(comment.timestamp)}</span></p>
                  <p className='comment-text'>{comment.text}</p>
                </div>
                {(comment.user._id === localStorage.getItem("userId") || blogpost.user._id === localStorage.getItem("userId")) &&
                  <button className=' text-red-700 font-extrabold' onClick={() => deleteComment(comment._id)}>Delete</button>
                }
              </div>
              }
            </div>
          ))}

          <form onSubmit={createComment}>
            <input className='rounded-xl px-2 py-1' type="text" id="comment" name="comment" placeholder=' Add comment...' value={commentText} onChange={e => setCommentText(e.target.value)} />
            <input className='btn-submit  border-white border-2 hover:bg-sky-900 hover:text-white rounded-xl px-2 py-1 ml-2 bg-white text-sky-900 ease-in-out duration-300' type="submit" value="Add comment" />
          </form>
        </div>
      </>
      }

    </div>
  )
}
