const db = require("../database/models");
const { Op } = require("sequelize");

const createUser = async(userData) => {
    const userExists = await db.user.count({
        where: {
            email: userData.email
        }
    }) != 0;

    if (userExists)
        throw new Error(`User ${userData.email} already exists.`);

    const user = await db.user.create(userData);
    return user;
};

const getUserById = async(userId) => {
    const user = await db.user.findOne({
        where: {
            id: userId
        },
        attributes: {
            exclude: [ "createdAt", "updatedAt"]
        }
    });
    return user;
};

const getUserByEmail = async(email) => {
    const user = await db.user.findOne({
        where: {
            email: email
        },
        attributes: {
            exclude: [ "createdAt", "updatedAt"]
        }
    });
    return user;
};

const deleteUser = async(userId) => {
    const user = await db.user.destroy({
        where: {
            id: userId
        }
    });
    return user;
};

const registerLogin = async(userId) => {
    const login = await db.login.create({
        userId
    });
    return login;
};

const getUserLogins = async() => {
    let startDate = new Date().getFullYear() + '-' + parseInt(new Date().getMonth()+1) + '-' + new Date().getDate();
    let endDate = new Date().getFullYear() + '-' + parseInt(new Date().getMonth()+1) + '-' + new Date().getDate();

    const logins = await db.login.findAll({
        where: {
            createdAt: {
                [Op.lt]: new Date(new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1),
                [Op.gt]: new Date(startDate)
            }
        },
        attributes: {
            exclude: ["id", "updatedAt"]
        },
        include: [{
            model: db.user,
            attributes: {
                exclude: ["id", "email", "password", "isAdmin", "createdAt", "updatedAt"]
            },
        }],
        order: [["createdAt", "DESC"]]
    });

    return logins;
};

module.exports = { createUser, getUserById, getUserByEmail, getUserLogins, deleteUser, registerLogin }


