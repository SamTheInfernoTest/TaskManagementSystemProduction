import { Outlet } from "react-router-dom"

import Menu from "./components/menu/Menu"

 
function App() {

  return (
    <div className="Main w-screen h-screen relative ">
      <div className={`dark:bg-darkHeader bg-lightHeader absolute w-[calc(100vw-15rem)] right-0 h-[5.5rem]`}>
        
      </div>
      <div className={`dark:bg-darkMenu bg-lightMenu absolute w-[15rem] left-0 h-full`} >
        <Menu />
      </div>
      <div className={`dark:bg-darkBg bg-lightBg absolute w-[calc(100vw-15rem)] right-0 top-[5.5rem] h-[calc(100vh-5.5rem)] overflow-y-auto p-5 overflow-x-clip`} >
        <Outlet />
      </div>
    </div>
  )
}

export default App
