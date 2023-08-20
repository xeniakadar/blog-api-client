import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PostList from './components/PostList';
import ThemeProvider from './providers/ThemeProvider';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:"/blogpost",
    element: <PostList />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
