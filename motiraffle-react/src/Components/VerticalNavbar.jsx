import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export const VerticalNavbar = () => {
  return (
    <div className='flex flex-col sticky bg-[#27282b] h-screen px-3 min-w-[250px]'>
        <p className='w-full text-3xl font-bold text-indigo-500 ml-4 mr-4 mt-4 mb-5'>Motiraffle</p>
        <div className='flex flex-col'>
          <Link to = "/home" className='ml-4 mb-2 text-slate-100 hover:bg-[#1c1c1e] rounded-md mr-4 pt-2 pb-2'>Dashboard</Link>
          <Link to = "/tasks" className='ml-4 mt-2 mb-2 text-slate-100 hover:bg-[#1c1c1e] rounded-md mr-4 pt-2 pb-2'>Tasks</Link>
          <Link to = "/raffle" className='ml-4 mt-2 mb-2 text-slate-100 hover:bg-[#1c1c1e] rounded-md mr-4 pt-2 pb-2'>Raffle</Link>
        </div>
    </div>
  )
  
}

export default VerticalNavbar