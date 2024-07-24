const { body, param } = require("express-validator");

const validateLessonId = [
    param("id")
        .notEmpty().withMessage("Id не может быть пустым")
];

const validateLessonBody = [
    body('name')
        .notEmpty().withMessage('Имя не может быть пустым')
        .isString().withMessage('Имя должно быть строкой')
        .isLength({ min: 3, max: 20 }).withMessage('Название урока должно быть от 3 до 20 символов'),
    body('path')
        .notEmpty().withMessage('Путь не может быть пустым')
        .isString().withMessage('Путь должен быть строкой')
        .isLength({ min: 3, max: 20 }).withMessage('Путь урока должно быть от 3 до 20 символов')
        .matches(/^[a-zA-Z]+$/).withMessage('Путь должен содержать только латинские буквы'),
    body('classNumber')
        .isArray({ min: 1 }).withMessage('classNumber должен быть массивом из одного или более элементов')
        .custom((value) => value.every(Number.isInteger)).withMessage('Все элементы classNumber должны быть числами')
];

const validateOptionalLessonBody = [
    body('name')
        .optional()
        .isString().withMessage('Имя должно быть строкой')
        .isLength({ min: 3, max: 20 }).withMessage('Название урока должно быть от 3 до 20 символов'),
    body('path')
        .optional()
        .isString().withMessage('Путь должен быть строкой')
        .isLength({ min: 3, max: 20 }).withMessage('Путь урока должно быть от 3 до 20 символов')
        .matches(/^[a-zA-Z]+$/).withMessage('Путь должен содержать только буквы'),
    body('classNumber')
        .optional()
        .isArray({ min: 1 }).withMessage('classNumber должен быть массивом из одного или более элементов')
        .custom((value) => value.every(Number.isInteger)).withMessage('Все элементы classNumber должны быть числами')
];

module.exports = {
    validateLessonId,
    validateLessonBody,
    validateOptionalLessonBody
};