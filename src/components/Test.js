import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

export default function Homepage() {

  async function getBlogposts() {
    const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/blogposts");
    const blogposts = await response.json();
    console.log(blogposts)
  }

  async function createUser(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "barbieee",
          email: "barb@barb.com",
          password: "barbieee",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username:"barbieee",
          password:"barbieee"
        })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("local storage stuff:", localStorage);
        console.log("user logged in", data)
      } else {
        const errorData = await response.json();
        console.error("Error logging in user:", errorData);
      }

    } catch (error) {
      console.error("an error occurred: ", error);
    }
  }

  async function createBlogpost(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/blogposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "title": "Barbies post",
          "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
          "topic": "City"
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("blogpost created", data);
      } else {
        const errorData = await response.json();
        console.error("Error creating post :", errorData);
      }
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  }

  async function deleteBlogpost(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/64dd2d1aa13896427c2aac06`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify({ })
      });
      if (response.ok) {
        console.log("blogpost deleted");
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
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/64e0e17087af0283686a482d/comments`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "text": "Wow this post is amazing"
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("comment added", data);
      } else {
        const errorData = await response.json();
        console.error("error creating post: ", errorData);
      }
    } catch (error) {
      console.error("an error occurred: ", error)
    }
  }

  async function createTopic(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "title": "Winter"
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("topic added", data);
      } else {
        const errorData = await response.json();
        console.error("error creating topic: ", errorData);
      }
    } catch (error) {
      console.error("an error occurred: ", error)
    }
  }


  return (
    <div>
      <button onClick={getBlogposts}>get blogposts</button>
      <button onClick={createUser}>Create user</button>
      <button onClick={loginUser}>login user</button>
      <button onClick={createBlogpost}>Create post</button>
      <button onClick={deleteBlogpost}>Delete post</button>
      <button onClick={createComment}>create comment</button>
      <button onClick={createTopic}>create topic</button>
    </div>
  )
}