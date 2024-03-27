import React from 'react'
import VerticalNavbar from '../VerticalNavbar'
import RecentCompletedTask from '../RecentCompletedTask'
import Pagination from '../Pagination'
import axios from 'axios'
import RecentClaimedRaffle from '../RecentlyClaimedRaffle'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export const RafflePage = () => {
  const [raffleList, setRaffleList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
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

        <div className='flex'>
            <VerticalNavbar/>
            
            <div className='flex flex-col w-full'>
                
                <div className='w-full h-24 bg-[#27282b]'>
                    
                </div>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-6xl mt-10 mx-10 mb-5 text-slate-100'>Your Raffles</h1>
                    <button className='mt-5 bg-[#3fbb60] w-[150px] rounded-md font-medium my-11 mx-auto pt-2py-3 translate-x-[240px]'>Go to raffle</button>
                </div>
                <div className='flex grow mb-[50px]'>
                    <div className='bg-[#27282b] rounded mx-5 px-4 pt-2 flex-1'>
                        <table className='w-full mt-2'>
                            <thead>
                                <tr>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1'>Raffle</td>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1'>Cost</td>
                                </tr>
                            </thead>
                            <tbody className='mx-auto'>
                                {currentPosts.map((items) => (
                                    <tr className='max-w-0 border-y border-l-0 border-r-0 border-b-0 pt-2 pb-2' key={items._id}>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.name}</td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.cost}</td>
                                    </tr>
                                
                                 ))}
                                
                            </tbody>
                        </table>
                        <div className='flex justify-center text-white font-bold text-opacity-85'>
                            <Pagination
                                totalPosts={raffleList.length}
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage}>
                            </Pagination>
                        </div>
                    </div>
                    <RecentClaimedRaffle/>
                </div>
                
            </div>
            
        </div>

    
  )
}

export default RafflePage