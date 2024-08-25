const Student = require('../models/studentModel');

async function addStudentController(req, res) {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = addStudentController;
