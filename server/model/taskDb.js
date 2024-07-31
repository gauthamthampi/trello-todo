import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      priority: {
        type: String,
        required: true,
      },
      deadline: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
});



const taskCollection = mongoose.model('Tasks', taskSchema);
export default taskCollection;
