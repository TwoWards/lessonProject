const mongoose = require('mongoose');
const Lesson = require("../models/schema.model");

async function createLesson(name, path, numbersArray) {
    try {
        if (!name || !path || !Array.isArray(numbersArray)) return null;

        const lesson = new Lesson({name, path, numbersArray});

        await lesson.save();
        return lesson;
    } catch (e) {
        console.error(e);
        throw(e)
    }
}

async function deleteLesson(id) {
    try {
        const lesson = await Lesson.findById(id);

        if (!lesson) return null;

        await Lesson.findByIdAndDelete(id);
        return lesson;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getLessons() {
    try {
        const lessons = await Lesson.find({});
        return lessons;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {
    getLessons,
    deleteLesson,
    createLesson,
}