import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Pagination from './Pagination'
export const RecentClaimedRaffle = () => {
  const [raffleList, setRaffleList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(9)
  useEffect(() =>{
    axios
      .get('http://localhost:5555/raffles')
      .then((response)=>{
        setRaffleList(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  
  }, []);

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = raffleList.slice(firstPostIndex, lastPostIndex)

  return (
    <div className='flex flex-col bg-[#27282b] mr-[50px] pl-[70px] pr-[70px] rounded-md grow'>
          <p className='border border-gray-600 border-t-0 border-l-0 border-r-0 text-white text-opacity-85 font-bold pt-4 pb-4'>Recently Claimed Raffles</p>
          {raffleList.slice(0,19).map((items) => (
              <li className='text-white text-opacity-85 pr-[60px] pt-1 list-none max-w-[200px] truncate' key={items._id}>{items.name}</li>
          ))}

          <div className='flex items-center justify-center text-white font-bold text-opacity-85'>
            
          </div>
          
    </div>
  )
}
export default RecentClaimedRaffle