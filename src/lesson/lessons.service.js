const mongoose = require('mongoose');
const Lesson = require("../models/schema.model");

async function createLesson(name, path, classNumber) {
    try {
        if (!name || !path || !Array.isArray(classNumber)) return null;

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

async function editLesson(id, name, path, classNumber) {
    try {
        const lesson = await Lesson.findById(id);

        if (!lesson) return null;

        if (name) lesson.name = name;
        if (path) lesson.path = path;
        if (Array.isArray(classNumber)) lesson.classNumber = classNumber;

        await lesson.save();
        return lesson;
    } catch (e) {
        console.error(e);
        throw(e);
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
    editLesson,
}