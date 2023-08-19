import './App.css';
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Homepage from "./components/Homepage";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <h1>test</h1>
      <Homepage />
      <Test />

    </div>
  );
}

export default App;
