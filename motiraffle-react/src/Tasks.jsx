/* eslint-disable react/prop-types */
import React from 'react'
import bronze from "./assets/bronze.png"
import silver from "./assets/silver.png"
import gold from "./assets/gold.png"
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
export const Tasks = (props) => {
  const [tasks, setTasks] = useState([])
  const [taskCard, setTaskCard] = useState({...props})
  useEffect(() =>{
    axios
      .get('http://localhost:5555/tasks')
      .then((response)=>{
        setTasks(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })


  }, []);

  function handleDelete(){
    let currentId;
    //first check what index is it on
    let currentIndex;
    for(let i = 0; i<tasks.length; i++){
      console.log(props.dbid)
      console.log(tasks[i]._id)
      if(tasks[i]._id == props.dbid)
      {
        currentIndex = i
        //console.log(i)
      }
    }
    if(currentIndex === 0){
      if (tasks[currentIndex+3] !== undefined){      
        const taskTitle = document.getElementById('taskName')
        const taskDescription = document.getElementById('taskDescription')
        const rewardAmount = document.getElementById('rewardAmount')
        taskTitle.textContent = tasks[currentIndex+3].name;
        taskDescription.textContent = tasks[currentIndex+3].taskDescription
        rewardAmount.textContent = tasks[currentIndex+3].rewardAmount + ' raffles'
        currentId = tasks[currentIndex+3]._id
      } 
      else{
        console.log('no more entries')
      }
    }
    else if(currentIndex === 1){
      console.log(tasks[currentIndex+2])
      if (tasks[currentIndex+2] !== undefined){
        const taskTitle = document.getElementById('taskName')
        const taskDescription = document.getElementById('taskDescription')
        const rewardAmount = document.getElementById('rewardAmount')
        taskTitle.textContent = tasks[currentIndex+2].name;
        taskDescription.textContent = tasks[currentIndex+2].taskDescription
        rewardAmount.textContent = tasks[currentIndex+2].rewardAmount + ' raffles'
        currentId = tasks[currentIndex+2]._id
      } 
      else{
        console.log('no more entries')
      }

    }
    else if(currentIndex === 2){
      if (tasks[currentIndex+1] !== undefined){
        console.log(tasks[currentIndex+1])
        
        const taskTitle = document.getElementById('taskName')
        const taskDescription = document.getElementById('taskDescription')
        const rewardAmount = document.getElementById('rewardAmount')

        taskTitle.textContent = tasks[currentIndex+1].name;
        taskDescription.textContent = tasks[currentIndex+1].taskDescription
        rewardAmount.textContent = tasks[currentIndex+1].rewardAmount + ' raffles'
        currentId = tasks[currentIndex+1]._id
      } 
      else{
        console.log('no more entries')
      }

    }
    //after getting the index we populate with the new item  by changing the p tags depending on the index and delete the entry
    //we can make the data grabbed fromm props into an object and use useeffect so when we change the data the component rerenders
    //and then if the data grabbed is empty in the return we do return <></>
    //console.log(tasks.findIndex(item => item[_id] === props.dbid))
    // eslint-disable-next-line react/prop-types
    let prevId = props.dbid
    let deleteURL = 'http://localhost:5555/tasks/'+ prevId
    axios
    .delete(deleteURL)
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error);
    })

    prevId = currentId

    axios
      .get('http://localhost:5555/tasks')
      .then((response)=>{
        setTasks(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }
  return (
    <div className='flex flex-col grow items-center w-[260px] mx-4 bg-[#3fbb60] rounded-lg border border-black shaodw-md'>
        <img src={bronze} className='h-24 w-24 mt-4'/>

        <p id = 'taskName'className='font-bold pt-[10px] flex items-center justify-center'>{props.name}</p>
        {typeof props.taskDescription === 'undefined' ? <br></br> :<></>}
        <p id = 'taskDescription' className=''>{props.taskDescription}</p>
        <br></br>
        <p className='font-bold '>Reward</p>
        <p id = 'rewardAmount'>{props.rewardAmount} raffles</p>
        <br></br>
        <button className='bg-[#37a354] mt-[160px] rounded-md px-2 py-2 font-medium border border-black' onClick={handleDelete}>Finish task</button>
    </div>
  )
}

export default Tasks