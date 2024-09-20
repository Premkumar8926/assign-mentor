const express = require('express');
const { createStudents, assignMentorToStudent, getStudentsWithoutMentor, getPreviousMentorsForStudent } = require('../controllers/studentController');

const router = express.Router();

// Create a new student
router.post('/create', createStudents);

// Assign or change a mentor for a student
router.post('/:studentId/assign-mentor', assignMentorToStudent);

// Get list of students without a mentor
router.get('/without-mentor', getStudentsWithoutMentor);

// Get previous mentors for a student
router.get('/:studentId/previous-mentors', getPreviousMentorsForStudent);

module.exports = router;
