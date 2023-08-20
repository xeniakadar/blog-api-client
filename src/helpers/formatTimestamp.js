import moment from "moment";

const formatTimestamp = (timestamp) => {
  const now = moment();
  const postTime = moment(timestamp);
  const diffMinutes = now.diff(postTime, 'minutes');
  const diffHours = now.diff(postTime, 'hours');
  const diffDays = now.diff(postTime, 'days');

  if (diffMinutes < 1) {
    return "less than a minute ago"
  }
  if (diffMinutes === 1) {
    return "1 minute ago"
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
  if (diffDays === 1) {
    return `${diffDays} day ago`
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`
  }
  return postTime.format('YYYY-MM-DD');
}

export {formatTimestamp};
