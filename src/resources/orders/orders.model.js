import mongoose from 'mongoose'
import {deliveryPrices} from '../../utils/locationprice'
import chalk from 'chalk'
import {Product} from '../products/product.model'

const OrderSchema = new mongoose.Schema({
    products:{
        type:[{product:mongoose.SchemaTypes.ObjectId, qty:Number}],
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
        phoneNumber:{type:String, minLength:9},
        city:{
            type:String,
            required: true,
            trim: true
        }
    },
    shippingFee:{
        type:Number,
        // required:true
    },
    shippingLocation:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        min:0,
        // required:true
    },
    totalBill:{
        type:Number,
        min:0
    },
    paid:{
        type:Boolean,
        default:false,
        required:true
    }
})

OrderSchema.pre('save', async function(next){
    console.log(chalk.bold.greenBright(this))
    let ids = this.products.map(e  => mongoose.Types.ObjectId(e.product) )
    this.shippingFee = deliveryPrices[this.shippingLocation]
    if(typeof(this.shippingFee) === "number"){
        const Products = await Product.find({_id: [
            ...ids
        ]})
        let total = Products.map(e => {
            return {id:e.id, cost:e.cost}
        })
        let totalSum = this.products.map(e => {
            console.log(e.product)
            let product = total.find(p => {
                return JSON.stringify(p.id) === JSON.stringify(e.product)
            })
            return e.sum = e.qty * product.cost
        })
        this.total = totalSum.reduce((e , c)=> e.sum + c.sum)
        this.totalBill = this.total + this.shippingFee
        next()
    }else{
        throw new Error('Did You select a location in our List')
    }
})

export const Order = mongoose.model('Order', OrderSchema)