import mongoose from "mongoose"

const BlogSchema  = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    minLength:2,
    trim:true
  },
  createdBy:{
    type:mongoose.SchemaTypes.ObjectId,
    required: true,
    ref:user
  },
  claps:{
    type: Number,
    default: 0
  },
  views:{
    type: Number,
    default: 0
  },
  body:String,
  coverimage:String

}, {timestamps:true})


export const Blog = mongoose.model("Blog", BlogSchema)
