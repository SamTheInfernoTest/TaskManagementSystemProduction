import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import useWeb from '../../context/WebContext'
import useUser from '../../context/UserContext';

function Menu({setShowMenu}) { 

    const { theme } = useWeb();
    const {userName} = useUser();

    const currentLocation = useLocation();
    

  return (
    <div className='h-full w-full flex flex-col items-center p-2'>
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
                          to={`/${userName}/home`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Home
                      </NavLink>
                  </li>
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${userName}/tasks`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Tasks
                      </NavLink>
                  </li>
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${userName}/people`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          People
                      </NavLink>
                  </li>
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${userName}/chat`}
                          className={({ isActive }) => `${isActive ? 'font-bold dark:bg-darkLive bg-lightLive' : ''} hover:bg-lightHover dark:hover:bg-darkHover p-1 rounded-r-xl w-full block text-center`}
                      >
                          Chat
                      </NavLink>
                  </li>
                  <li className="w-full"
                      onClick={() => setShowMenu(false)}
                  >
                      <NavLink
                          to={`/${userName}/settings`}
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