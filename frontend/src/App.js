import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';


function App() {
  const router = createBrowserRouter([
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
