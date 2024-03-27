import React, { useState } from 'react'
import VerticalNavbar from '../VerticalNavbar'
import Navbar from '../Navbar'
import { useEffect } from 'react'
import RecentCompletedTask from '../RecentCompletedTask'
import axios from 'axios'
import Pagination from '../Pagination'
import TaskModal from '../TaskModal'
export const TaskPage = () => {
    const [taskList, setTaskList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [reward, setReward] = useState()
    const [taskDescription, setTaskDescription] = useState('')
    useEffect(() =>{
        axios
          .get('http://localhost:5555/tasks/notcompleted')
          .then((response)=>{
            setTaskList(response.data);
          })
          .catch((error)=>{
            console.log(error);
          })
          const currentPosts = taskList.slice(firstPostIndex, lastPostIndex)
          setTaskList(currentPosts)
    }, []);

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    //const currentPosts = taskList.slice(firstPostIndex, lastPostIndex)

    function showModal(itemId){
        //we can do visibility check with the modal always be there
        //and then use setsate IN THE MMODAL so in showmodal we preemptively set the state to the right values  
        console.log("button clicked")
        setVisible(true)
        let task = taskList.filter((task)=> task._id == itemId)
        task = task[0]
        
        //console.log(task)
        //console.log(task.taskDescription)
        //console.log(task.rewardAmount)
        //console.log(task.name)
        setTaskName(task.name)
        setTaskDescription(task.taskDescription)
        setReward(task.rewardAmount)
        console.log(taskName)
        console.log(taskDescription)
        console.log(reward)
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
    return (

        <div className='flex'>
            <VerticalNavbar/>
            <TaskModal visible = {visible} taskName = {taskName} taskDescription = {taskDescription} reward = {reward}/>
            <div className='flex flex-col w-full'>
        
                
                <div className='flex justify-between'>
                    <h1 className='font-bold text-6xl mt-10 mx-10 mb-5 text-slate-100'>Your Tasks</h1>
                    
                </div>
                <div className='flex grow mb-[50px]'>
                    <div className='bg-[#27282b] rounded mx-5 px-4 pt-2 flex-1'>
                        <table className='w-full mt-2'>
                            <thead>
                                <tr>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1 max-w-[100px]'>Task name</td>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1 max-w-[100px]'>Task Description</td>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1 max-w-[30px]'>Reward Amount</td>
                                </tr>
                            </thead>
                            <tbody className='mx-auto'>
                                {taskList.map((items) => (
                                    <tr className='max-w-0 border-y border-l-0 border-r-0 border-b-0 pt-2 pb-2' key={items._id}>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.name}</td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.taskDescription}</td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.rewardAmount}</td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0'>
                                            <button className='grid place-items-center bg-blue-400 m-auto rounded-md px-7 py-1 border-grey-600 shadow-lg' onClick={()=> showModal(items._id)}>Edit</button>
                                        </td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0'>
                                            <button className='grid place-items-center bg-blue-400 m-auto rounded-md px-2 py-1 border-grey-600 shadow-lg' onClick={() => updateTaskList(items._id)}>Complete</button>
                                        </td>
                                    </tr>
                                
                                 ))}
                                
                            </tbody>
                        </table>
                        <div className='flex justify-center text-white font-bold text-opacity-85'>
                            <Pagination
                                totalPosts={taskList.length}
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage}>
                            </Pagination>
                        </div>
                    </div>
                    <RecentCompletedTask/>
                </div>
                
            </div>
            
        </div>
  )
}

export default TaskPage
