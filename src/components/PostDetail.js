import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';

export default function PostDetail() {

  const [blogpost, setBlogpost] = useState(null);
  const [commentText, setCommentText ] = useState('');

  const {blogpostId} = useParams();

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

  async function createComment(e) {
    e.preventDefault();
    console.log("submitting form")
    console.log(commentText);
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
      } else {
        const errorData = await response.json();
        console.error("error creating post: ", errorData);
      }
    } catch (error) {
      console.error("an error occurred: ", error)
    }
  }

  if (!blogpost) {
    return <p>Loading ... </p>
  }

  return (
    <div className='blogpost-detail-container'>
      <h1 className='topic'>{blogpost.topic.title.toUpperCase()} <span>/ {blogpost.title.toUpperCase()}</span> </h1>
      <p className='text'>{blogpost.text}</p>
      <p className='info'>By <span className='span-user'>{blogpost.username}</span> - <span>{formatTimestamp(blogpost.timestamp)}</span></p>

        <div className='comments-container'>
        {blogpost.comments.length? <h3>Comments</h3> : <h3>No comments</h3>}

          {blogpost.comments.map(comment => (
            <div className='comment-details' key={comment.id || comment._id}>
              <p className='comment-info'>{comment.username} - <span>{formatTimestamp(comment.timestamp)}</span></p>
              <p className='comment-text'>{comment.text}</p>
            </div>
          ))}

          <form onSubmit={createComment}>
            <input type="text" id="comment" name="comment" placeholder=' Add comment...' value={commentText} onChange={e => setCommentText(e.target.value)} />
            <input className='btn-submit' type="submit" value="Add" />
          </form>
        </div>

    </div>
  )
}
