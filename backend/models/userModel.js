import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },

        password:{
            type: String,
            required: true,
        }
    }
);

UserSchema.statics.checkLogin = async function(username, password){
    const user = await this.findOne({username})
    if(!user){
        throw Error('No users found with this username');
    }
    if(user){
        const credentials = await this.findOne({username, password})
        if(!credentials){
            throw Error('Incorrect password');
        }

        if(credentials){
            console.log('wecome back');
        }
    }
};
export const User = mongoose.model('user', UserSchema);