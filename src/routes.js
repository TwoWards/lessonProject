const express = require('express');
const router = express.Router();

router.use('/lessons', require(`./lesson/lessons.controller`));

module.exports = router;