var express = require('express');
var router = express.Router();
let dataFormat = require('../../services/data.service');
let controller = require('../../controllers/student.controller');
const {
    body
} = require('express-validator');
router.post('/fetchmarks', [
    body('dob').exists(),
    body('rollNumber').exists(),
    body('UserId').exists()
], function (req, res, next) {
    let chk = dataFormat.v_err(req);
    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response)
    }

    if (chk.success) {
        controller.fetchMarks(req, res, next);
    }
});

module.exports = router;
