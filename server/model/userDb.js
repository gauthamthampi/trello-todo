import mongoose from "mongoose"
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
dotenv.config();


const userschema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    }
});

userschema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  });


const userCollection = new mongoose.model("Users",userschema);
export default userCollection;