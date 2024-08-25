const express = require('express');
const router = express.Router();


const addStudentController = require('../controllers/addController');
const removeStudentController = require('../controllers/removeController');
const modifyStudentController = require('../controllers/modifyController');

// Define student routes
router.post('/addStudent', addStudentController);
router.delete('/removeStudent/:id', removeStudentController);
router.put('/modifyStudent/:id', modifyStudentController);

module.exports = router;
