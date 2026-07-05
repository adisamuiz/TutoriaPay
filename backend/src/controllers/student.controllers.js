import {addStudent, listStudents, fetchStudentById} from '../models/student.model.js'

const getStudents = async (req, res) => {
    try{
        const students = await listStudents()
        res.json(students)
    }
    catch (error) {

    }
}
const getStudentById = async (req, res) => {
    try{
        const studentId = req.user.id; // Assuming the authenticated user's ID is available in req.user.id

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        const student = await fetchStudentById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        };
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching student' });
    }
}
const updateStudent = async (req, res) => {
    try{

    }
    catch (error) {

    }
}
const deleteStudent = async (req, res) => {
    try{

    }
    catch (error) {

    }
}

export { getStudents, getStudentById, updateStudent, deleteStudent };