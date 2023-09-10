export default async function deleteBlogpost(e, id) {
  e.preventDefault();
  try {
    const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error("error deleting post:", errorData);
    }
  } catch(error) {
    console.error("an error occurred: ", error);
  }
}
