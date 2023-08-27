import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';
import { Link } from 'react-router-dom';

export default function PostDetail() {

  const [blogpost, setBlogpost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [blogpostDeleted, setBlogpostDeleted] = useState(false);
  const [deletedComments, setDeletedComments] = useState([]);

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
    return <p>Loading ... </p>
  }

  return (
    <div className='blogpost-detail-container'>
      {blogpostDeleted? <h1>Post Deleted</h1> :
      <>
        <h1 className='topic'> <Link to={`/topics/${blogpost.topic._id}`}>{blogpost.topic.title.toUpperCase()}</Link> <span>/ {blogpost.title.toUpperCase()}</span> </h1>
        <p className='text'>{blogpost.text}</p>
        <p className='info'>By <span className='span-user'>{blogpost.username}</span> - <span>{formatTimestamp(blogpost.timestamp)}</span></p>

        {blogpost.userid === localStorage.getItem("userId") &&
          <div className='manage-post'>
            <h1>manage post</h1>
            <button>Update Post</button>
            <button onClick={deleteBlogpost}>Delete Post</button>
          </div>
        }
        <div className='comments-container'>
        {blogpost.comments.length? <h3>Comments</h3> : <h3>No comments</h3>}

          {blogpost.comments.map(comment => (
            <div className='comment-details' key={comment.id || comment._id}>
              {deletedComments.includes(comment._id)? <p className='comment-text'>Comment successfully deleted</p> :
              <>
                <p className='comment-info'>{comment.username} - <span>{formatTimestamp(comment.timestamp)}</span></p>
                <p className='comment-text'>{comment.text}</p>
                {(comment.userid === localStorage.getItem("userId") || blogpost.userid === localStorage.getItem("userId")) &&
                  <button onClick={() => deleteComment(comment._id)}>Delete comment</button>
                }
              </>
              }
            </div>
          ))}

          <form onSubmit={createComment}>
            <input type="text" id="comment" name="comment" placeholder=' Add comment...' value={commentText} onChange={e => setCommentText(e.target.value)} />
            <input className='btn-submit' type="submit" value="Add" />
          </form>
        </div>
      </>
      }

    </div>
  )
}
