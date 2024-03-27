import mongoose from "mongoose";

const raffleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cost: {
            type:Number,
            required: true,
        },
        createdBy: {
            type:String,
            required: true,
        },
        claimed: {
            type: Boolean,
            required: true,
        }

    }
);
export const Raffle = mongoose.model('raffle', raffleSchema);