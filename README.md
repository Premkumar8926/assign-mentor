# Mentor-Student Assignment API

This project is a simple Mentor-Student Assignment API built with Node.js, Express.js, and MongoDB. It allows creating mentors and students, assigning students to mentors, and managing mentor-student relationships.

## Live Demo

You can access the live version of this API deployed on Render at the following URL:

**[Assign Mentor API - Live URL](https://assign-mentor-diln.onrender.com)**

## Features

- Create Mentor: API to create a mentor.
- Create Student: API to create one or multiple students.
- Assign Students to Mentor: Assign one or multiple students to a mentor.
- Change Mentor for a Student: Change or assign a mentor to an individual student.
- Get Students Without Mentor: List students without an assigned mentor.
- Get All Students for a Mentor: View all students under a specific mentor.
- Get Previous Mentors for a Student: View all mentors previously assigned to a student.

## Tech Stack

* Back-end: Node.js, Express.js
* Database: MongoDB
* Tools: Mongoose (MongoDB ODM)

## Prerequisites

Before you begin, ensure you have the following installed:

* Node.js (version 12.x or higher)
* MongoDB (local instance or cloud-based)
* Postman (for API testing)

# Project Setup

## Step 1: Clone the Repository

git clone https://github.com/username/assign-mentor
cd assign-mentor

## Step 2: Install Dependencies

Ensure you're in the project directory, then run the following command to install dependencies:
npm install

## Step 3: Setup MongoDB

- Make sure MongoDB is running on your machine or configure your remote MongoDB URI.
- Modify the connection string in app.js if needed:

mongoose.connect('mongodb://localhost:27017/mentorshipDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection failed:', err));


## Step 4: Start the Server

node app.js
This will start the server at http://localhost:5000.

# API Endpoints
## 1. Create Mentor

- URL: /mentor/create
- Method: POST
- Description: Creates a new mentor.

Body:
    {
    "name": "John Doe"
    }

Response:
    {
    "success": true,
    "mentor": {
        "_id": "mentorId1",
        "name": "John Doe"
            }
    }

## 2. Create Multiple Students

- URL: /student/create
- Method: POST
- Description: Creates one or multiple students.

Body:
    {
    "names": ["Alice Smith", "Bob Johnson", "Charlie Brown"]
    }

Response:
    {
    "success": true,
    "students": [
        { "_id": "studentId1", "name": "Alice Smith" },
        { "_id": "studentId2", "name": "Bob Johnson" },
        { "_id": "studentId3", "name": "Charlie Brown" }
    ]
    }

## 3. Assign Multiple Students to a Mentor

- URL: /mentor/:mentorId/assign-students
- Method: POST
- Description: Assigns multiple students to a mentor.

Body:
    {
    "studentIds": ["studentId1", "studentId2", "studentId3"]
    }

Response:
    {
    "success": true,
    "message": "Students assigned to mentor successfully",
    "students": [
        { "_id": "studentId1", "name": "Alice Smith", "mentor": "mentorId1" },
        { "_id": "studentId2", "name": "Bob Johnson", "mentor": "mentorId1" }
    ]
    }


## 4. Change Mentor for a Student

- URL: /student/:studentId/assign-mentor
- Method: POST
- Description: Assigns or changes the mentor for a student.

Body:
    {
    "mentorId": "mentorId2"
    }

Response:
    {
    "success": true,
    "message": "Mentor assigned successfully",
    "student": {
        "_id": "studentId1",
        "name": "Alice Smith",
        "mentor": "mentorId2"
            }   
    }

## 5. Get Students Without a Mentor

- URL: /students/without-mentor
- Method: GET
- Description: Fetches the list of students without a mentor.

Response:
    {
    "success": true,
    "students": [
        { "_id": "studentId3", "name": "Charlie Brown" },
        { "_id": "studentId4", "name": "Eve Adams" }
    ]
    }

## 6. Get All Students for a Particular Mentor

- URL: /mentor/:mentorId/students
- Method: GET
- Description: Fetches the list of students assigned to a specific mentor.

Response:
    {
    "success": true,
    "students": [
        { "_id": "studentId1", "name": "Alice Smith" },
        { "_id": "studentId2", "name": "Bob Johnson" }
    ]
    }

## 7. Get Previous Mentors for a Student

- URL: /student/:studentId/previous-mentors
- Method: GET
- Description: Fetches the previous mentors for a particular student.

Response:
    {
    "success": true,
    "previousMentors": [
        { "_id": "mentorId1", "name": "John Doe" },
        { "_id": "mentorId2", "name": "Jane Smith" }
    ]
    }

# Postman API Documentation

You can find the complete Postman documentation for testing the API here. https://documenter.getpostman.com/view/16859357/2sAXqs83We

# Testing the API

You can test the API using Postman, Insomnia, or any other API testing tool. Follow these steps:

- 1. Set the request method (GET, POST, etc.).
- 2. Set the URL to your local server (http://localhost:5000).
- 3. For POST requests, include a JSON body with the relevant data.
- 4. Check responses in the tool and verify the server is running.

# Error Handling

- 404 Error: Returned if the requested ID (mentor/student) does not exist.
- 400 Error: Returned if required fields are missing or malformed.
    
Example Error Response:
    {
    "success": false,
    "message": "Mentor not found"
    }

# Deployment

To deploy this application on Render, follow these steps:

- 1. Create a new service on Render.
- 2. Connect your GitHub repository.
- 3. Set up environment variables for MongoDB connection.
- 4. Render will handle the deployment process.

# License

This project is open-source and free to use.
