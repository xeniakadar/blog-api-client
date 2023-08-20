import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';
import createPreview from '../helpers/createPreview';



export default function PostHomepage({title, text, username, timestamp, topic, blogpostId}) {
  const previewText = createPreview(text, 100);

  return (
    <div className="blogpost-container" >
      <div className='post'>
        <h2 className='title'>{topic} / <Link to={`${blogpostId}`}><span>{title}</span></Link> </h2>
        <p className='text'>{previewText}</p>
      </div>
      <div className='info'>
        <p>{username} - <span>{formatTimestamp(timestamp)}</span></p>
      </div>
    </div>

  )
}
