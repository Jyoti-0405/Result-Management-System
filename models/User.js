"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "id",
        },
        firstName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'firstName'
        },
        lastName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'lastName'
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: 'email',
            unique: true
        },
        password: {
            type: DataTypes.STRING(400),
            allowNull: false,
            field: 'password'
        },
        isStudent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'isStudent'
        }
    });

    User.associate = function(models) {
        User.hasMany(models.StudentDetail);
    };

    return User;
};