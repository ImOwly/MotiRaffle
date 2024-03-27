import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { User } from "./models/userModel.js";
import loginRoute from "./routes/loginRoute.js";
import registerRoute from "./routes/registerRoute.js";
import taskRoute from "./routes/taskRoute.js";
import raffleRoute from "./routes/raffleRoute.js";
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('backend of motiraffle')
});

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/tasks', taskRoute);
app.use('/raffles', raffleRoute);
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app connected to mongodb');
        app.listen(PORT, () => {
            console.log(`app is listening to port : ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });