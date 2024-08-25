const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentId: Number,
  semester: String,
  courses: [String],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
