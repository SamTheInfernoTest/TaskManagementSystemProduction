import { Outlet } from "react-router-dom"
import { useState } from "react"

import Menu from "./components/menu/Menu"
import useUser from "./context/UserContext"
import useWeb from "./context/WebContext"


function App() {

  const { userName, profileImage } = useUser()
  const { theme } = useWeb()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="Main w-screen h-screen relative">
      <div className={`dark:bg-darkMenu bg-lightMenu absolute w-[15rem] sm:left-0 h-full overflow-y-auto duration-200 ${showMenu ? "left-0 z-10" : "-left-[15rem] z-0"}`} >
        <Menu setShowMenu={setShowMenu} />
      </div>
      <div className="h-full absolute sm:w-[calc(100vw-15rem)] w-full right-0 duration-200">
        <header className={`dark:bg-darkHeader bg-lightHeader absolute w-full sm:h-[5.5rem] h-[4rem] flex flex-row justify-between `}>
          <div className="my-auto ml-5 flex flex-row ">
            <button className="my-auto mr-5 sm:hidden block "
            onClick={() => setShowMenu(!showMenu)}
            >
              <img src={`${theme === "dark" ? "/whiteMenu.svg" : "/blackMenu.svg"}`} alt="menu"
                className="w-6 h-6"
              />
            </button>
            <div className="">
              <h1 className="sm:text-2xl text-lg">Hi, {userName}</h1>
              <h2 className="sm:text-base text-xs">Let's finish your tasks today!</h2>
            </div>
          </div>

          <div className="my-auto mr-5">
            <img src={profileImage} alt="Profile Image"
              className="w-16 h-16 rounded-full ring dark:ring-slate-500 ring-slate-400 sm:scale-100 scale-75" />
          </div>
        </header>

        <div className={`dark:bg-darkBg bg-lightBg w-full absolute sm:top-[5.5rem] top-[4rem] sm:h-[calc(100vh-5.5rem)] h-[calc(100vh-4rem)] overflow-y-auto p-5 overflow-x-clip`} >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
