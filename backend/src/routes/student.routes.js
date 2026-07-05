import express from "express";
const router = express.Router();
import {getStudentById} from '../controllers/student.controllers.js';
import {authenticateUser, authorizeUser} from '../middlewares/auth.middleware.js';

router.get('/me/dashboard', authenticateUser, authorizeUser('student'), getStudentById);
// router.put('/me', authenticateUser, authorizeUser('student'), updateStudent);

export default router;