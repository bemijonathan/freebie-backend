import mongoose, { Schema } from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    // images: {
    //     type: [String]
    // },
    cost: {
        type: Number,
        min: 0,
        required: true,

    }
}, { timestamps: true })


export const Product = mongoose.model('Product', ProductSchema)