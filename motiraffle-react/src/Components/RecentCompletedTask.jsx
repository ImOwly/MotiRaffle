import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Pagination from './Pagination'
export const RecentCompletedTask = () => {
  const [taskList, setTaskList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(9)
  useEffect(() =>{
    axios
      .get('http://localhost:5555/tasks')
      .then((response)=>{
        setTaskList(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  
  }, []);



  return (
    <div className='hidden lg:block flex flex-col bg-[#27282b] pl-[70px] pr-[70px] rounded-md h-[520px] grow lg:visible md:visible sm:hidden'>
          <p className='border border-gray-600 border-t-0 border-l-0 border-r-0 text-white text-opacity-85 font-bold pt-4 pb-4'>Recently Completed Tasks</p>
          {taskList.map((items) => (
              <li className='text-white text-opacity-85 pr-[60px] pt-1 list-none max-w-[200px] truncate' key={items._id}>{items.name}</li>
          ))}

          <div className='flex items-center justify-center text-white font-bold text-opacity-85 '>

          </div>
          
    </div>
  )
}
export default RecentCompletedTask