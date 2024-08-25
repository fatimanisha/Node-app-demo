const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const courseModel = require('./models/courseModel')
const studentModel = require('./models/studentModel')
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const removeController = require('./controllers/removeController')
const modifyController = require('./controllers/modifyController');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/studentDb');

app.use(bodyParser.json());
app.use('/', courseRoutes);

app.use(cors());


// Serve static files from the 'public' and 'views' directories
app.use(express.static('public'));
app.use(express.static('views'));

// Serve the index file for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Use student and course routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// Import the addStudentController at the top of your file
const addStudentController = require('./controllers/addController');

// Define a route to handle POST requests to /addStudent
app.post('/addStudent', async (req, res) => {
  try {
    // Call your addStudentController passing the request and response objects
    const result = await addStudentController(req, res);
    // Send the result as a JSON response
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to handle GET requests for fetching all students
app.get('/students', async (req, res) => {
  try {
    const students = await studentModel.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to handle DELETE requests to /removeStudent/:id
app.delete('/removeStudent/:id', async (req, res) => {
  const studentId = req.params.id;
  const removeStudentController = require('./controllers/removeController');

  try {
    // Call removeStudentController passing the request and response objects
    const result = await removeStudentController(studentId);
    // Send the result as a JSON response
    res.json({ success: true, message: 'Student removed successfully', data: result });
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route for rendering the modify_student.html page
app.get('/modify_student', (req, res) => {
  res.sendFile(__dirname + '/views/modify_student.html');
});

// Route for rendering the modify.html page with studentId in query parameters
app.get('/modify', (req, res) => {
  const studentId = req.query.studentId;
  res.sendFile(__dirname + '/views/modify.html');
});

// Route for modifying a student based on the provided data
app.put('/modifyStudent/:id', modifyController);


// Route to fetch courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
