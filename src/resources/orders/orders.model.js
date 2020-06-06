import mongoose from "mongoose";
import { deliveryPrices } from "../../utils/locationprice";
import chalk from "chalk";
import { Product } from "../products/product.model";

const OrderSchema = new mongoose.Schema({
    products: {
        type: [{ product: mongoose.SchemaTypes.ObjectId, qty: Number }],
        refs: "product",
    },
    OrderdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        // required:true
        ref: "user",
    },
    shippingDetails: {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
        },
        location: { type: String },
        email: { type: String },
        phoneNumber: { type: String, minLength: 9 },
        city: {
            type: String,
            required: true,
            trim: true,
        },
    },
    shippingFee: {
        type: Number,
        // required:true
    },
    shippingLocation: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        min: 0,
        // required:true
    },
    totalBill: {
        type: Number,
        min: 0,
    },
    paid: {
        type: Boolean,
        default: false,
        required: true,
    },
});

OrderSchema.pre("save", async function (next) {
    let ids = this.products.map((e) => mongoose.Types.ObjectId(e.product));

    this.shippingFee = deliveryPrices[this.shippingLocation];

    if (this.shippingFee) {
        const total = await Product.find({ _id: [...ids] }).select("id cost");

        console.log(total, "********************");

        const sum = [];

        for (const e of this.products) {
            let product = total.find((p) => {
                return JSON.stringify(p.id) === JSON.stringify(e.product);
            });

            let sumqty = e.qty * product.cost;
            sum.push(sumqty);
        }
        this.total = sum.reduce((e, c) => +e + +c);
        this.totalBill = this.total + this.shippingFee;
        next();
    } else {
        throw new Error("Did You select a location in our List");
    }
});

export const Order = mongoose.model("Order", OrderSchema);
