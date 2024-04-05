import React, { useRef } from 'react'
import Navbar from '../Navbar'
import VerticalNavbar from '../VerticalNavbar'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react'
import Statbox from '../../Statbox';
import Tasks from '../Tasks';
import RaffleCard from '../RaffleCard';
import RecentCompletedTask from '../RecentCompletedTask';
export const Home = () => {
  const [tasks, setTasks] = useState([])
  const [taskList, setTaskList] = useState([])
  const [raffleList, setRaffleList] = useState([])
  

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
      .get('http://localhost:5555/raffles')
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
      <div className='flex ml-5 mt-3'>
        <Statbox amount = {5}/>
        <div className='mx-2 w-[500px] flex flex-col justify-center items-center bg-[#27282b] rounded-lg'>
          <div className='bg-blue-400 p-4 my-6 w-[300px] rounded-lg'>
                <p className='text-slate-100 text-3xl ml-4'>Raffles owned</p>
                <br></br>
                <br></br>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>3</p>
            </div>
        </div>
      </div>
        <div className='flex'>
          <h1 className='font-bold text-4xl mt-3 mx-10 mb-5 text-slate-100'>Welcome back</h1>
          
        </div>
        <div className='flex'>
          <div className='flex bg-[#27282b] ml-5 pt-3 pb-3 rounded-md'>
            {taskList.slice(0,3).map((items) => (
              <Tasks taskDescription = {items.taskDescription} rewardAmount = {items.rewardAmount} name = {items.name} key= {items._id} dbid = {items._id}></Tasks>
            ))}
            
          </div>
          <div className='ml-5 w-[300px] h-[590px] bg-[#27282b] rounded-lg flex flex-col'>
            <p className='text-center pt-2 text-slate-100 text-2xl'>Raffles</p>
            <div className='m-auto'>
              
              {raffleList.slice(0,4).map((items)=>(
                <RaffleCard name = {items.name} cost = {items.cost} key = {items._id} dbid = {items._id}/>
              ))}
            </div>
          </div>
        </div>

        

      </div>
      
      
      <div className='ml-5 my-3'>
          <RecentCompletedTask/>
      </div>
    
      
    </div>
  )
}

export default Home
