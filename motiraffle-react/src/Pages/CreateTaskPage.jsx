import React from 'react'
import VerticalNavbar from '../Components/VerticalNavbar'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"
import { Dropdown } from '../Components/Dropdown'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CreateTaskPage = () => {
  const [name, setName] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [taskDescription, setTaskDescription] = useState(0);
  const createdBy = "admin"
  const completed = false;
  const notify = () =>{
    toast('created a task!')
  }

  //console.log(dropdownvalue.innerText);
  function handleSubmit(event){
    event.preventDefault();
    const task = {name, rewardAmount, taskDescription, createdBy, completed}
    axios
            .post('http://localhost:5555/tasks', task)
            .then((response) =>{
                console.log(response);
            })
            .catch((error) =>{
                console.log(error);
            })
    console.log(task)
    notify()
    
    
  }
  return (
    <div className='flex'>
        <VerticalNavbar/>
        <div>
            <div className='w-[1670px] h-24 flex flex-row-reverse bg-[#27282b]'/>
                <div className='flex flex-col bg-[#27282b] m-4 pb-4 rounded-md'>
                    <h1 className='font-bold text-6xl mt-10 mx-10 mb-5 text-slate-100'>Create Task</h1>
                    <form onSubmit = {handleSubmit} className='px-[100px]'>
                        <label className="text-base font-medium text-slate-100 text-opacity-85">Task Name</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-slate-200 focus:outline-none bg-[#27282b]" type = "text" placeholder='Task Name' required value = {name} onChange = {(e) => setName(e.target.value)}/>
                        <label className="text-base font-medium text-slate-100 text-opacity-85">Raffles Rewarded</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-slate-200 focus:outline-none bg-[#27282b]" type = "number" placeholder= '0' required value = {rewardAmount} onChange = {(e) => setRewardAmount(e.target.value)}/>
                        <div className='flex flex-col'>
                            <label className="text-base font-medium text-slate-100 text-opacity-85">Description</label>
                            <textarea className='h-[200px] rounded-md pl-[5px] border border-slate-200 focus:outline-none bg-[#27282b]' required type = "text" placeholder='Task Description' value = {taskDescription} onChange = {(e) => setTaskDescription(e.target.value)}/>
                        </div>
                        <button className='p-2 bg-indigo-500 hover:bg-indigo-600 text-slate-100 mt-3 rounded-md' type='submit'>Create Task</button>
                    </form>
                </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce
        />
    </div>
  )
}

export default CreateTaskPage