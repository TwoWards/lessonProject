const express = require('express');
const mongoose = require('mongoose');
const Lesson = require('./Schema.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

const DB_URI = 'mongodb://localhost:27017/Lessons_DB';

async function startApp () {
    try {
        await mongoose.connect(DB_URI);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        return console.log(err);
    }
}

startApp();