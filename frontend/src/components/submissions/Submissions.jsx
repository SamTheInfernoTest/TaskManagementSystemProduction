import { useEffect, useState } from "react"
import Datepicker from "react-tailwindcss-datepicker";

import useUser from "../../context/UserContext"
import TaskHead from "./TaskHead";

function Submissions() {

  const { uid, axiosSecure, standards } = useUser();


  const startDate = new Date().setDate(new Date().getDate() - 7);
  const endDate = new Date().setDate(new Date().getDate() + 7);
  const [tasks, setTasks] = useState([]);


  const [dateRange, setDateRange] = useState({
    startDate: startDate,
    endDate: endDate
  });


  useEffect(() => {
    if (dateRange.startDate) {
      axiosSecure.get(`task/getAssignedTasks/${uid}/${dateRange.startDate}/${dateRange.endDate}`).then(res => {setTasks(res.data)});
    }

  }, [dateRange])



  return (
    <div>
      <h1 className="text-3xl font-bold">Check Submission</h1>
      <div className="p-4">
        <Datepicker
          value={dateRange}
          onChange={(v) => {
            if (v.startDate) {
              setDateRange({
                startDate: v.startDate.getTime(),
                endDate: v.endDate.getTime()
              })
            }
          }}
          placeholder="Select Date Range according to Due Date"
          displayFormat="DD-MM-YYYY"
          showShortcuts={true}
        />
      </div>
      <div>
        <ul className="gap-1">
          {
            tasks.map(task =>(
              <TaskHead key={`task-${task.id}`} task={task} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Submissions