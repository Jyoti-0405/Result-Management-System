var express = require('express');
var router = express.Router();
let dataFormat = require('../../services/data.service');
let auth = require('../../controllers/auth.controller');
const {
    body    
} = require('express-validator');
router.post('/login', [
    body('email').exists(),
    body('password').exists()
], function (req, res, next) {
    let chk = dataFormat.v_err(req);
    

    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response)
    }

    if (chk.success) {
        auth.user_login(req, res, next);
    }
});

router.post('/registration', [
    body('email').exists(),
    body('password').exists(),
    body('firstName').exists(),
    body('lastName').exists(),
    body('isStudent').exists()
], function (req, res, next) {
    let chk = dataFormat.v_err(req);
    if (!chk.success) {
        dataFormat.cs_msg(res, chk.response)
    }

    if (chk.success) {
        auth.user_signup(req, res, next);
    }
});

module.exports = router;
