import express, { Router } from "express";
const app = express()
import cors from "cors"
import { fileURLToPath } from 'url';
import path from "path"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import router from "./routes/userRoute.js";
import userCollection from "./model/userDb.js";

app.use(express.json())
dotenv.config()

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

const username = process.env.mongoatlas_user
const password = process.env.mongoatlas_pass
const connect = mongoose.connect(`mongodb+srv://${username}:${password}@trello-db.xln2i3k.mongodb.net/?retryWrites=true&w=majority&appName=trello-db`)
 
connect.then(()=>{
    console.log("Cloud Database connected successfully");
}).catch((err)=>{
    console.log("Error connectiong with db"+err);
})
 
app.use(cors());
app.use(router)

app.listen(3009)
console.log("Server started on http://localhost:3009");