/* eslint-disable react/prop-types */
import React from 'react'
import bronze from "../assets/bronze.png"
import silver from "../assets/silver.png"
import gold from "../assets/gold.png"
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Tasks = (props) => {
  const [tasks, setTasks] = useState([])
  useEffect(() =>{
    axios
      .get('http://localhost:5555/tasks/notcompleted')
      .then((response)=>{
        setTasks(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })


  }, []);


  function handleComplete(){
    props.updateTaskList(props.dbid)
  }

  return (
    <div className='flex flex-col grow items-center max-w-[260px] mx-4 bg-indigo-400 rounded-lg shaodw-md hover:bg-indigo-600'>
        <img src={bronze} className='h-24 w-24 mt-4'/>

        <p id = 'taskName'className='font-bold pt-[10px] flex items-center justify-center text-slate-200'>{props.name}</p>
        {typeof props.taskDescription === 'undefined' ? <br></br> :<></>}
        <p id = 'taskDescription' className='text-slate-200'>{props.taskDescription}</p>
        <br></br>
        <p className='font-bold text-slate-200'>Reward</p>
        <p id = 'rewardAmount' className='text-slate-100'>{props.rewardAmount} raffles</p>
        <br></br>
        <button className='bg-indigo-500 mt-[160px] rounded-md px-2 py-2 font-medium shadow-sm text-slate-200 hover:bg-indigo-700' onClick={() => handleComplete(props.dbid)}>Finish task</button>
    </div>
  )
}

export default Tasks