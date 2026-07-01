import query from '../config/db.config.js'

const addStudent = async (name) => {
    const queryText = `INSERT INTO students (uid, first_name) VALUES (gen_random_uuid(), $1)`
    await query(queryText, [name])
}
const listStudents = async () => {
    const queryText = `SELECT * FROM students`
    const res = await query(queryText, [])
    return res.rows
}
export {addStudent, listStudents};