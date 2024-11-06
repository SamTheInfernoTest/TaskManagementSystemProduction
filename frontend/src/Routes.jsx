import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { RouterProvider, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";

import useUser from "./context/UserContext";
import Welcome from "./components/Welcome.jsx";
import App from "./App.jsx";
import Home from "./components/home/Home.jsx";
import Tasks from "./components/tasks/Tasks.jsx";
import Mentors from "./components/mentors/Mentors.jsx";
import Chat from "./components/chat/Chat.jsx";
import Settings from "./components/settings/Settings.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import Students from "./components/students/Students.jsx";
import AssignTask from "./components/assignTask/AssignTask.jsx";


export default function Routes() {
  const { userName, userType } = useUser();
  const [router, setRouter] = useState(null);

  

  const router1 = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </>
    )
  );

  const router2 = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/*" element={<Navigate to={`/${userName}/home`} replace />} />
        <Route path={`/${userName}`} element={<App />} >
          <Route path='home' element={<Home />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='mentors' element={<Mentors />} />
          <Route path='chat' element={<Chat />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </>
    )
  );

  const router3 = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/*" element={<Navigate to={`/${userName}/home`} replace />} />
        <Route path={`/${userName}`} element={<App />} >
          <Route path='home' element={<Home />} />
          <Route path='assignTask' element={<AssignTask />} />
          <Route path='students' element={<Students />} />
          <Route path='chat' element={<Chat />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </>
    )
  );


  useEffect(() => {
    if (userType === null) {
      setRouter(router1);
    } else if (userType === "student") {
      setRouter(router2);
    } else if (userType === "mentor") {
      setRouter(router3);
    }
  }, [userName]);


  return (

    router === null ? (
      <div className="flex justify-center items-center h-screen dark:bg-[#070F2B] dark:text-[#DFF2EB] bg-[#DFF2EB]">
        <h1 className="text-8xl">Loading...</h1>
      </div>
    ) : (
      <RouterProvider router={router} />
    )

  )
}