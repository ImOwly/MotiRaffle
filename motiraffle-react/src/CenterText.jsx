import React from 'react'
import { Outlet, Link } from 'react-router-dom'
export const CenterText = () => {
  return (
    <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#3fbb60] font-bold p-2 md:text-[40px] sm: text-[30px] text-[20px]'>MotiRaffle</p>
            <h1 className='md:text-[50px] sm:text-[40px] text-[30px] font-bold md:py-6'>Make it so tasks feel like games!</h1>
            <div>
                <p className='md:text-4xl sm:text-3xl text-xl'>Make it so each tasks can be exchanged for something you want!</p>
            </div>
            <div className='md-text-2xl text-xl'>
                <button className='bg-[#3fbb60] w-[150px] rounded-md font-medium my-6 mx-auto py-3'>
                  <Link to = "/login">Get started</Link>
                </button>
            </div>
        </div>

    </div>
    
  )
  
}

export default CenterText