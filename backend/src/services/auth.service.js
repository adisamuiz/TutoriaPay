import { supabaseAdmin } from '../config/dbAdmin.config.js';
import { addStudent } from '../models/student.model.js'

const updateUserRole = async (userId, targetRole) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { 
        app_metadata: { role: targetRole } 
      }
    );

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Error assigning metadata role:', error.message);
    return { success: false, error: error.message };
  }
};

const createStudent = async (studentData) => {
    try{
        const studentRes = await addStudent(studentData)
        await updateUserRole(studentData.id, 'student');
        return studentRes
    }
    catch (error) {
        throw new Error('Error registering student');
    }
}

export { createStudent };