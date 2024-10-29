import useUser from "./context/UserContext";

function App() {

  return (
    <div className="Main w-screen h-screen relative ">
      <div className="dark:bg-[#1B1A55] bg-[#7AB2D3] absolute w-[calc(100vw-15rem)] right-0 h-[5.5rem]">
        
      </div>
      <div className="dark:bg-[#535C91] bg-[#B9E5E8] absolute w-[15rem] left-0 h-full">
        
      </div>
      <div className="dark:bg-[#070F2B] bg-[#DFF2EB] absolute w-[calc(100vw-15rem)] right-0 top-[5.5rem] h-[calc(100vh-5.5rem)] overflow-y-auto p-5 overflow-x-clip" >
        
      </div>
    </div>
  )
}

export default App
