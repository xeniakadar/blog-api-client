import './App.css';
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';


import Homepage from "./components/Homepage";
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import TopicsList from './components/TopicsList';
import TopicDetail from './components/TopicDetail';
import LoginSignup from './components/LoginSignup';
import PostCreate from './components/PostCreate';
import PostUpdate from './components/PostUpdate';
import UserDetail from './components/UserDetail';
import Footer from './components/Footer';
import ThemeContext from './contexts/ThemeContext';
import UserContext from './contexts/UserContext';
import "./App.css"

function App() {

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <UserContext.Provider value={{user, setUser}} >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="App dark:bg-sky-950">
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/blogposts'>
              <Route index element={<PostList />} />
              <Route path=':blogpostId' element={<PostDetail />} />
            </Route>
            <Route path='/topics'>
              <Route index element={<TopicsList />} />
              <Route path=':topicId' element={<TopicDetail />} />
            </Route>
            <Route path='/newpost' element={<PostCreate />} />
            <Route path='/updatepost/:blogpostId' element={<PostUpdate />} />
            <Route path='/users'>
              <Route path=':userId' element={<UserDetail />} />
            </Route>
            <Route path='/authenticate' element={<LoginSignup />} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
