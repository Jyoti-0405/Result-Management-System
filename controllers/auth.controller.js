const {
    User
} = require('../models');
let dataFormat = require('../services/data.service');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
const saltRounds = config.BCRYPT_SALT_ROUNDS;
let obj = {
    user_signup: function (req, res, next) {
        let obj = {
            password: bcrypt.hashSync(req.body.password, saltRounds),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            isStudent: req.body.isStudent
        }

        User.findAll({
            where: {
                email: obj.email
            }
        }).then(data => {
            if (data.length !== 0) {
                return dataFormat.cs_msg(res, 'Oops! Looks like you are already signed up with us. Signin Now!');
            }

            if (data.length === 0) {
                User.create(obj).then((result) => {
                    return dataFormat.res_ok(res, {
                        token: jwt.sign({
                            user: obj.email
                        }, config.JWT_SIGNING_KEY, {
                            expiresIn: '10h',
                            issuer: 'result.in'
                        }),
                        id: result.id,
                        fullName: obj.firstName + ' ' + obj.lastName,
                        phone: obj.phone,
                        email: obj.email,
                        isStudent: obj.isStudent
                    })
                }, err => {
                    console.log("Error: Check now: ", err);
                    return res.status(422).json({
                        success: false,
                        response: 'Failed to process your request. Please try again after sometime or contact admin'
                    });
                });
            }
        }).catch((err) => {
            console.log(err);
            dataFormat.res_err(res, 'There was some problem adding the service centre. Contact Support.')
        });
    },

    user_login: function (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({
            where: {
                email: email
            },
            attributes: ["id", "firstName", "lastName", 'email', "password", "isStudent"]
        }).then(data => {
            console.log(data);
            if (data === null) {
                return dataFormat.cs_msg(res, 'Oops! Looks like you are not signed up with us. Signup Now!');
            } else {
                if (data.length === 0) {
                    return dataFormat.cs_msg(res, 'Oops! Looks like you are not signed up with us. Signup Now!');
                }

                if (data.length !== 0) {
                    if (bcrypt.compareSync(password, data.password)) {
                        // Sign the token with phone
                        let Obj = {
                            id: data.id,
                            fullName: data.firstName + ' ' + data.lastName,
                            phone: data.phone,
                            email: data.email,
                            isStudent: data.isStudent
                        }

                        let token = jwt.sign({
                            user: Obj
                        }, config.JWT_SIGNING_KEY, {
                            expiresIn: '10h',
                            issuer: 'result.in'
                        })
                        Obj["token"] = token;
                        return dataFormat.res_ok(res, Obj);
                    } else {
                        return dataFormat.res_err(res, 'Passwords do not match');
                    }
                }
            }
        }, err => {
            return dataFormat.res_err(res, err);
        });
    },
}
module.exports = obj;