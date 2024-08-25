// addstudent function
function addStudent() {
  const addStudentForm = document.getElementById('addStudentForm');
  const formData = new FormData(addStudentForm);

  const selectedCourses = Array.from(formData.getAll('courses'));

  formData.set('courses', JSON.stringify(selectedCourses));

  fetch('http://localhost:3000/addStudent', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
  })
      .then(response => response.json())
      .then(data => {
          console.log('Student added:', data);
          // Handle success, update UI, etc.
          alert('Student added successfully!'); // Display window alert
      })
      .catch(error => {
          console.error('Error adding student:', error);
          // Handle error, show error message, etc.
      });
}

  
// Function to fetch and display students in the table
function fetchAndDisplayStudents() {
  fetch('http://localhost:3000/students')
    .then(response => response.json())
    .then(students => {
      const studentsTableBody = document.querySelector('#studentsTable tbody');

      // Clear existing table rows
      studentsTableBody.innerHTML = '';

      // Append each student to the table
      if (students.length > 0) {
        students.forEach(student => {
          const row = studentsTableBody.insertRow();
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => removeStudent(student._id));
          row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.studentId}</td>

          `;
          row.appendChild(document.createElement('td')).appendChild(removeButton);
        });
      } else {
        // Display a message or handle the case where there are no students
        console.log('No students found.');
      }
    })
    .catch(error => {
      console.error('Error fetching students:', error);
    });
}

// remove student code
function removeStudent(studentId) {

  fetch(`http://localhost:3000/removeStudent/${studentId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error removing student');
      }
      return response.json();
    })
    .then(data => {
      console.log('Student removed:', data);
      fetchAndDisplayStudents();
      alert('Student removed successfully!');
    })
    .catch(error => {
      console.error('Error removing student:', error);
    });
}


// Call the function to fetch and display students when the page loads
// document.addEventListener('DOMContentLoaded', fetchAndDisplayStudents);

//modify student function
async function modifyStudent() {
  // Get values from the form
  const studentId = document.getElementById('studentId').value;
  const newFirstName = document.getElementById('newFirstName').value;
  const newLastName = document.getElementById('newLastName').value;
  const newSemester = document.getElementById('newSemester').value;
  const newCourses = Array.from(document.getElementById('newCourses').selectedOptions).map(option => option.value);

  const requestBody = {
    firstName: newFirstName,
    lastName: newLastName,
    semester: newSemester,
    courses: newCourses,
  };

  try {
    const response = await fetch(`/modifyStudent/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error modifying student: ${errorData.error}`);
    } else {
      const modifiedStudent = await response.json();
      console.log('Modified Student:', modifiedStudent);
      alert('Student modified successfully!'); // Display window alert
    }
  } catch (error) {
    console.error('Error modifying student:', error);
    alert('Error modifying student. Please try again.');
  }
}

// course update function

function performUpdate() {
  // Get form elements
  var oldCourseNameInput = document.getElementById("oldCourseName");
  var newCourseNameInput = document.getElementById("newCourseName");

  // Get input values
  var oldCourseName = oldCourseNameInput.value;
  var newCourseName = newCourseNameInput.value;

  // Validate form data (add your own validation logic)
  if (!oldCourseName || !newCourseName) {
    alert("Please fill in all fields.");
    return;
  }

  // Send a POST request to the server to perform the update operation
  fetch('/performUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ oldCourseName, newCourseName }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Update performed successfully:', data.result);
        alert('Course Modified successfully!');

        // Fetch and display the updated course list after the update
        fetchAndDisplayCourses();
      } else {
        console.error('Error performing update:', data.error);
      }
    })
    .catch(error => {
      console.error('Error performing update:', error);
    });
}

 // Function to fetch and display courses in the table
 function fetchAndDisplayCourses() {
  fetch('http://localhost:3000/courses')
    .then(response => {
      console.log('Courses response:', response);
      return response.json();
    })
    .then(courses => {
      const coursesTableBody = document.querySelector('#coursesTable tbody');

      // Clear existing table rows
      coursesTableBody.innerHTML = '';

      // Append each course to the table
      if (courses.length > 0) {
        courses.forEach(course => {
          const row = coursesTableBody.insertRow();
          row.innerHTML = `
            <td>${course.name}</td>
          `;
        });
      } else {
        // Display a message or handle the case where there are no courses
        console.log('No courses found.');
      }
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
    });
}
fetchAndDisplayCourses();


// Call the function to fetch and populate courses on page load
// document.addEventListener('DOMContentLoaded', fetchAndPopulateCourses);





