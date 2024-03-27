import React from 'react'
import VerticalNavbar from '../VerticalNavbar'
import Navbar from '../Navbar'
import axios from 'axios'
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"
import { Dropdown } from '../Dropdown'
import { useState } from 'react'
export const CreateTaskPage = () => {
  const [name, setName] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [taskDescription, setTaskDescription] = useState(0);
  const createdBy = "admin"
  const completed = false;
  

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
    
  }
  return (
    <div className='flex'>
        <VerticalNavbar/>
        <div>
            <div className='w-[1670px] h-24 flex flex-row-reverse bg-[#27282b]'/>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-6xl mt-10 mx-10 mb-5'>Create Task</h1>
                    <form onSubmit = {handleSubmit} className='px-[100px]'>
                        <label className="text-base font-medium">Task Name</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "text" placeholder='Task Name' required value = {name} onChange = {(e) => setName(e.target.value)}/>
                        <label className="text-base font-medium">Raffles Rewarded</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "number" placeholder= '0' required value = {rewardAmount} onChange = {(e) => setRewardAmount(e.target.value)}/>
                        <div className='flex flex-col'>
                            <label className="text-base font-medium">Description</label>
                            <textarea className='h-[200px] rounded-md pl-[5px]' required type = "text" placeholder='Task Description' value = {taskDescription} onChange = {(e) => setTaskDescription(e.target.value)}/>
                        </div>
                        <button className='p-2 bg-[#3fbb60] mt-3 rounded-md' type='submit'>Create Task</button>
                    </form>
                </div>
        </div>
    </div>
  )
}

export default CreateTaskPage