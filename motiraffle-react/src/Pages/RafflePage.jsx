import React from 'react'
import VerticalNavbar from '../VerticalNavbar'
import RecentCompletedTask from '../RecentCompletedTask'
import Pagination from '../Pagination'
import axios from 'axios'
import RecentClaimedRaffle from '../RecentlyClaimedRaffle'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RaffleModal from '../RaffleModal'
export const RafflePage = () => {
    const [raffleId, setRaffleId] = useState()
    const [raffleList, setRaffleList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [raffleName, setRaffleName] = useState('')
    const [cost, setCost] = useState(0)
    const [visible, setVisible] = useState(false)
    const [isEdit, setEdit] = useState(false)
    useEffect(() =>{
        axios
          .get('http://localhost:5555/raffles/notclaimed')
          .then((response)=>{
            setRaffleList(response.data);
          })
          .catch((error)=>{
            console.log(error);
          })
        const currentPosts = raffleList.slice(firstPostIndex, lastPostIndex)
        setRaffleList(currentPosts)
    }, []);

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage

    //arrow function to toggle modal visibility, makes sure its never the same as previous
    //state when toggling
    const toggleVisibility = () => {
        setVisible(prevState => !prevState)
    }

    //called by modal to update a specific task from taskmodal so once saved
    //the change is reflected on the webpage as well and not just the database
    const updateRaffleInfo = (raffleObject, raffleid) =>{
        //find the index of the task id first
        console.log('triggered?')
        console.log('taskid is' + raffleid)
        const index = raffleList.findIndex((raffle) => raffle._id === raffleid)

        if(index !== -1){
            console.log('index found')
            const updatedRaffleList = [...raffleList];
            updatedRaffleList[index] ={
                ...updatedRaffleList[index],
                name: raffleObject.name,
                cost: raffleObject.cost
            }
            setRaffleList(updatedRaffleList)
            console.log(raffleList)
        }
        

    }

    //show view modal
    function viewModal(itemId){
        toggleVisibility()
        setEdit(false)
        let raffle = raffleList.filter((raffle)=> raffle._id == itemId)
        raffle = raffle[0]
    
        setRaffleName(raffle.name)
        setCost(raffle.cost)
        setRaffleId(raffle._id)
    }
    //show modal information
    function showModal(itemId){
        toggleVisibility()
        setEdit(true)
        let raffle = raffleList.filter((raffle)=> raffle._id == itemId)
        raffle = raffle[0]
    
        setRaffleName(raffle.name)
        setCost(raffle.cost)
        setRaffleId(raffle._id)
        
    }

    //filters out the raffle specified, for complete button to filter out task completed
    function updateRaffleList(itemId){
        const newRaffleList = raffleList.filter((raffle) => raffle._id != itemId)
        setRaffleList(newRaffleList)
        const claimed = {
            claimed : true
        }
        axios
            .put('http://localhost:5555/raffles/'+ itemId, claimed)
            .then((response)=>{
                console.log(response.data)
              })
              .catch((error)=>{
                console.log(error);
              })
    }

    return (

        <div className='flex'>
            <VerticalNavbar/>
            <RaffleModal visible = {visible}
            raffleName = {raffleName}
            cost = {cost}
            raffleId = {raffleId}
            visibility = {toggleVisibility}
            updateRaffleInfo = {updateRaffleInfo}
            isEdit = {isEdit}/>
            <div className='flex flex-col w-full'>
                
                
                <div className='flex justify-between'>
                    <h1 className='font-bold text-6xl mt-10 mx-10 mb-5 text-slate-100'>Your Raffles</h1>
                    <button className='mt-5 bg-[#3fbb60] w-[150px] rounded-md font-medium my-11 mx-auto pt-2py-3 translate-x-[240px]'>Go to raffle</button>
                </div>
                <div className='flex grow mb-[50px]'>
                    <div className='bg-[#27282b] rounded mx-5 px-4 pt-2 flex-1'>
                        <table className='w-full mt-2'>
                            <thead>
                                <tr>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1'>Raffle</td>
                                    <td className='text-white font-bold text-opacity-85 pt-2 pb-1'>Cost</td>
                                </tr>
                            </thead>
                            <tbody className='mx-auto'>
                                {raffleList.map((items) => (
                                    <tr className='max-w-0 border-y border-l-0 border-r-0 border-b-0 pt-2 pb-2' key={items._id}>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>
                                            <button onClick={()=> viewModal(items._id)}>{items.name}</button>
                                        </td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0 truncate text-white text-opacity-85 pt-2 pb-2'>{items.cost}</td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0'>
                                            <button className='grid place-items-center bg-blue-400 m-auto rounded-md px-7 py-1 border-grey-600 shadow-lg' onClick={()=> showModal(items._id)}>Edit</button>
                                        </td>
                                        <td className='border border-gray-600 border-l-0 border-r-0 max-w-[50px] border-b-0'>
                                            <button className='grid place-items-center bg-blue-400 m-auto rounded-md px-2 py-1 border-grey-600 shadow-lg' onClick={() => updateRaffleList(items._id)}>Complete</button>
                                        </td>
                                    </tr>
                                
                                 ))}
                                
                            </tbody>
                        </table>
                        <div className='flex justify-center text-white font-bold text-opacity-85'>
                            <Pagination
                                totalPosts={raffleList.length}
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage}>
                            </Pagination>
                        </div>
                    </div>
                    <RecentClaimedRaffle/>
                </div>
                
            </div>
            
        </div>

    
  )
}

export default RafflePage