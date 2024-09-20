const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required'],
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        default: null
    },
    previousMentors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
