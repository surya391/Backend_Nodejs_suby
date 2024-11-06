import Vendor from '../model/Vendor.js';
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import dotenv from 'dotenv'
dotenv.config()

export const VendorRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const vendorEmail = await Vendor.findOne({ email })
        if (vendorEmail) {
            return res.status(400).json({ message: 'Email is already taken.' })
        }
        // const hashedPassword = await bcrypt.hash(password,10)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        })
        await newVendor.save()
        res.status(201).json({ message: "vendor registered successfully" })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}

export const vendorLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const vendor = await Vendor.findOne({ email })
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "invalid username or password" })
        }
        const token = jwt.sign({vendorId: vendor.id},process.env.SECRET_KEY,{expiresIn:'30d'})
        res.status(200).json({ success: "Login successful",token })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}

export const getAllVendor = async(req,res) => {
    try{
        const vendors = await Vendor.find().populate('firm')
        res.json({vendors})
    }catch(error){
        res.status(500).json({error:"Internal server error."})
    }
}

export const getvendorById = async(req,res) => {
    const vendorId = req.params.id
    try{
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})
    }catch(error){
        res.status(500).json({error:"Internal server error."})
    }
}
