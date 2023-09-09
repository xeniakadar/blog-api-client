import React, { useContext, useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import  UserContext  from '../contexts/UserContext';

export default function LoginSignup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

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
        localStorage.setItem("userId", data.body._id);
        setUser(data.body);
        setError("");
        navigate("/");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error logging in user:", errorData);
        setError( "Wrong password or username");
      }
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  }

  return (
    <div className=" h-screen w-full  md:max-w-xl md:mx-auto mb-3 p-3">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-sky-900 p-1">
          <Tab as={Fragment} >
            {({selected}) => (
              <button
              className={`
                ${selected ? "bg-white" : "text-white hover:bg-white/[0.12] hover:text-white"} w-full rounded-lg py-2.5 text-sm md:text-lg font-medium leading-5 ',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2`
              }
              >
              Log In
              </button>
            )}
            </Tab>
            <Tab as={Fragment} >
          {({selected}) => (
            <button
            className={`
              ${selected ? "bg-white" : "text-white hover:bg-white/[0.12] hover:text-white"} w-full rounded-lg py-2.5 text-sm md:text-lg font-medium leading-5 ',
              'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2`
            }
            >
             Sign Up
            </button>
          )}
          </Tab>

        </Tab.List>
        <Tab.Panels>
          <Tab.Panel >
            <form onSubmit={loginUser} className='flex flex-col mt-3'>
              {error && <h1>{error}</h1>}
              <div className='relative border p-2 my-3' >
                <label htmlFor="login-username" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4'>Username</label>
                <input type="text" className='w-full dark:bg-black dark:text-white rounded-2xl mt-2 p-2 focus:outline-none' id="login-username" placeholder='Username' value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
              </div>
              <div className='relative border p-2 mt-2' >
                <label htmlFor="login-password" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4'>Password</label>
                <input className='w-full dark:bg-black dark:text-white focus:outline-none  mt-2 rounded-2xl p-2' type="password" id="login-password" placeholder='Password' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              </div>
              <input className='btn-submit  mt-4 w-full md:text-lg  border-2 bg-sky-600 text-white rounded-xl p-3 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' type="submit" value="Log In" />
            </form>
          </Tab.Panel>
          <Tab.Panel >
            <form onSubmit={registerUser} className='flex flex-col mt-3'>
              <div className='relative border p-2 my-3'>
                <label htmlFor="register-username"className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4' >Username</label>
                <input type="text" className='w-full dark:bg-black dark:text-white  mt-2 rounded-2xl p-2 focus:outline-none' id="register-username" placeholder='Username' value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
              </div>
              <div className='relative border p-2 my-3'>
                <label htmlFor="register-email"className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4' >Email</label>
                <input type="text" className='w-full dark:bg-black dark:text-white mt-2 rounded-2xl p-2 focus:outline-none' id="register-email" placeholder='Email' value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
              </div>
              <div className='relative border p-2 mt-2' >
                <label htmlFor="register-password" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4' >Password</label>
                <input type="password" className='w-full dark:bg-black dark:text-white mt-2 rounded-2xl p-2 focus:outline-none' id="register-password" placeholder='Password' value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              </div>
              <input className='btn-submit mt-4 w-full md:text-lg  border-2 bg-sky-600 text-white rounded-xl p-3 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' type="submit" value="Create Account" />
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
