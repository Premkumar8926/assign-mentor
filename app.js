const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // This is crucial for parsing JSON bodies

// Routes
app.use('/mentor', mentorRoutes);
app.use('/student', studentRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mentorshipDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection failed:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
