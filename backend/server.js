import express from 'express'
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userouter from './controller/userrouter.js'
import postrouter from './controller/postrouter.js'
import messagerouter from './controller/messagerouter.js'
import {v2 as cloudinary}  from 'cloudinary'
import { app,server } from './socket/socketserver.js';


// const app=express()

dotenv.config()





mongoose.connect(process.env.MONGO_URI)
console.log(process.env.MONGO_URI)

const __dirname=path.resolve()
const port=process.env.PORT || 5000;


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APIKEYSECRET  
})



app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/api/user',userouter)
app.use('/api/posts',postrouter)
app.use('/api/message',messagerouter)


// const __dirname=path.resolve()

if(process.env.NODE_ENV === "production")
    {
        app.use(express.static(path.join(__dirname,'/frontend/dist')))
            
        app.get('*',(req,res)=>{
         res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
        })
    }


server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
