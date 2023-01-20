import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
