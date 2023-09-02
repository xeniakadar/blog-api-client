import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../helpers/formatTimestamp';
import createPreview from '../helpers/createPreview';


export default function PostHomepage({title, text, username, timestamp, topic, blogpostId}) {
  const previewText = createPreview(text, 200);

  return (
    <div className="blogpost-container w-full md:w-9/10 lg:w-9/10 xl:w-88 xl:max-w-6xl mx-auto bg-sky-100 mb-3 rounded-2xl p-3" >
      <div className='post'>
        {topic &&
        <h2 className='title bg-sky-950 text-sky-200 w-max py-1 px-3 rounded-2xl md:text-lg font-secondary font-bold '>{topic.toUpperCase()} <span>/</span> <span className='text-white'> <Link to={`${blogpostId}`}>{title.toUpperCase()}</Link></span> </h2>
        }
        {!topic &&
        <h2 className=' bg-sky-950 text-white w-max py-1 px-3 rounded-2xl font-secondary font-bold'><Link to={`/blogposts/${blogpostId}`}>{title.toUpperCase()}</Link></h2>}
        <p className='text font-primary font-light text-sm md:text-base py-3'>{previewText}</p>
      </div>
      <div className='info text-sky-900 pb-1 w-max rounded-2xl font-secondary text-sm md:text-base font-bold'>
        <p>{username} - <span>{formatTimestamp(timestamp)}</span></p>
      </div>
    </div>
  )
}
