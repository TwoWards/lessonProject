const express = require('express');

const {
    getLessons,
    deleteLesson,
    createLesson,
    editLesson,
} = require("./lessons.service");

const router = require('express').Router();

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

router.get('/', async (req, res) => {
    try {
        const lessons = await getLessons({});
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, path, classNumber } = req.body;

    if (!id) {
        return res.status(400).json({message: 'Не указан id!'});
    }

    try {
        const editedLesson = await editLesson(id, name, path, classNumber);
        if(!editedLesson) {
            return res.status(400).json({message: 'Урок с указанным id не найден!'})
        }
        return res.status(200).json(editedLesson);
    } catch (e) {
        console.error('Ошибка при редактировании урока:', e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
})

router.post('/', async (req, res) => {
    if (!req.body) return res.status(400).json({message: 'Тело запроса не может быть пустым'});
    const {name, path, classNumber} = req.body;

    if (!name || !path || !Array.isArray(classNumber)) {
        return res.status(400).json({ message: 'Некоторые поля не заполнены или не корректные.' });
    }

    try {
        const addedLesson = await createLesson(name, path, classNumber);
        if(!addedLesson) {
            return res.status(400).json({message: 'Не удалось создать урок!'})
        }

        return res.status(200).json(addedLesson);
    } catch (e) {
        console.error('Ошибка при создании урока', e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;