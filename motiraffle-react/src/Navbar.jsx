import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='w-full flex py-5 justify-between items-center bg-[#27282b] px-5 text-white'>
        <h1 className='w-full text-3xl font-bold text-[#3fbb60]'>MotiRaffle</h1>
        <ul className='hidden md:flex'>
            <li className='p-4 text-xl'></li>
            <Link to = "/Home" className = 'p-4 text-xl'>Home</Link>
            <li className='p-4 text-xl'>Feautres</li>

            
        </ul>
        <button className='bg-[#3fbb60] w-[150px] rounded-md font-medium my-6 mx-auto py-3'>
          <Link to = "/login">Login</Link>
        </button>

    </nav>
  )
}

export default Navbar