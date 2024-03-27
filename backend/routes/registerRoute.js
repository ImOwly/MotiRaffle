import express from 'express';
const router = express.Router();
import { User } from "../models/userModel.js";

router.post('/', async(request, response) =>{
    try{
        if(
            !request.body.username ||
            !request.body.password
        ){
            return response.status(400).send({message: 'username and password required'});
        }

        const findUserQuery = await User.where({username: request.body.username})
        const queryResults = await findUserQuery.findOne();
        
        if(queryResults){
            throw Error('username already in use')
        }


        const loginUser = {
            username : request.body.username,
            password : request.body.password
        };

        return response.status(201).send(loginUser);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

router.get('/', async (request,response)=>{
    try{
        const accounts = await User.find();
        return response.status(200).json(accounts)

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
export default router