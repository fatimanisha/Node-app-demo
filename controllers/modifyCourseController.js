const Course = require('../models/courseModel');


async function modifyCourseController(req, res) {
  try {
    const course = await Course.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true });
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error modifying course' });
  }
}

module.exports = modifyCourseController;
