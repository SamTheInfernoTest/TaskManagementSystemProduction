import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import useWeb from '../../context/WebContext'
import useUser from '../../context/UserContext';

function Menu({setShowMenu}) { 

    const { theme } = useWeb();
    const {uid, userType} = useUser();

    

  return (
    <div className='h-full w-full flex flex-col items-center p-2'
    onClick={() => setShowMenu(false)}
    >
        <div className='mt-10'>
              <img src={theme === "dark" ? "/whitetms.svg" : "/blacktms.svg"} alt="TMS Logo"
                  className='h-36'
              />
        </div>
        <div className='mt-36 w-full'>
              <ul className="w-full text-lg font-semibold dark:text-slate-100 gap-4 flex flex-col">
                  <li className="w-full"
                      onClick = {() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/home`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Home
                      </NavLink>
                  </li>
                  { userType === "student" ?
                    <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/tasks`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Tasks
                      </NavLink>
                  </li> :
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/assignTask`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                         Assign Tasks
                      </NavLink>
                  </li>}
                  { userType === "student" ?
                    <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/mentors`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Mentors
                      </NavLink>
                  </li>:
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/students`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Students
                      </NavLink>
                  </li>}
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/chat`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Chat
                      </NavLink>
                  </li>
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${uid}/settings`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Settings
                      </NavLink>
                  </li>
              </ul>

        </div>
    </div>
  )
}

export default Menu