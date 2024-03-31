/* eslint-disable react/prop-types */
import React from 'react'

export const Statbox = (props) => {
  return (
    <div className = 'w-full h-full bg-[#27282b] rounded-lg'>
        <div className='flex'>
            <div className='bg-blue-400 p-4 my-6 mx-5 w-full rounded-lg'>
                <p className='text-slate-100 text-3xl ml-4'>Raffles collected</p>
                <br></br>
                <br></br>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{props.amount}</p>
            </div>
            <div className='p-4 bg-blue-400 my-6 mx-4 w-full rounded-lg'>
            <p className='text-slate-100 text-3xl ml-4'>Total Tasks finished</p>
                <br/>
                <br/>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{props.amount}</p>
            </div>
        </div>
    </div>
  )
  
}

export default Statbox