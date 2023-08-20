import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';

export default function PostDetail() {

  const [blogpost, setBlogpost] = useState(null);

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

  if (!blogpost) {
    return <p>Loading ... </p>
  }

  return (
    <div className='blogpost-detail-container'>
      <h1>{blogpost.topic.title} / {blogpost.title} </h1>
      <p>{blogpost.text}</p>
      <div className='info'>
        <p>{blogpost.username} - <span>{formatTimestamp(blogpost.timestamp)}</span></p>
      </div>
      <div className='comments-container'>
        {blogpost.comments.map(comment => (
          <div className='comment-details' key={comment.id || comment._id}>
            <p>{comment.username} - {formatTimestamp(comment.timestamp)}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
