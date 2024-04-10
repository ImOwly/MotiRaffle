import React from 'react'
import VerticalNavbar from '../Components/VerticalNavbar'
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CreateRafflePage = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  let createdBy = "admin";
  let claimed = false;

  function handleSubmit(event){
    event.preventDefault();
    const newRaffle = {name, cost, createdBy, claimed};
    axios
      .post('http://localhost:5555/raffles', newRaffle)
      .then((response) =>{
        console.log(response);
      })
      .catch((error) =>{
        console.log(error);
      })
    console.log(newRaffle);
    toast('Reward created')
  }
  return (
    <div className='flex'>
        <VerticalNavbar/>
        <div>
            <div className='w-[1670px] h-24 flex flex-row-reverse bg-[#27282b]'/>
                <div className='flex flex-col bg-[#27282b] m-4 pb-5 rounded-mmd'>
                    <h1 className='font-bold text-6xl mt-10 mx-10 mb-5 text-slate-100'>Create Raffle</h1>
                    <form onSubmit = {handleSubmit} className='px-[100px]'>
                        <label className="text-base font-medium text-slate-100 text-opacity-85">Raffle Name</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "text" placeholder='Task Name' required value = {name} onChange = {(e) => setName(e.target.value)}/>
                        <label className="text-base font-medium text-slate-100 text-opacity-85">Raffle cost</label>
                        <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "number" placeholder= '0' required value = {cost} onChange = {(e) => setCost(e.target.value)}/>
                        <button className='p-2 bg-indigo-500 hover:bg-indigo-600 mt-3 rounded-md text-slate-100' type='submit'>Create Raffle</button>
                    </form>
                </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce
        />
    </div>
  )
}

export default CreateRafflePage