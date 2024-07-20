const express = require('express');
const mongoose = require('mongoose');
const Lesson = require('./src/models/schema.model.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const routes = require("./src/routes.js");

const app = express();

const PORT = 5000;

const DB_URI = 'mongodb://localhost:27017/Lessons_DB';

async function startApp () {
    try {
        await mongoose.connect(DB_URI);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        return console.log(err);
    }
}

app.use('/api', routes);

startApp().catch(err => {
    console.error('Ошибка при запуске приложения', err);
});