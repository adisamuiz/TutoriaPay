import {addStudent, listStudents} from '../models/student.models.js'

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
        
    }
    catch (error) {

    }
}
const createStudent = async (req, res) => {
    try{
        const name = req.body.name
        addStudent(name)
    }
    catch (error) {

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

export { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };