/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';



export const Statbox = (props) => {
    const [claimedRaffleList, setClaimedRaffleList] = useState([])
    const [taskList, setTaskList] = useState([])
    const [rafflesOwned, setRafflesOwned] = useState(0)
    useEffect(() =>{
        axios
          .get('http://localhost:5555/raffles/claimed')
          .then((response)=>{
            setClaimedRaffleList(response.data);
          })
          .catch((error)=>{
            console.log(error);
          })
        
        axios
        .get('http://localhost:5555/tasks/completed')
        .then((response)=>{
        setTaskList(response.data);
        })
        .catch((error)=>{
        console.log(error);
        })
      
      }, []);

      useEffect(() =>{
        const raffles = checkOwnedRaffle()
        setRafflesOwned(raffles)
      
      }, [claimedRaffleList, taskList]);

    function checkOwnedRaffle(){
      const totalRaffle = taskList.reduce((accumulator, task) => accumulator + task.rewardAmount, 0)
      const totalRaffleUsed = claimedRaffleList.reduce((accumulator, raffle) => accumulator + raffle.cost, 0)
      let RafflesOwned = totalRaffle - totalRaffleUsed
      console.log(totalRaffle)
      console.log(totalRaffleUsed)
      console.log(rafflesOwned)
      return RafflesOwned
    }

  return (
    <div className = 'w-full h-full rounded-lg'>
        <div className='flex'>
            <div className='bg-[#27282b] p-4 my-6 mx-3 w-full rounded-lg'>
                <p className='text-slate-100 text-3xl ml-4 text-opacity-85'>Rewards claimed</p>
                <br></br>
                <br></br>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{claimedRaffleList.length}</p>
            </div>
            <div className='p-4 bg-[#27282b] my-6 mx-4 w-full rounded-lg'>
            <p className='text-slate-100 text-3xl ml-4 text-opacity-85'>Total Tasks finished</p>
                <br/>
                <br/>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{taskList.length}</p>
            </div>
            <div className='p-4 bg-[#27282b] my-6 mx-3 w-full rounded-lg'>
            <p className='text-slate-100 text-3xl ml-4 text-opacity-85'>Raffles owned</p>
                <br/>
                <br/>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{rafflesOwned}</p>
            </div>
            
        </div>
    </div>
  )
  
}

export default Statbox