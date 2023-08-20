import moment from 'moment/moment';
import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export default function PostHomepage({title, text, username, timestamp, topic}) {
  const { theme, setTheme } = useContext(ThemeContext);

  function createPreview(word, length) {
    if (word.length <= length) return word;
    const preview = word.slice(0, length);
    return preview.slice(0, preview.lastIndexOf(' ')) + "...";
  }
  const newText = createPreview(text, 100);

  const formatTimestamp = (timestamp) => {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, 'minutes');
    const diffHours = now.diff(postTime, 'hours');
    const diffDays = now.diff(postTime, 'days');

    if (diffMinutes < 1) {
      return "less than a minute ago"
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`
    }
    if (diffHours < 2) {
      return `${diffHours} hour ago`
    }
    if (diffHours < 24) {
      return `${diffHours} hours ago`
    }
    if (diffDays < 7) {
      return `${diffDays} days ago`
    }
    return postTime.format('YYYY-MM-DD');
  }



  return (
    <div className={`${theme} blogpost`} >
      <h2>{topic}</h2>
      <h2>{title}</h2>
      <p>{newText}</p>
      <div>
        <p>{username} - {formatTimestamp(timestamp)}</p>
      </div>
    </div>

  )
}
