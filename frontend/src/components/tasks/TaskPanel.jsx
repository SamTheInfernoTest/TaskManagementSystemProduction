import useUser from "../../context/UserContext"

function TaskPanel({setTaskViewer, setTaskInfo, info}) {

 const {isoToLocal} = useUser()
 

  return (

    <div id={info?.id} className="relative flex flex-col shadow-md bg-clip-border rounded-xl w-80 h-[23rem] bg-lightPanel dark:bg-darkPanel">
      <div className="relative mx-4 mt-4 overflow-hidden bg-clip-border rounded-xl h-44">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
          alt="card-image" className="object-cover w-full h-full" />
      </div>
      <div className="p-2">
        <div className="flex justify-between mb-2 gap-1">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {info?.subject }
          </p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            by {info?.assignor }
          </p>
        </div>
        <p className="block font-sans text-lg antialiased font-normal leading-normal  opacity-75">
          {info?.title }
        </p>
      </div>
      <div className="p-2 pt-0 absolute bottom-0 w-80 flex justify-between">
      <div className='my-auto font-semibold '>
          🕒{isoToLocal(info?.due_date).split(' ')[0]}
      </div>
        <button
          className=" select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-1 px-6 rounded-2xl shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-lightButton bg-[#0077B6] text-darkText "
          type="button"
          onClick={() => {
            setTaskViewer(true )
            setTaskInfo(info)
          }}
          >
          Open
        </button>
      </div>
      
    </div>

  )
}

export default TaskPanel