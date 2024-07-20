const express = require('express');

const {
    getLessons,
    deleteLesson,
    createLesson,
} = require("./lessons.service");

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const lessons = await getLessons({});
        res.status(200).json(lessons);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.post('/', async (req, res) => {
    const {name, path, numbersArray} = req.body;
    if (!req.body) return res.sendStatus(400);

    try {
        const addedLesson = await createLesson({name, path, numbersArray});
        if(!addedLesson) {
            return res.status(400).json({message: 'Не удалось создать урок!'})
        }

        res.status(200).json(addedLesson);
    } catch (e) {
        console.error('Ошибка при создании урока', e);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({message: 'Не указан id!'});
    }

    try {
        const deletedLesson = await deleteLesson(id);
        if(!deletedLesson) {
            return res.status(400).json({message: 'Урок с указанным id не найден!'})
        }
        return res.status(200).json('Урок успешно удален');
    } catch (e) {
        console.error('Ошибка при удалении урока:', e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;