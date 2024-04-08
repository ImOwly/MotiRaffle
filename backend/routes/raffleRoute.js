import express, { response } from 'express';
const router = express.Router();
import { Raffle } from '../models/raffleModel.js';


router.post('/', async (request, response)=>{
    try{
        const newRaffle = {
            name : request.body.name,
            cost: request.body.cost,
            createdBy: request.body.createdBy,
            claimed: request.body.claimed
        }
        const raffle = await Raffle.create(newRaffle);
        return response.status(201).send(raffle);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/notclaimed', async (request, response)=>{
    try{
        const claimedRaffles = await Raffle.find({claimed: false});
        return response.status(200).json(claimedRaffles);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/claimed', async (request, response)=>{
    try{
        const claimedRaffles = await Raffle.find({claimed: true});
        return response.status(200).json(claimedRaffles);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/', async (request,response)=>{
    try{
        const raffles = await Raffle.find();
        return response.status(200).json(raffles)

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.delete('/:id', async(request, response)=>{
    try{
        Raffle.findByIdAndDelete(request.params.id).then(raffle=>{
            if(!raffle){
                return response.status(404).send();
            }
            response.send(raffle)
        })
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

router.put('/:id', async(request, response) =>{
    try{
        const raffle = await Raffle.findByIdAndUpdate(request.params.id, request.body)
        if(!raffle){
            return response.status(404).json({message: 'raffle not found'})
        }
        const updatedRaffle = await Raffle.findById(request.params.id);
        response.status(200).json(updatedRaffle)
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})
export default router