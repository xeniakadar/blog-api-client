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
          username: "logan",
          email: "ken@ken.com",
          password: "logan",
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
          username:"logan",
          password:"logan"
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
          "title": "Bahamas 2023",
          "text": "The Bahamas, officially the Commonwealth of The Bahamas,[12] is an island country within the Lucayan Archipelago of the West Indies in the North Atlantic. It takes up 97% of the Lucayan Archipelago's land area and is home to 88% of the archipelago's population. The archipelagic state consists of more than 3,000 islands, cays, and islets in the Atlantic Ocean, and is located north of Cuba and northwest of the island of Hispaniola (split between the Dominican Republic and Haiti) and the Turks and Caicos Islands, southeast of the U.S. state of Florida, and east of the Florida Keys. The capital is Nassau on the island of New Providence. The Royal Bahamas Defence Force describes The Bahamas' territory as encompassing 470,000 km2 (180,000 sq mi) of ocean space.",
          "topic": "Beach"
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
