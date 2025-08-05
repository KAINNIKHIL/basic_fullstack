import express from 'express';
import mongoose  from 'mongoose';
import { DB_NAME } from './constant.js';
import dotenv from "dotenv";
dotenv.config();


const app = express();
(async ()=> {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error:",error);
            throw error;
        })
        app.listen(process.env.PORT ,()=>{
            console.log(` Server running on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("Error:",error);
        throw error;
    }
})();
