const Student = require('../models/studentModel');

async function modifyStudentController(req, res) {
  try {
    const student = await Student.findOneAndUpdate({ studentId: req.params.id }, req.body, { new: true });
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error modifying student' });
  }
}

module.exports = modifyStudentController;
