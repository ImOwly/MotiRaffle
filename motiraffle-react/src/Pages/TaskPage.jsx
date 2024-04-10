import React, { useState } from 'react'
import VerticalNavbar from '../Components/VerticalNavbar'
import Navbar from '../Components/Navbar'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecentCompletedTask from '../Components/RecentCompletedTask'
import axios from 'axios'
import Pagination from '../Components/Pagination'
import TaskModal from '../Components/TaskModal'
import Statbox from '../Components/Statbox'
export const TaskPage = () => {
    const [taskId, setTaskId] = useState()
    const [taskList, setTaskList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [visible, setVisible] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [reward, setReward] = useState()
    const [taskDescription, setTaskDescription] = useState('')

    //initial data retrieval of tasks that are not completed from tasks database
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

    //arrow function to toggle modal visibility, makes sure its never the same as previous
    //state when toggling
    const toggleVisibility = () => {
        setVisible(prevState => !prevState)
    }

    const amountTasks = taskList.length
    //called by modal to update a specific task from taskmodal so once saved
    //the change is reflected on the webpage as well and not just the database
    const updateTaskInfo = (taskObject, taskid) =>{
        //find the index of the task id first
        console.log('triggered?')
        console.log('taskid is' + taskid)
        const index = taskList.findIndex((task) => task._id === taskid)

        if(index !== -1){
            console.log('index found')
            const updatedTaskList = [...taskList];
            updatedTaskList[index] ={
                ...updatedTaskList[index],
                name: taskObject.name,
                taskDescription: taskObject.taskDescription,
                rewardAmount: taskObject.rewardAmount
            }
            setTaskList(updatedTaskList)
            console.log(taskList)
        }
        

    }

    //post index for page pagination
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage

    //show view modal
    function viewModal(itemId){
        toggleVisibility()
        setEdit(false)
        let task = taskList.filter((task)=> task._id == itemId)
        task = task[0]
    
        setTaskName(task.name)
        setTaskDescription(task.taskDescription)
        setReward(task.rewardAmount)
        setTaskId(task._id)
    }
    //show modal information
    function showModal(itemId){
        toggleVisibility()
        setEdit(true)
        let task = taskList.filter((task)=> task._id == itemId)
        task = task[0]
    
        setTaskName(task.name)
        setTaskDescription(task.taskDescription)
        setReward(task.rewardAmount)
        setTaskId(task._id)
        
    }

    //filters out the task specified, for complete button to filter out task completed
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
            <div className='flex flex-col w-full'>
                <div className='flex pt-5 px-5'>
                    <Statbox amount={amountTasks}/>
                    
                </div>
                <div className='flex h-full w-full'>
                    <TaskModal 
                    visible = {visible}
                    taskName = {taskName}
                    taskDescription = {taskDescription}
                    reward = {reward}
                    taskid = {taskId}
                    visibility = {toggleVisibility}
                    updateTaskInfo = {updateTaskInfo}
                    isEdit = {isEdit}/>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold text-4xl mt-1 mx-5 mb-5 text-slate-100'>Your Tasks</h1>
                            
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
                                                <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>
                                                    <button onClick={()=> viewModal(items._id)}>{items.name}</button>
                                                </td>
                                                <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.taskDescription}</td>
                                                <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.rewardAmount}</td>
                                                <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0'>
                                                    <button className='grid place-items-center text-slate-200 bg-indigo-400 hover:bg-indigo-500 m-auto rounded-md px-7 py-1 border-grey-600 shadow-lg' onClick={()=> showModal(items._id)}>Edit</button>
                                                </td>
                                                <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0'>
                                                    <button className='grid place-items-center text-slate-200 bg-indigo-400 hover:bg-indigo-500 m-auto rounded-md px-2 py-1 border-grey-600 shadow-lg' onClick={() => updateTaskList(items._id)}>Complete</button>
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
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className= 'flex flex-col grow pt-5 pb-12'>
                <Link to = '/createtask'>
                    <button className='hidden lg:block w-[340px] h-[150px] bg-indigo-500 mb-[25px] mr-3 rounded-md text-2xl text-slate-100 font-bold hover:bg-indigo-600'>
                        Create a Task
                    </button>
                </Link>
                <RecentCompletedTask/>
            </div>
        </div>
  )
}

export default TaskPage
