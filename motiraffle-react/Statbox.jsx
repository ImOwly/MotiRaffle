/* eslint-disable react/prop-types */
import React from 'react'

export const Statbox = (props) => {
  return (
    <div className = 'w-full h-full rounded-lg'>
        <div className='flex'>
            <div className='bg-[#27282b] p-4 my-6 mx-3 w-full rounded-lg'>
                <p className='text-slate-100 text-3xl ml-4 text-opacity-85'>Raffles collected</p>
                <br></br>
                <br></br>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{props.amount}</p>
            </div>
            <div className='p-4 bg-[#27282b] my-6 mx-4 w-full rounded-lg'>
            <p className='text-slate-100 text-3xl ml-4 text-opacity-85'>Total Tasks finished</p>
                <br/>
                <br/>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{props.amount}</p>
            </div>
            <div className='p-4 bg-[#27282b] my-6 mx-3 w-full rounded-lg'>
            <p className='text-slate-100 text-3xl ml-4 text-opacity-85'>Raffles owned</p>
                <br/>
                <br/>
                <p className='mb-2 text-slate-100 text-4xl font-bold ml-4'>{props.amount}</p>
            </div>
            
        </div>
    </div>
  )
  
}

export default Statbox