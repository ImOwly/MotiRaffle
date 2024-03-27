import express from 'express';
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
export default router