import React, { useContext, useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { UserContext } from '../contexts/UserContext';

export default function LoginSignup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const {user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log("useContext user info:", user);
  }, [user]);
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
        localStorage.setItem("username", data.body.username);
        setUser(data);
        console.log("user logged in", data);
        navigate("/");
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
            <button>Login</button>
          </Tab>
          <Tab as={Fragment} >
            <button>Signup</button>
          </Tab>

        </Tab.List>
        <Tab.Panels>
          <Tab.Panel >
            <h1>Form for login</h1>
            <form onSubmit={loginUser}>
              <label htmlFor="login-username">Username</label>
              <input type="text" id="login-username" placeholder='Username' value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
              <label htmlFor="login-password" >password</label>
              <input type="password" id="login-password" placeholder='password' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              <input className='btn-submit' type="submit" value="Log In" />
            </form>
          </Tab.Panel>
          <Tab.Panel >
            <h1>Form for signup</h1>
            <form onSubmit={registerUser}>
              <label htmlFor="register-username" >Username</label>
              <input type="text" id="register-username" placeholder='Username' value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
              <label htmlFor="register-email" >email</label>
              <input type="text" id="register-email" placeholder='Email' value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
              <label htmlFor="register-password" >password</label>
              <input type="password" id="register-password" placeholder='password' value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              <input className='btn-submit' type="submit" value="Create Account" />
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
