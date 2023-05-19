import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Authroute from "./Routes/AuthRoute.js";
import userRoute from "./Routes/userroute.js";
import postrouter from "./Routes/postRoute.js";
dotenv.config()
const app = express();

//Middleware
app.use(bodyParser.json({limit: '30mb' , extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
mongoose.connect(process.env.DATABASEURL,
{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(process.env.PORT,()=>console.log(`listening at Port No. ${process.env.PORT}`)))
.catch((error)=>console.log(error.message))


//route to auth
app.use('/auth',Authroute);
app.use('/user',userRoute);
app.use('/post',postrouter);