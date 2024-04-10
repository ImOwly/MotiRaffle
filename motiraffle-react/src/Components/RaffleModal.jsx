/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

export const RaffleModal = (props) => {
    const [raffleName, setRaffleName] = useState(props.raffleName)
    const [cost, setCost] = useState(props.cost)
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [raffleId, setRaffleId] = useState(props.raffleId)

    const handleVisibility = () =>{
        props.visibility();
    }


    const updateRaffleInfo = (RaffleObject, raffleId) =>{
        props.updateRaffleInfo(RaffleObject, raffleId); // Call the function passed from the parent component
    }

    //wait for props to fully load in
    useEffect(() =>{
        setRaffleName(props.raffleName)
        setCost(props.cost)
        setVisible(props.visible)
        setEdit(props.edit)
        setRaffleId(props.raffleId)
    }, [props.raffleName, props.cost, props.visible, props.edit, props.raffleId]);

    function handleSubmit(){
        console.log(props.raffleId)
        const editedRaffle = {
            name: raffleName,
            cost: cost,
        }

        axios
            .put('http://localhost:5555/raffles/'+ props.raffleId, editedRaffle)
            .then((response)=>{
                console.log(response.data)
              })
              .catch((error)=>{
                console.log(error);
              })
        updateRaffleInfo(editedRaffle, props.raffleId)
    }

    if(!visible) return null
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col'>
                {props.isEdit ? <div className='bg-white w-[700px] h-[500px] rounded-md'>
                    <div className='px-3 pt-4'>
                        <label className="text-base font-medium">Raffle</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" value = {raffleName} onChange = {(e) => setRaffleName(e.target.value)} type = "text" required/>
                        <label className="text-base font-medium">Cost</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "text" value = {cost} onChange = {(e) => setCost(e.target.value)} required/>
                        <div className='flex flex-row-reverse pt-4 pl-1 pr-1'>
                            <button className='bg-blue-400 px-5 py-1 rounded-md' onClick={() => handleSubmit()}>
                                Save
                            </button>
                            
                            <button className='bg-blue-400 px-5 py-1 rounded-md' onClick={() => handleVisibility()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div> : <div className='bg-white w-[700px] h-[500px] rounded-md'>
                    <div className='px-3 pt-4'>
                        <label className="text-base font-medium">Raffle</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" value = {raffleName} type = "text"/>
                        <label className="text-base font-medium">Cost</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "text" value = {cost}/>
                        <div className='flex flex-row-reverse pt-4 pl-1 pr-1'>                            
                            <button className='bg-blue-400 px-5 py-1 rounded-md' onClick={() => handleVisibility()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
  )
}

export default RaffleModal