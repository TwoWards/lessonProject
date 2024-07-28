const Lesson = require("../models/schema.model");

async function createLesson(name, path, classNumber) {
    try {
        return await Lesson.create({name, path, classNumber});
    } catch (e) {
        console.error(e);
        throw(e);
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
        const newLesson = {};
        if (name) newLesson.name = name;
        if (path) newLesson.path = path;
        if (classNumber) newLesson.classNumber = classNumber;

        return Lesson.findByIdAndUpdate(id, newLesson);
    } catch (e) {
        console.error(e);
        throw(e);
    }
}

async function getLesson(id) {
    try {
        return await Lesson.findById(id);
    } catch (e) {
        console.error(e);
        throw e;
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
    getLesson,
    getLessons,
    deleteLesson,
    createLesson,
    editLesson,
}