import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

import Homepage from "./components/Homepage";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      {/* <Link to="blogpost">Link to blogpost</Link> */}
      <Navbar />
      <Homepage />
      <Test />
    </div>
  );
}

export default App;
