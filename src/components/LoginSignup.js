import React from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react'

export default function LoginSignup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-production-c42d.up.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword
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


  return (
    <div>
      <Tab.Group>
        <Tab.List>
          <Tab as={Fragment} >
            <button>Signup</button>
          </Tab>
          <Tab as={Fragment} >
            <button>Login</button>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel >
            <h1>Form for signup</h1>
            <form onSubmit={registerUser}>
              <input type="text" id="username" placeholder='Username' value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
            </form>

          </Tab.Panel>
          <Tab.Panel >
            <h1>Form for login</h1>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
