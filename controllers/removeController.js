const Student = require('../models/studentModel');
const { isValidObjectId, Types } = require('mongoose');

async function removeStudentController(studentId) {
  try {

    if (!studentId || !isValidObjectId(studentId)) {
      throw new Error('Invalid student ID');
    }

    // Use the Mongoose 'findOneAndDelete' method to delete the student
    const result = await Student.findOneAndDelete({ _id: new Types.ObjectId(studentId) });

    if (!result) {
      throw new Error('Student not found');
    }

    return result;
  } catch (error) {
    console.error('Error removing student:', error.message);
    throw error;
  }
}

module.exports = removeStudentController;
