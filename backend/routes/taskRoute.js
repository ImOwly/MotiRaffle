import express from 'express';
const router = express.Router();
import { Task } from '../models/taskModel.js';

router.post('/', async(request, response) =>{
    try{
        
        const newTask = {
            name : request.body.name,
            rewardAmount : request.body.rewardAmount,
            taskDescription : request.body.taskDescription,
            createdBy: request.body.createdBy,
            completed: request.body.completed

        };
        const task = await Task.create(newTask);
        return response.status(201).send(task);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/completed', async (request,response)=>{
    try{
        const completedTasks = await Task.find({completed: true});
        return response.status(200).json(completedTasks);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/notcompleted', async (request,response)=>{
    try{
        const completedTasks = await Task.find({completed: false});
        return response.status(200).json(completedTasks);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/:amount', async (request,response)=>{
    try{
        const tasks = await Task.find().limit(request.params.amount);
        return response.status(200).json(tasks)

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});




router.get('/', async (request,response)=>{
    try{
        const tasks = await Task.find();
        return response.status(200).json(tasks)

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.delete('/:id', async(request, response)=>{
    try{
        Task.findByIdAndDelete(request.params.id).then(task=>{
            if(!task){
                return response.status(404).send();
            }
            response.send(task)
        })
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

router.put('/:id', async(request, response) =>{
    try{
        const task = await Task.findByIdAndUpdate(request.params.id, request.body)
        if(!task){
            return response.status(404).json({message: 'task not found'})
        }
        const updatedTask = await Task.findById(request.params.id);
        response.status(200).json(updatedTask)
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})
export default router