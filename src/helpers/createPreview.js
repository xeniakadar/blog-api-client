export default function createPreview(word, length) {
  if (word.length <= length) return word;
  const preview = word.slice(0, length);
  return preview.slice(0, preview.lastIndexOf(' ')) + "...";
}
