/* eslint-disable react/prop-types */
import React from 'react'

export const RaffleCard = (props) => {
  function handleSubmit(){
    props.updateRaffleList(props.dbid)
  }
  return (
    <div className='bg-indigo-400 w-[275px] h-[120px] rounded-md mb-4'>
        <p className='pl-1 pt-1 font-bold text-slate-100'>{props.name}</p>
        <p className='pl-1 pt-1 text-slate-100'>{props.cost}</p>
        <div className='flex justify-end m-2'>
            <button className= 'rounded-md p-1 border border-black bg-indigo-500' onClick = {handleSubmit}>Claim raffle</button>
        </div>
    </div>
  )
}

export default RaffleCard