import React, { useRef } from 'react'
import Navbar from '../Navbar'
import VerticalNavbar from '../VerticalNavbar'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react'
import Tasks from '../Tasks';
import RecentCompletedTask from '../RecentCompletedTask';
export const Home = () => {
  const [tasks, setTasks] = useState([])
  const [taskList, setTaskList] = useState([])
  

  useEffect(() =>{
    axios
      .get('http://localhost:5555/tasks/3')
      .then((response)=>{
        setTasks(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
      
    axios
      .get('http://localhost:5555/tasks')
      .then((response)=>{
        setTaskList(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })


  }, []);



  //console.log(tasks)
  return (
    <div className='flex'> 
      
      <VerticalNavbar/>
  
      <div className='flex flex-col'>

        <div className='flex justify-between'>
          <h1 className='font-bold text-4xl mt-10 mx-10 mb-5'>Welcome back</h1>
        </div>
        <div className='flex justify-between'>
          <div className='flex bg-[#27282b] ml-3 pt-3 pb-3 rounded-md'>
            {taskList.slice(0,3).map((items) => (
              <Tasks taskDescription = {items.taskDescription} rewardAmount = {items.rewardAmount} name = {items.name} key= {items._id} dbid = {items._id}></Tasks>
            ))}
            {console.log(taskList)}
          </div>
        <div>
          <RecentCompletedTask/>
        </div>
      </div>
        

      </div>
      
    
    </div>
  )
}

export default Home
