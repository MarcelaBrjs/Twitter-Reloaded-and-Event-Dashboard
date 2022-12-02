const userServices = require("../services/userServicesDB");
const { User } = require("../entities/user");
const { generateAccessToken } = require("../middleware/auth");

const createUserController = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = new User.Builder()
            .setFirstName(firstName)
            .setLastName(lastName)
            .setEmail(email)
            .setPassword(password)
            .withAverageUser()
            .build();

        let createdUser = await userServices.createUser(user.toJSON());

        if (createdUser.id) return res.status(200).json({msj: "User has been created."});
        return res.sendStatus(400);
    } catch (error) {
        return res.status(500).json({msj: error.message})
    };
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userServices.getUserByEmail(email);

        if(!user)
            return res.status(400).send(`User ${email} not found.`);

        if(!(user.password == password))
            return res.status(400).send(`Incorrect data for user ${email}.`);

        const login = await userServices.registerLogin(user.id);
        const accessToken = await generateAccessToken(user.id);
        
        return res.status(200).json({accessToken: accessToken, user: {isAdmin: user.isAdmin}});
    } catch (error) {
        return res.status(500).json({msj: error.message});
    }
};

const loginDashboardController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userServices.getUserByEmail(email);

        if(!user)
            return res.status(400).send(`User ${email} not found.`);

        if(!(user.password == password))
            return res.status(400).send(`Incorrect data for user ${email}.`);

        const accessToken = await generateAccessToken(user.id);
        
        return res.status(200).json({accessToken: accessToken, user: {isAdmin: user.isAdmin}});
    } catch (error) {
        return res.status(500).json({msj: error.message});
    }
};

const getUserController = async (req, res) => {
    const userId = req.params.userId;

    try {
        let retrievedUser = await userServices.getUserById(userId);

        if (retrievedUser) return res.status(200).send(retrievedUser);
        return res.sendStatus(400).json({msj: `User ${userId} not found.`})
    } catch (error) {
        return res.status(500).json({msj: error.message});
    };
};

const getUserLoginsController = async (req, res) => {
    try {
        let retrievedLogins = await userServices.getUserLogins();

        if (retrievedLogins) return res.status(200).send(retrievedLogins);
        return res.sendStatus(500);
    } catch (error) {
        return res.status(500).json({msj: error.message});
    };
};

const deleteUserController = async (req, res) => {
    const userId = req.params.userId;

    try {
        let deletedUser = await userServices.deleteUser(userId);

        if (deletedUser) return res.status(200).send(`User ${userId} has been deleted.`);
        return res.sendStatus(400).json({msj: `User ${userId} not found.`})
    } catch (error) {
        return res.status(500).json({msj: error.message});
    };
};

module.exports = { createUserController, loginUserController, loginDashboardController, getUserController, deleteUserController, getUserLoginsController };
