const express = require('express');

const router = express.Router();

router.get('/view', (req, res, next) => {
    res.render('students');
})

router.get('/addrecord', (req, res, next) => {
    res.render('addRecord')
})

module.exports = router;