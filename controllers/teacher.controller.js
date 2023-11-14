const {
    User,
    StudentDetail
} = require('../models');
let dataFormat = require('../services/data.service');
var config = require('../config/config');
const { Op } = require('sequelize');
const saltRounds = config.BCRYPT_SALT_ROUNDS;
let obj = {
    add_result: (req, res, next) => {
        let obj = {
            rollNumber: req.body.rollNumber,
            dob: req.body.dob,
            score: req.body.score,
            UserId: req.body.UserId,
            fullName: req.body.fullName,
            teacherId: req.body.teacherId
        };

        StudentDetail.create(obj).then((response) => {
            return dataFormat.res_ok(res, "Successfully added student result");
        }).catch((err) => {
            return dataFormat.res_err(res, 'Failed to process your request. Please try again after sometime or contact admin');
        });
    },

    fetchAllResults: (req, res, next) => {
        let obj = {
            where: {
                teacherId: req.body.teacherId
            },
            limit: req.body.limit,
            offset: req.body.offset
        };

        StudentDetail.findAndCountAll(obj).then((response) => {
            return dataFormat.res_ok(res, response);
        }).catch((err) => {
            return dataFormat.res_err(res, err);
        })
    },

    updateResult: (req, res, next) => {
        let obj = {
            score: req.body.marks
        };

        StudentDetail.update(obj, {
            where: {
                id: {
                    [Op.eq]: req.body.StudentId
                }
            }
        }).then((response) => {
            return dataFormat.res_ok(res, "Updated score for student");
        }).catch((err) => {
            return dataFormat.res_err(res, err);
        });
    },

    deleteStudent: (req, res, next) => {
        StudentDetail.destroy({
            where: {
                id: req.body.StudentId
            }
        }).then((response) => {
            return dataFormat.res_ok(res, "Deleted student detail");
        }).catch((err) => {
            return dataFormat.res_err(res, err);
        });
    },

    fetchStudentDetail: (req, res, next) => {
        console.log("I am in: ", req.body.email);
        User.findOne({
            where: {
                email: req.body.email
            },
            attributes: ["id", "firstName", "lastName", "email", "password", "isStudent"]
        }).then((response) => {
            return dataFormat.res_ok(res, response);
        }).catch((err) => {
            return dataFormat.res_err(res, err);
        });
    }
}
module.exports = obj;