const mongoose = require('mongoose');
const Lesson = require("../models/schema.model");

async function createLesson(name, path, classNumber) {
    try {
        return await Lesson.create({name, path, classNumber})
    } catch (e) {
        console.error(e);
        throw(e)
    }
}

async function deleteLesson(id) {
    try {
        return await Lesson.findByIdAndDelete(id);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function editLesson(id, name, path, classNumber) {
    try {
        const lesson = await Lesson.findById(id);

        if (!lesson) throw new Error('Урок не существует');

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
        return await Lesson.find({})
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