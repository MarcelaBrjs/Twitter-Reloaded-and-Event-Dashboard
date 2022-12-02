const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

userRouter
    .route('/signup')
    .post(userController.createUserController);

userRouter
    .route('/twitterReloadedLogin')
    .post(userController.loginUserController);

userRouter
    .route('/dashboardLogin')
    .get(verifyToken, userController.getUserLoginsController)
    .post(userController.loginDashboardController);

userRouter
    .route('/:userId')
    .get(verifyToken, userController.getUserController)
    .delete(verifyToken, userController.deleteUserController);

module.exports = { userRouter };

