import { Outlet } from "react-router-dom"
import { useState } from "react"

import Menu from "./components/menu/Menu"
import useUser from "./context/UserContext"
import useWeb from "./context/WebContext"


function App() {

  const { name, profileImage, logoutTheUser } = useUser()
  const { theme, baseApiUrl } = useWeb()
  const [showMenu, setShowMenu] = useState(false)
console.log(profileImage);

  return (
    <div className="Main w-screen h-screen relative">
      <div className={`dark:bg-darkMenu bg-lightMenu absolute w-[15rem] lg:left-0 h-full overflow-y-auto duration-200 ${showMenu ? "left-0 z-10" : "-left-[15rem] z-0"}`} >
        <Menu setShowMenu={setShowMenu} />
      </div>
      <div className={`h-full absolute lg:w-[calc(100vw-15rem)] w-full right-0 duration-200`}
      onClick={(e) => {
        if(showMenu){
          setShowMenu(false)
        }
      }}
      >
        <header className={`dark:bg-darkHeader bg-lightHeader absolute w-full lg:h-[5.5rem] h-[4rem] flex flex-row justify-between  ${showMenu ? "pointer-events-none" : "pointer-events-auto"}`}>
          <div className="my-auto ml-5 flex flex-row ">
            <button className="my-auto mr-5 lg:hidden block "
            onClick={() => setShowMenu(!showMenu)}
            >
              <img src={`${theme === "dark" ? "/whiteMenu.svg" : "/blackMenu.svg"}`} alt="menu"
                className="w-6 h-6"
              />
            </button>
            <div className="">
              <h1 className="sm:text-2xl text-lg">Hi, {name}</h1>
              <h2 className="sm:text-base text-xs">Let's finish your tasks today!</h2>
            </div>
          </div>

          <div className="my-auto mr-5 flex sm:gap-8 gap-2">
            <button
            className="text-lg font-semibold text-darkText dark:bg-red-700 dark:hover:bg-red-800 bg-red-500 hover:bg-red-700 my-auto py-1 px-3 rounded-3xl"
            onClick={() => logoutTheUser()}
            >Logout</button>
            <img src={`${baseApiUrl}${profileImage}`} alt="Profile Image"
              className="w-16 h-16 rounded-full ring dark:ring-slate-500 ring-slate-400 lg:scale-100 scale-75" />
          </div>
        </header>

        <div className={`dark:bg-darkBg bg-lightBg w-full absolute lg:top-[5.5rem] top-[4rem] lg:h-[calc(100vh-5.5rem)] h-[calc(100vh-4rem)] overflow-y-auto p-5 overflow-x-clip  ${showMenu ? "pointer-events-none" : "pointer-events-auto"}`} >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
