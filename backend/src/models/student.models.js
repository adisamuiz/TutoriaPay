import pool from '../config/db.config.js'

const addStudent = async (name) => {
    const queryText = `INSERT INTO students (uid, first_name) VALUES (gen_random_uuid(), $1)`
    await pool.query(queryText, [name])
    console.log(name)
}
const getStudent = async () => {
    const queryText = `SELECT * FROM students`
    await pool.query(queryText, [])
}
export {addStudent};