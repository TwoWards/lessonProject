require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routes = require("./src/routes.js");

const app = express();

const PORT = process.env.APP_PORT || 3000;

const DB_URI = process.env.DB_URI;

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'API Lesson', version: '1.0.0' },
    },
    apis: ['./main.swagger.yaml'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.use(express.json());

app.use('/api', routes);

async function startApp () {
    try {
        await mongoose.connect(DB_URI);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        return console.log(err);
    }
}

startApp().catch(err => {
    console.error('Ошибка при запуске приложения', err);
});