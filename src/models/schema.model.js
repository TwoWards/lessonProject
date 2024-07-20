const mongoose = require('mongoose');

const schemaLesson = new mongoose.Schema ({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    path: {
        type: String,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z]+$/
    },
    numbersArray: {
        type: [Number]
    }
})

module.exports = mongoose.model('Lesson', schemaLesson)

