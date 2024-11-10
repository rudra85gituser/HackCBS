import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },

    image:[{
        type: String,
        required: true
    }],
    seller:{
        type: Schema.Types.ObjectId,
        ref: "Seller"
    },
    rating:{
        type: Number,
        default: 0
    },
    c:{
        type: Number,
        default: 0
    }
}); 

export default mongoose.model("Product", ProductSchema);