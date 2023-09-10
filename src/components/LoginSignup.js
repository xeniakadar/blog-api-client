import React, { useContext, useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import  UserContext  from '../contexts/UserContext';

export default function LoginSignup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [registerPasswordCheck, setRegisterPasswordCheck] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  //errors
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [passwordErrorCheck, setPasswordErrorCheck] = useState("");

  const navigate = useNavigate();
  const {user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("useContext user info:", user);
  }, [user]);

  function passwordValid(password) {
    //1 capital letter, 1 number and min 6 characters
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setRegisterPassword(newPassword);

    if (!passwordValid(newPassword)) {
      setPasswordError("Password must contain at least 1 capital letter, 1 number and must be at least 6 characters long")
    } else {
      setPasswordError("");
    }
  }

  // const handleCheckPasswordChange = (e) => {
  //   const newPassword = e.target.value;
  //   setRegisterPasswordCheck(newPassword);

  //   if (registerPasswordCheck !== registerPassword) {
  //     setPasswordErrorCheck("Password don't match")
  //   } else {
  //     setPasswordErrorCheck("")
  //   }
  // }

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

      const data = await response.json();
      if (response.ok) {
        console.log("User created successfully:", data);
        window.location.reload();
      } else {
        console.error("Error creating user:", data);
        if (response.status === 403 && data.errors) {
          for (let error of data.errors) {
            if (error.msg === "Error: Username already exists") {
              console.error(error)
              setError('Username already exists');
            } else if (error.msg === "Email must be specified") {
              console.error(error.msg)
              setEmailError(error.msg);
            }
          }
        }
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
        setError(errorData.error);
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
              {error === "Incorrect username" && <h1 className=' text-red-700 dark:text-red-400 font-bold'>{error}</h1>}
              {error === "Missing credentials" && <h1 className=' text-red-700 dark:text-red-400 font-bold mb-3'>Please enter a valid username and password</h1>}
              <div className={`relative border p-2 mt-4 ${error === "Incorrect username" || error === "Missing credentials"? "border-red-700" : ""}`} >
                <label htmlFor="login-username" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4'>Username</label>
                <input type="text" className='w-full dark:bg-black dark:text-white rounded-2xl mt-2 p-2 focus:outline-none' id="login-username" placeholder='Username' value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
              </div>
              {error === "Incorrect password" && <h1 className=' text-red-700 dark:text-red-400 mt-3 font-bold'>{error}</h1>}
              <div className={`relative border p-2 mt-3 ${error === "Incorrect password" || error === "Missing credentials" ? "border-red-700" : ""}`} >
                <label htmlFor="login-password" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4'>Password</label>
                <input className='w-full dark:bg-black dark:text-white focus:outline-none  mt-2 rounded-2xl p-2' type="password" id="login-password" placeholder='Password' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              </div>
              <input className='btn-submit  mt-4 w-full md:text-lg  border-2 bg-sky-600 text-white rounded-xl p-3 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' type="submit" value="Log In" />
            </form>
          </Tab.Panel>
          <Tab.Panel >
            <form onSubmit={registerUser} className='flex flex-col mt-3'>

              {error === "Username already exists" && <h1 className=' text-red-700 dark:text-red-400 font-bold'>{error}</h1>}
              <div className={`relative border p-2 my-3 ${error === "Username already exists" || error === "Missing credentials" ? "border-red-700" : ""}` }>
                <label htmlFor="register-username"className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4' >Username</label>
                <input type="text" className='w-full dark:bg-black dark:text-white  mt-2 rounded-2xl p-2 focus:outline-none' id="register-username" placeholder='Username' value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
              </div>

              {emailError && <h1 className=' text-red-700 dark:text-red-400 font-bold'>Email must be specified and be in correct format</h1>}
              <div className={`relative border p-2 my-3 ${emailError ? "border-red-700" : ""}` }>
                <label htmlFor="register-email"className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4' >Email</label>
                <input type="text" className='w-full dark:bg-black dark:text-white mt-2 rounded-2xl p-2 focus:outline-none' id="register-email" placeholder='Email' value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
              </div>

              {passwordError && <h1 className=' text-red-700 dark:text-red-400 font-bold'>{passwordError}</h1>}
              <div className={`relative border p-2 mt-2 ${passwordError ? "border-red-700" : ""}`} >
                <label htmlFor="register-password" className='absolute top-0 left-2 bg-white dark:bg-sky-950 dark:text-white px-1 text-xs md:text-base -translate-y-2/4' >Password</label>
                <input
                type="password"
                className='w-full dark:bg-black dark:text-white mt-2 rounded-2xl p-2 focus:outline-none' id="register-password"
                placeholder='Password' value={registerPassword}
                onChange={handlePasswordChange} />
              </div>
              <input className='btn-submit mt-4 w-full md:text-lg  border-2 bg-sky-600 text-white rounded-xl p-3 hover:bg-white hover:text-sky-900 hover:border-sky-900 ease-in-out duration-300' type="submit" value="Create Account" />
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
