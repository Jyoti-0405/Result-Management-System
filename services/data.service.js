const {
    check,
    oneOf,
    body,
    validationResult,
    buildCheckFunction
} = require('express-validator');
module.exports = {
    // Res Ok
    res_ok: function(res, data) {
            return res.status(200).json({
                    success: true,
                    response: data
            });
    },
    // Custom format
    res_custom: function(res, optional, data) {
            return res.status(200).json({
                    success: true,
                    optional: optional,
                    response: data
            });
    },
    // Res Error
    res_err: function(res, data) {
            return res.status(422).json({
                    success: false,
                    response: data
            });
    },
    // Res Auth err
    res_auth_err: function(res) {
            return res.status(401).json({
                    success: false,
                    response: 'Authenticattion failed.'
            });
    },
    // CS Message
    cs_msg: function(res, msg) {
            return res.status(422).json({
                    success: false,
                    response: msg
            });
    },
    // Error
    v_err: function(req) {
            let err = validationResult(req);
            if (!err.isEmpty()) {
                    return {
                            success: false,
                            response: err.array()
                    }
            } else {
                    return {
                            success: true
                    }
            }
    },
    check_err: function(req) {
            let err = validationResult(req);
            if (!err.isEmpty()) {
                    return false;
            } else {
                    return true;
            }
    }
}