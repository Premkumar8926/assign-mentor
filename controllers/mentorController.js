const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Create Multiple Mentors
exports.createMentor = async (req, res) => {
    const names = req.body.names; // Expecting an array of names
    if (!Array.isArray(names)) {
        return res.status(400).json({ success: false, message: 'Names should be an array' });
    }

    // Debug log to check incoming data
    console.log(req.body);

    try {
        const mentors = await Mentor.insertMany(names.map(name => ({ name })));
        res.status(201).json({ success: true, mentors });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Assign Multiple Students to a Mentor
exports.assignStudentsToMentor = async (req, res) => {
    const { mentorId } = req.params;
    const { studentIds } = req.body;

    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });

        // Iterate over student IDs and assign them to the mentor
        for (const studentId of studentIds) {
            const student = await Student.findById(studentId);
            if (student && !student.mentor) {
                student.mentor = mentor._id;
                student.previousMentors.push(mentor._id);
                await student.save();
                mentor.students.push(student._id);
            }
        }
        await mentor.save();
        res.status(200).json({ success: true, message: 'Students assigned successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get All Students for a Specific Mentor
exports.getStudentsForMentor = async (req, res) => {
    const { mentorId } = req.params;

    try {
        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });

        res.status(200).json({ success: true, students: mentor.students });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
