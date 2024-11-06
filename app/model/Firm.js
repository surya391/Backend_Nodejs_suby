import mongoose from "mongoose"
import { Schema, model } from "mongoose"
const FirmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }]
    },
    region: {
        type: [
            {
                type: String,
                enum: ['south-india', 'north-india', 'chines', 'bakery']
            }
        ]
    },
    offer:{
        type:String,
        
    },
    image:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]

})

const Firm = model("Firm", FirmSchema)

export default Firm