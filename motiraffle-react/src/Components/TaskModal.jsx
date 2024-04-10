/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

export const TaskModal = (props) => {
    const [taskName, setTaskName] = useState(props.taskName)
    const [reward, setReward] = useState(props.reward)
    const [taskDescription, setTaskDescription] = useState(props.taskDescription)
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [taskId, setTaskId] = useState(props.taskid)

    const handleVisibility = () =>{
        props.visibility();
    }

    const updateTaskInfo = (taskObject, taskId) =>{
        console.log('calling parent updatetaskinfo...')
        props.updateTaskInfo(taskObject, taskId); // Call the function passed from the parent component
    }

    useEffect(() =>{
        setTaskName(props.taskName)
        setReward(props.reward)
        setTaskDescription(props.taskDescription)
        setVisible(props.visible)
        setEdit(props.edit)
    }, [props.taskName, props.reward, props.taskDescription, props.visible, props.edit]);

    function handleSubmit(){
        const editedTask = {
            name: taskName,
            rewardAmount: reward,
            taskDescription: taskDescription
        }


        axios
            .put('http://localhost:5555/tasks/'+ props.taskid, editedTask)
            .then((response)=>{
                console.log(response.data)
              })
              .catch((error)=>{
                console.log(error);
              })
        updateTaskInfo(editedTask, props.taskid)
    }

    if(!visible) return null
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col'>
                {props.isEdit ? <div className='bg-white w-[700px] h-[500px] rounded-md'>
                    <div className='px-3 pt-4'>
                        <label className="text-base font-medium">Task</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" value = {taskName} onChange = {(e) => setTaskName(e.target.value)} type = "text" required/>
                        <label className="text-base font-medium">Reward</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "text" value = {reward} onChange = {(e) => setReward(e.target.value)} required/>
                        <div className='pt-4 flex flex-col'>
                            <label className="text-base font-medium">Description</label>
                            <textarea className='h-[200px] rounded-md pl-[5px] border border-gray-800' required type = "text" value = {taskDescription} onChange = {(e) => setTaskDescription(e.target.value)} />
                        </div>
                        <div className='flex flex-row-reverse pt-4 pl-1 pr-1'>

                            <button className='bg-blue-400 px-5 py-1 rounded-md' onClick={() => handleSubmit()}>
                                Save
                            </button>
                            
                            <button className='bg-blue-400 px-5 py-1 rounded-md' onClick={() => handleVisibility()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div> : <div className='bg-white w-[700px] h-[500px] rounded-md'>
                    <div className='px-3 pt-4'>
                        <label className="text-base font-medium">Task</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" value = {taskName} type = "text"/>
                        <label className="text-base font-medium">Reward</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "text" value = {reward}/>
                        <div className='pt-4 flex flex-col'>
                            <label className="text-base font-medium">Description</label>
                            <textarea className='h-[200px] rounded-md pl-[5px] border border-gray-800' required type = "text" value = {taskDescription}/>
                        </div>
                        <div className='flex flex-row-reverse pt-4 pl-1 pr-1'>
                            
                            <button className='bg-blue-400 px-5 py-1 rounded-md' onClick={() => handleVisibility()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
  )
}

export default TaskModal