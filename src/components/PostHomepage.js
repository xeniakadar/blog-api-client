import React from 'react';

export default function PostHomepage({title, text, username, timestamp, topic}) {
  return (
    <div className='blogpost' >
      <h2>{topic}</h2>
      <h2>{title}</h2>
      <p>{text}</p>
      <div>
        <p>{username} - {timestamp}</p>
      </div>
    </div>

  )
}
