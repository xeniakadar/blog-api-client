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
          "text": "Barbie first blogpost. it's literally im not gonna cry this albunm is in the process",
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
      const response = await fetch(`https://blog-api-production-c42d.up.railway.app/api/blogposts/64df8086a13896427c2aac09/comments`, {
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

  async function deleteComment(e) {

  }


  return (
    <div>
      <button onClick={getBlogposts}>get blogposts</button>
    <button onClick={createUser}>Create user</button>
    <button onClick={loginUser}>login user</button>
    <button onClick={createBlogpost}>Create post</button>
    <button onClick={deleteBlogpost}>Delete post</button>
    <button onClick={createComment}>create comment</button>
    </div>
  )
}
