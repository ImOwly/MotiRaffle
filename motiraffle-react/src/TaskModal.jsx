/* eslint-disable react/prop-types */
import { useState } from 'react'
import React from 'react'

export const TaskModal = (props) => {
    //{console.log(props)}
    //{console.log(props.visible)}
    if(!props.visible) return null
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col'>
                <div className='bg-white w-[700px] h-[500px] rounded-md'>
                    <div className='px-3 pt-4'>
                        <label className="text-base font-medium">Task</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "text" placeholder={props.taskName} required/>
                        <label className="text-base font-medium">Reward</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "text" placeholder={props.reward} required/>
                        <div className='pt-4 flex flex-col'>
                            <label className="text-base font-medium">Description</label>
                            <textarea className='h-[200px] rounded-md pl-[5px] border border-gray-800' required type = "text" placeholder={props.taskDescription}/>
                        </div>
                        <div className='flex flex-row-reverse pt-4 pr-1'>
                            <button className='bg-blue-400 px-5 py-1 rounded-md'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TaskModal