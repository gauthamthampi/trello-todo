import userCollection from '../model/userDb.js'
import taskCollection from '../model/taskDb.js';
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export const createUser = async(req,res)=>{
        const { name, email, password } = req.body;
        try {
          const existingUser = await userCollection.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
          }
      
          const user = new userCollection({ name, email, password });
          await user.save();
          res.status(201).json(user);
        } catch (error) {
            console.log(error);
          res.status(400).json({ error: error.message });
        }
      };
 
export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export const getuserDetails = async(req,res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await userCollection.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const addTask = async(req,res) => {

  try {
    const { title, description, priority, deadline, status , userId} = req.body;
    
    const newTask = new taskCollection({
      title,
      description,
      priority,
      deadline,
      status,
      userId
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getTasks = async (req, res) => {
  const {userId} = req.body
  try {
    const tasks = await taskCollection.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, deadline, status } = req.body;

  try {
    const updatedTask = await taskCollection.findByIdAndUpdate(
      taskId,
      { title, description, priority, deadline, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params; 
  console.log(taskId);

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    const task = await taskCollection.findByIdAndDelete(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
      
export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.body;
  const { status } = req.body;

  try {
    const updatedTask = await taskCollection.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }  
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};