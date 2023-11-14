var express = require('express');
var router = express.Router();
let dataFormat = require('../../services/data.service');
let controller = require('../../controllers/teacher.controller');
let authService = require('../../services/auth.service');
const {
    body    
} = require('express-validator');

router.post('/addmarks', [
    body('dob').exists(),
    body('rollNumber').exists(),
    body('score').exists(),
    body('UserId').exists(),
    body('fullName').exists(),
    body('teacherId').exists()
], (req, res, next) => {
    let chk = dataFormat.v_err(req);
    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response);
    }

    if (chk.success) {
        controller.add_result(req, res, next);
    }
});


router.post('/allmarks', [
    body('teacherId').exists(),
    body('limit').exists(),
    body('offset').exists()
], (req, res, next) =>{
    let chk = dataFormat.v_err(req);
    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response);
    }

    if (chk.success) {
        controller.fetchAllResults(req, res, next);
    }
});

router.post('/update', [
    body('marks').exists(),
    body('StudentId').exists()
], (req, res, next) => {
    console.log("Req Body:", req.body);
    let chk = dataFormat.v_err(req);
    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response);
    }

    if (chk.success) {
        controller.updateResult(req, res, next);
    }
});


router.post('/remove', [
    body('StudentId').exists()
], (req, res, next) => {
    let chk = dataFormat.v_err(req);
    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response);
    }

    if (chk.success) {
        controller.deleteStudent(req, res, next);
    }
});

router.post('/fetchdetail', [
    body('email').exists()
], (req, res, next) => {
    let chk = dataFormat.v_err(req);
    if(!chk.success) {
        dataFormat.cs_msg(res, chk.response);
    }

    if (chk.success) {
        controller.fetchStudentDetail(req, res, next);
    }
});

module.exports = router;
