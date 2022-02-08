const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors= require('cors');
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const transectionRoute = require('./api/routes/transection');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
/**
 * define the routes
 */
app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/transection', transectionRoute);

// handel route url//
app.use((req, res, next) => {
    res.status(404).json({
        message: "Bad Resuest"
    });
});
/**
 * connection created with mongo DB
 */
mongoose.connect('mongodb+srv://transection-root:Ankit1163@transection-app.shvkj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
/**
 * handel the database connection error 
 */
mongoose.connection.on('error', err => {
    console.log("connection is failed");
});

mongoose.connection.on('connected', connected => {
    console.log('connected with database');
});

module.exports = app;