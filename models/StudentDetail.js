"use strict";
module.exports = (sequelize, DataTypes) => {
    const StudentDetail = sequelize.define("StudentDetail", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "id",
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'fullName'
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'dob'
        },
        rollNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'rollNumber',
            unique: true
        },
        score: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'score'
        },
        teacherId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'teacherId'
        }
    });

    StudentDetail.associate = function(models) {
        StudentDetail.belongsTo(models.User);
    };

    return StudentDetail;
};