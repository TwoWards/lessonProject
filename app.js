const express = require('express');
const mongoose = require('mongoose');
const Lesson = require('./src/models/Schema.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

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

app.get('/api/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.send(lessons);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/api/lessons', async (req, res) => {
    const {name, path, numbersArray} = req.body;

    if (!req.body) return res.sendStatus(400);
    if (!name || !path || !Array.isArray(numbersArray)) return res.sendStatus(400);

    try {
        const lesson = new Lesson({name, path, numbersArray});

        await lesson.save();
        res.status(201).send(lesson);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.delete('/api/lessons/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const lesson = await Lesson.findByIdAndDelete(id);

        if (!lesson) {
            return res.sendStatus(404);
        } else {
            return res.send(lesson);
        }
    } catch (err) {
        console.log('Ошибка при удалении урока:', err);
        return res.sendStatus(500);
    }
});

startApp().catch(err => {
    console.error('Ошибка при запуске приложения', err);
});