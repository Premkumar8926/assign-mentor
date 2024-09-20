const Student = require('../models/student');
const Mentor = require('../models/mentor');

// Create Multiple Students
exports.createStudents = async (req, res) => {
    const names = req.body.names; // Expecting an array of names
    if (!Array.isArray(names)) {
        return res.status(400).json({ success: false, message: 'Names should be an array' });
    }

    // Debug log to check incoming data
    console.log(req.body);  // Log the received body

    try {
        const students = await Student.insertMany(names.map(name => ({ name })));
        res.status(201).json({ success: true, students });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ success: false, message: error.message });
    }
};

// Assign or Change Mentor for a Student
exports.assignMentorToStudent = async (req, res) => {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });

        student.mentor = mentor._id;
        student.previousMentors.push(mentor._id);
        await student.save();

        res.status(200).json({ success: true, message: 'Mentor assigned successfully', student });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get Students without a Mentor
exports.getStudentsWithoutMentor = async (req, res) => {
    try {
        const students = await Student.find({ mentor: null });
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Show Previously Assigned Mentors for a Student
exports.getPreviousMentorsForStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findById(studentId).populate('previousMentors');
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

        res.status(200).json({ success: true, previousMentors: student.previousMentors });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
