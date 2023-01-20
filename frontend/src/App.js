import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Camera from './pages/Camera';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Add from './pages/Add';


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
    {
      path: "/add",
      element: <Add/>,
    },
    {
      path: "/cam",
      element: <Camera/>,
    },
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
