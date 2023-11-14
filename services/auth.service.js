let config = require('../config/config');
let dataFormat = require('../services/data.service');
let jwt = require('jsonwebtoken');
module.exports = {
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("Auth header:", token.trim());
        let origin = req.get('origin');
        if (token === null || token === undefined) {
            return dataFormat.res_auth_err(res);
        }

        jwt.verify(token, config.JWT_SIGNING_KEY, (err, user) => {
            if (err) {
                return dataFormat.res_auth_err(res);
            };
            req.user = user;
            next();
        });
    },

    authOrigin: function (req, res, next) {
        let origin = req.get('origin');
        if (config.NODE_ENV !== 'development') {
            console.log(config.NODE_ENV);
            console.log('//////////');
            console.log(config.SERVER_PROTOCOL + '://' + config.RESULT_CLIENT_HOST);
            if (config.NODE_ENV === 'production') {
                if (origin !== 'https://www.' + config.RESULT_CLIENT_HOST) {
                    return res.status(404).end();
                }
            } else {
                console.log(origin);
                console.log('https://' + config.RESULT_ADMIN_HOST);
                if (origin !== 'https://' + config.RESULT_CLIENT_HOST && origin !== 'https://' + config.RESULT_ADMIN_HOST) {
                    return res.status(404).end();
                }
            }
        }
        next();
    }
}