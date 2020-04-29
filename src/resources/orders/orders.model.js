import mongoose from 'mongoose'
import deliveryPrices from '../../utils/locationprice'


const OrderSchema = new mongoose.Schema({
    products:{
        type:[mongoose.SchemaTypes.ObjectId],
        refs:'Product'
    },
    OrderdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        // required:true
        ref:"user"
    },
    shippingDetails:{
        fullName:{
            type:String,
            required:true,
            trim:true,
            minLength:2
        },
        location:{type:String},
        email:{type:String},
        phoneNumber:{type:String, minLength:9}
    },
    ShippingFee:{
        type:Number,
        required:true
    },
    ShippingLocation:{
        type:String,
        required:true
    }
})

OrderSchema.pre('save', function(next){
    this.ShippingFee = deliveryPrices[this.ShippingLocation]
    if(typeof(this.ShippingFee) === "number"){
        next()
    }else{
        throw new Error('Did You select a location in our List')
    }
})

export const Order = mongoose.model('Order', OrderSchema)