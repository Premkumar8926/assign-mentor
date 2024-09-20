const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Mentor name is required'],
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }]
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);
