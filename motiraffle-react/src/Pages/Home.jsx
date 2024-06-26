import React, { useRef } from 'react'
import Navbar from '../Components/Navbar'
import VerticalNavbar from '../Components/VerticalNavbar'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Statbox from '../Components/Statbox';
import Tasks from '../Components/Tasks';
import RaffleCard from '../Components/RaffleCard';
import RecentCompletedTask from '../Components/RecentCompletedTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Home = () => {
  const [tasks, setTasks] = useState([])
  const [taskList, setTaskList] = useState([])
  const [raffleList, setRaffleList] = useState([])
  
  function updateRaffleList(itemId){
    notify()
    const newRaffleList = raffleList.filter((raffle) => raffle._id != itemId)
        setRaffleList(newRaffleList)
        const claimed = {
            claimed : true
      }
    
    axios
      .put('http://localhost:5555/raffles/'+ itemId, claimed)
      .then((response)=>{
          console.log(response.data)
        })
      .catch((error)=>{
        console.log(error);
      })
  }

  function updateTaskList(itemId){
    
    const newTaskList = taskList.filter((task) => task._id != itemId)
        setTaskList(newTaskList)
        const completed = {
            completed : true
      }
    
    axios
      .put('http://localhost:5555/tasks/'+ itemId, completed)
      .then((response)=>{
          console.log(response.data)
        })
      .catch((error)=>{
        console.log(error);
      })
  }

  useEffect(() =>{
      
    axios
      .get('http://localhost:5555/tasks/notcompleted')
      .then((response)=>{
        setTaskList(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })

    axios
      .get('http://localhost:5555/raffles/notclaimed')
      .then((response) =>{
        setRaffleList(response.data);

      })
      .catch((error)=>{
        console.log(error)
      })

  }, []);


  const notify = () => {
    toast('testing')
  }
  
  return (
    <div className='flex'> 
      <VerticalNavbar/>
      
      <div className='flex flex-col'>
        
        <div className='flex ml-9 mt-3'>
          <Statbox amount = {5}/>
        </div>
        <div className='flex grow mb-4'>

          <div className='flex grow w-[876px] bg-[#27282b] ml-9 pt-3 pb-3 rounded-md'>
            {taskList.slice(0,3).map((items) => (
              <Tasks taskDescription = {items.taskDescription} rewardAmount = {items.rewardAmount} name = {items.name} key= {items._id} dbid = {items._id} updateTaskList = {updateTaskList}></Tasks>
            ))}
            
          </div>
          <div className='ml-5 w-[320px] bg-[#27282b] rounded-lg flex flex-col'>
            <p className='text-center pt-6 text-slate-100 text-2xl'>Raffles</p>
            <div className='m-auto flex flex-col'>
              
              {raffleList.slice(0,4).map((items)=>(
                
                <RaffleCard name = {items.name} cost = {items.cost} key = {items._id} dbid = {items._id} updateRaffleList = {updateRaffleList}/>
              ))}
            </div>
          </div>
        </div>

        

      </div>
      
      
      <div className='flex flex-col ml-5 my-4'>
          <Link to = '/createraffle'>
            <button className='w-[375px] h-[115px] bg-indigo-500 mb-[25px] rounded-md text-2xl text-slate-100 font-bold hover:bg-indigo-600'>
              Create a Reward
            </button>
          </Link>
          <Link to = '/createtask'>
            <button className='w-[375px] h-[115px] bg-indigo-500 mb-[25px] rounded-md text-2xl text-slate-100 font-bold hover:bg-indigo-600'>
              Create a Task
            </button>
          </Link>
        <RecentCompletedTask/>
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

export default Home
