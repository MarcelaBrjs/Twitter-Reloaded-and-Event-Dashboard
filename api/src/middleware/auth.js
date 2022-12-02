require('dotenv').config({path: __dirname + '/../../.env'})
const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRATION_TIME } = process.env;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ");
        const decoded = jwt.verify(token[1],JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(400).send("Invalid access token.");
    }
};

const generateAccessToken = async (userId) => {
    const accessToken = jwt.sign({userId: userId}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME});

    return accessToken
};

module.exports = { verifyToken, generateAccessToken };