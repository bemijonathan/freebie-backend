import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, unique:true, required:true},
    photo:{type:String, unique:true, required:true,}
})


export const User = mongoose.model('User', UserSchema)