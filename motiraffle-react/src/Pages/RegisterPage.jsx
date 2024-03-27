import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar'
import Alert from '@mui/material/Alert';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('false');

    function handleSubmit(event){
        event.preventDefault();
        const loginCredentials = {username, password};
        axios
            .post('http://localhost:5555/login', loginCredentials)
            .then((response) =>{
                console.log(response);
                setAlert(true);
            })
            .catch((error) =>{
                console.log(error);
            })
        console.log(loginCredentials);
    }
    return (
        <>

            <Navbar/>
    
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center items-center mx-auto h-screen mt-[-30px]'>
                    <div className='w-1/2 p-5 bg-gray-300 rounded-md border border-black'>
                        <h1 className='text-center text-3xl pt-1 pb-5 font-bold'>Register an account</h1>
                        {alert == true ? (<div className='flex justify-center'><p className='flex justify-center place-items-center bg-[#3fbb60] border-black w-[820px] h-[50px] rounded-md border'>account registered, login to continue</p></div>) : <div></div>}
                        <div>
                            <label className="text-base font-medium">Username</label>
                            <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "text" placeholder='Username' required value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                            <label className="text-base font-medium">Password</label>
                            <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "password" placeholder='Password' required  value = {password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
        
                        <div className='pt-4 pb-8 flex justify-center'>
                        <button className='bg-[#3fbb60] w-[150px] rounded-md font-medium my-6 mx-auto py-3 text-white' type='submit'>
                            Register</button>
                        </div>
        
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterPage