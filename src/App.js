import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';


import Homepage from "./components/Homepage";
import Test from "./components/Test";
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <div className="App">
      {/* <Link to="blogpost">Link to blogpost</Link> */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/blogposts'>
          <Route index element={<PostList />} />
          <Route path=':blogpostId' element={<PostDetail />} />
        </Route>
      </Routes>
      <Test />
    </div>
  );
}

export default App;
