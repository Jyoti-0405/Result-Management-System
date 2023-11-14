const express = require('express');

const router = express.Router();

router.get('/view', (req, res, next) => {
    res.render('mark');
})

module.exports = router;