/* eslint-disable react/prop-types */
import React from 'react'

export const RaffleCard = (props) => {
  function handleSubmit(){
    props.updateRaffleList(props.dbid)
  }
  return (
    <div className='bg-indigo-400 w-[275px] h-[120px] rounded-md mb-4 hover:bg-indigo-500'>
        <p className='pl-1 pt-1 font-bold text-slate-200'>{props.name}</p>
        <p className='pl-1 pt-1 text-slate-200'>{props.cost}</p>
        <div className='flex justify-end m-2'>
            <button className= 'rounded-md p-1 shadow-sm bg-indigo-500 hover:bg-indigo-600' onClick = {handleSubmit}>Claim raffle</button>
        </div>
    </div>
  )
}

export default RaffleCard