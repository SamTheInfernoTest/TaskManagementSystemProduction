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



export default function Routes() {
  const { userName } = useUser();
  const [router, setRouter] = useState(null);

  

  const router1 = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Welcome />}>

        </Route>
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


  useEffect(() => {
    if (userName) {
      setRouter(router2);
    } else {
      setRouter(router1);
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