import express from 'express';
import mongoose, { connect }  from 'mongoose';
import { DB_NAME } from './constant.js';
import dotenv from "dotenv";
import {app} from './app.js';
dotenv.config();


//const app = express();
(async ()=> {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error:",error);
            throw error;
        })
        app.listen(process.env.PORT || 5000 ,()=>{
            console.log(` Server running on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("MongoDB connection Failed:",error);
        throw error;
    }
})();

