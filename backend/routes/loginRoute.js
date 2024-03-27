import express from 'express';
const router = express.Router();
import { User } from "../models/userModel.js";


router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.username ||
            !request.body.password
        ){
            return response.status(400).send({message: 'username and password required'});
        }
        const newUser = {
            username : request.body.username,
            password : request.body.password
        };
        const user = await User.create(newUser);
        return response.status(201).send(user);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response) =>{
    try{
        const logins = await User.find({});
        return response.status(200).json(logins);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//get by id
router.get('/:id', async (request, response)=>{
    const {username, password} = req.body;
    try{
        const user = await User.checkLogin(username, password);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.username ||
            !request.body.password 
        ){
            return response.status(400).send({
                message: 'send all required fields username and password'
            });
        }
        const {id} = request.params
        const result = await User.findByIdAndUpdate(id, request.body);
        if (!result){
            return response.status(404).json({message: 'login not found'})
        }
        return response.status(200).send({message:'login changed successfully'});
    }

    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router