import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';


import Homepage from "./components/Homepage";
import Test from "./components/Test";
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import TopicsList from './components/TopicsList';
import TopicDetail from './components/TopicDetail';
import LoginSignup from './components/LoginSignup';
import { UserContext } from './contexts/UserContext';
import PostCreate from './components/PostCreate';

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}} >
      <div className="App">
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
          <Route path='/authenticate' element={<LoginSignup />} />
        </Routes>
        <Test />
      </div>
    </UserContext.Provider>
  );
}

export default App;
