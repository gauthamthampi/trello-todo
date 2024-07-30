import express from "express"
const router = express.Router();
import { createUser } from "../controller/userController.js"; 


router.post("/api/createUser",createUser)

export default router

