import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import  vendorRoutes  from './app/routes/vendorRoutes.js';
import { configDB } from "./config/db.js";
import firmRoutes from"./app/routes/firmRoutes.js"
import productRoutes from "./app/routes/productRoutes.js";
import path from 'path'

dotenv.config();
const app = express();
configDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/vendor', vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))


app.use('/', (req, res) => {
    res.send('Welcome to food');
});

// Start the server
const port = process.env.port || 4040;
app.listen(port, () => {
    console.log(`Server started and running at port ${port}`);
});
