import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <>
        <Navbar/>
        <div className='flex justify-center items-center mx-auto h-screen'>
            <div className='w-1/2 p-5 bg-gray-300 rounded-md border border-black'>
                <h1 className='text-center text-3xl pt-1 pb-5 font-bold'>Login</h1>
                <div>
                    <label className="text-base font-medium">Username</label>
                    <input className = "rounded-md text-base w-full px-2 py-2 mb-6 border border-gray-800 focus:outline-none" type = "text" placeholder='Username' required/>
                    <label className="text-base font-medium">Password</label>
                    <input className = "rounded-md text-base w-full px-2 py-2 border border-gray-800 focus:outline-none" type = "password" placeholder='Password' required/>
                </div>

                <div className='pt-4 pb-8 flex justify-center'>
                <button className='bg-[#3fbb60] w-[150px] rounded-md font-medium my-6 mx-auto py-3 text-white'>
                    Login</button>
                </div>

                <div className='flex flex-col items-center'>
                    <Link to = "/">Forgot password?</Link>
                    <p>new to the website? <Link className = "font-bold" to = "/register">Register now!</Link> </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login