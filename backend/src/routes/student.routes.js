import express from "express";
const router = express.Router();
import {getStudents, getStudentById, createStudent, updateStudent, deleteStudent} from '../controllers/student.controllers.js';

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;