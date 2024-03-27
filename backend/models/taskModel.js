import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rewardAmount:{
            type: Number,
            required: true,
        },
        taskDescription:{
            type: String,
            required: true,
        },
        completed:{
            type:Boolean,
            required: true,
        }

    }
);
export const Task = mongoose.model('task', taskSchema);