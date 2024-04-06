import React, { useRef } from 'react'
import Navbar from '../Navbar'
import VerticalNavbar from '../VerticalNavbar'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Statbox from '../../Statbox';
import Tasks from '../Tasks';
import RaffleCard from '../RaffleCard';
import RecentCompletedTask from '../RecentCompletedTask';
export const Home = () => {
  const [tasks, setTasks] = useState([])
  const [taskList, setTaskList] = useState([])
  const [raffleList, setRaffleList] = useState([])
  
  function updateRaffleList(itemId){
    //let tempRaffleList = 
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

    axios
      .get('http://localhost:5555/raffles/notclaimed')
      .then((response) =>{
        setRaffleList(response.data);

      })
      .catch((error)=>{
        console.log(error)
      })

  }, []);



  //console.log(tasks)
  return (
    <div className='flex'> 
      <VerticalNavbar/>
  
      <div className='flex flex-col'>
        <div className='flex ml-9 mt-3'>
          <Statbox amount = {5}/>
          
        </div>
        <div className='flex'>
          <h1 className='font-bold text-4xl mt-3 mx-10 mb-5 text-slate-100'>Welcome back</h1>
          
        </div>
        <div className='flex grow mb-4'>
          <div className='flex grow bg-[#27282b] ml-9 pt-3 pb-3 rounded-md'>
            {taskList.slice(0,3).map((items) => (
              <Tasks taskDescription = {items.taskDescription} rewardAmount = {items.rewardAmount} name = {items.name} key= {items._id} dbid = {items._id}></Tasks>
            ))}
            
          </div>
          <div className='ml-5 w-[320px] bg-[#27282b] rounded-lg flex flex-col'>
            <p className='text-center pt-2 text-slate-100 text-2xl'>Raffles</p>
            <div className='m-auto flex flex-col'>
              
              {raffleList.slice(0,4).map((items)=>(
                <RaffleCard name = {items.name} cost = {items.cost} key = {items._id} dbid = {items._id} updateRaffleList = {updateRaffleList}/>
              ))}
            </div>
          </div>
        </div>

        

      </div>
      
      
      <div className='flex flex-col grow ml-5 my-4'>
          <Link to = '/createraffle'>
            <button className='w-[375px] h-[115px] bg-[#3fbb60] mb-[25px] rounded-md text-2xl text-slate-100 font-bold'>
              Create a Reward
            </button>
          </Link>
          <Link to = '/createtask'>
            <button className='w-[375px] h-[115px] bg-indigo-500 mb-[25px] rounded-md text-2xl text-slate-100 font-bold'>
              Create a Task
            </button>
          </Link>
        <RecentCompletedTask/>
      </div>
    
      
    </div>
  )
}

export default Home
