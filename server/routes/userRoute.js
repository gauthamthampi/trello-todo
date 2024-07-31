import express from "express"
const router = express.Router();
import { createUser, getuserDetails, postLogin,addTask, getTasks, updateTask, deleteTask, updateTaskStatus } from "../controller/userController.js"; 


router.post("/api/createUser",createUser)
router.post("/api/login",postLogin)
router.get('/api/getUserDetails',getuserDetails)
router.post('/api/addTask',addTask)
router.post("/api/getTasks",getTasks)
router.put('/api/tasks/:taskId', updateTask);
router.delete('/api/deleteTasks/:taskId',deleteTask)
router.post('/api/updateTaskStatus',updateTaskStatus)



export default router

