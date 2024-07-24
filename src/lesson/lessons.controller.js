const express = require('express');

const {
    getLessons,
    deleteLesson,
    createLesson,
    editLesson,
} = require("./lessons.service");

const {validationResult} = require("express-validator");
const {
    validateLessonId,
    validateLessonBody,
    validateOptionalLessonBody,
} = require("../validators/lessons.validator");

const validateRequest = require("../validators/validateRequest");

const router = require('express').Router();

router.delete(
    '/:id',
    ...validateLessonId,
    validateRequest,
    async (req, res) => {
        const id = req.params.id;

        try {
            const deletedLesson = await deleteLesson(id);
            if(!deletedLesson) {
                return res.status(400).json({message: 'Урок с указанным id не найден!'})
            }
            return res.json('Урок успешно удален');
        } catch (e) {
            console.error('Ошибка при удалении урока:', e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
});

router.get('/', async (req, res) => {
        try {
            const lessons = await getLessons({});
            return res.json(lessons);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
});

router.patch(
    '/:id',
    ...validateLessonId,
    ...validateOptionalLessonBody,
    validateRequest,
    async (req, res) => {
        const id = req.params.id;
        const { name, path, classNumber } = req.body;

        try {
            const editedLesson = await editLesson(id, name, path, classNumber);
            if(!editedLesson) {
                return res.status(400).json({message: 'Урок с указанным id не найден!'})
            }
            return res.json(editedLesson);
        } catch (e) {
            console.error('Ошибка при редактировании урока:', e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
});

router.post(
    '/',
    ...validateLessonBody,
    validateRequest,
    async (req, res) => {
        const {name, path, classNumber} = req.body;

        try {
            const addedLesson = await createLesson(name, path, classNumber);
            if(!addedLesson) {
                return res.status(400).json({message: 'Не удалось создать урок!'})
            }

            return res.json(addedLesson);
        } catch (e) {
            console.error('Ошибка при создании урока', e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
});

module.exports = router;