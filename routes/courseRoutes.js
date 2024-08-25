const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');

// Perform update operation
router.post('/performUpdate', async (req, res) => {
  const { oldCourseName, newCourseName } = req.body;

  try {
    const existingCourse = await Course.findOne({ name: oldCourseName });

    if (existingCourse) {
      // If the course exists, update its name
      existingCourse.name = newCourseName;
      const updatedCourse = await existingCourse.save();
      res.json({ success: true, result: updatedCourse });
    } else {
      // If the course doesn't exist, return an error
      res.status(404).json({ success: false, error: 'Course not found' });
    }
  } catch (error) {
    console.error('Error performing update:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
