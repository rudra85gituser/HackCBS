import mongoose from "mongoose";
import { Schema } from "mongoose";

const BuyerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    phone:{
        type: Number,
    },
    Product:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    image:{
        type: String
    }
})

export default mongoose.model("Buyer", BuyerSchema)