import mongoose from "mongoose"
import { Schema,model } from "mongoose"
const VendorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
})

const Vendor = model("Vendor", VendorSchema)

export default  Vendor