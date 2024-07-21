const mongoose = require('mongoose');

const schemaLesson = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        validate: {
           validator(value) {
               return value.length >=3 && value.length <= 20;
           },
            message: 'Название урока должно быть от 3 до 20 символов',
        }
    },
    path: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return value.length >=3 && value.length <= 20;
            },
            message: 'Путь урока должно быть от 3 до 20 символов',
        },
        match: /^[a-zA-Z]+$/
    },
    classNumber: {
        type: [Number],
        required: true,
    }
})

module.exports = mongoose.model('Lesson', schemaLesson)

