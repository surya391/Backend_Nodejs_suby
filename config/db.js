import mongoose from "mongoose";

export const configDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/food');
        console.log("Connected to DB");
    } catch (err) {
        console.log('Error connecting to DB', err);
    }
};
