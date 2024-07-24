require('dotenv').config();
const config = require('./config');

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const routes = require("./src/routes.js");

const app = express();

const PORT = process.env.APP_PORT;

const DB_URI = process.env.DB_URI;

app.use(express.json());

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