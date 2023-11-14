const {
    StudentDetail
} = require('../models');
let dataFormat = require('../services/data.service');
var config = require('../config/config');
const { Op } = require('sequelize');
const saltRounds = config.BCRYPT_SALT_ROUNDS;
let obj = {
    fetchMarks: async (req, res, next) => {
        let obj = {
            where: {
                UserId: req.body.UserId,
                dob: req.body.dob,
                rollNumber: req.body.rollNumber
            },
            attributes: ["id", "fullName", "dob", "score", "rollNumber"]
        };

        await StudentDetail.findOne(obj).then((response) => {
            return dataFormat.res_ok(res, response);
        }).catch((err) => {

            return dataFormat.res_err(res, err);
        })
    }
}
module.exports = obj;