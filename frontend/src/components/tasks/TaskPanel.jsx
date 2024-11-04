import React from 'react'



function TaskPanel() {



  return (

    <div className="relative flex flex-col shadow-md bg-clip-border rounded-xl w-80 bg-lightPanel dark:bg-darkPanel">
      <div className="relative mx-4 mt-4 overflow-hidden bg-clip-border rounded-xl h-52">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
          alt="card-image" className="object-cover w-full h-full" />
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            Apple AirPods
          </p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            $95.00
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal  opacity-75">
          With plenty of talk and listen time, voice-activated Siri access, and an
          available wireless charging case.
        </p>
      </div>
      <div className="p-2 pt-0">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 "
          type="button"
          onClick={() => {console.log("clicked");
          }}
          >
          Open
        </button>
      </div>
      
    </div>

  )
}

export default TaskPanel