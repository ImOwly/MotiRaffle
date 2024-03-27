import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import { useState } from 'react'


export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const btn = document.querySelectorAll(".option");
  btn.forEach(option =>{
    option.addEventListener("click", ()=>{

      document.getElementById('selected-text').innerText = option.innerText      
    })
  })
  
  return (
    <div className='flex flex-col items-end justify-end bg-white rounded-md'>
      <div className='flex justify-between space-x-[1434px] pt-[3px]'>
        <p id='selected-text'></p>
        <button onClick = {() => setIsOpen((prev)=>!prev)}>
            {!isOpen ? (<AiOutlineCaretDown className='h-8'/>) : (<AiOutlineCaretUp className='h-8'/>)}
            
        </button>
      </div>
        {isOpen &&(
          <ul className='flex-col w-full justify-between bg-white rounded-md p-[5px]'>
            <li className='option hover:bg-[#5d3a3a29] pl-[5px] rounded-md'>1</li>
            <li className='option hover:bg-[#5d3a3a29] pl-[5px] rounded-md'>2</li>
            <li className='option hover:bg-[#5d3a3a29] pl-[5px] rounded-md'>3</li>
            <li className='option hover:bg-[#5d3a3a29] pl-[5px] rounded-md'>4</li>
            <li className='option hover:bg-[#5d3a3a29] pl-[5px] rounded-md'>5</li>
          </ul>
        )}
    </div>
  )
}
