const express = require('express');
const { createMentor, assignStudentsToMentor, getStudentsForMentor } = require('../controllers/mentorController');

const router = express.Router();

// Create multiple mentors
router.post('/create', createMentor);

// Assign multiple students to a mentor
router.post('/:mentorId/assign-students', assignStudentsToMentor);

// Get all students assigned to a specific mentor
router.get('/:mentorId/students', getStudentsForMentor);

module.exports = router;
