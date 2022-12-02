const { Router } = require("express");
const tweetRouter = Router();
const tweetController = require("../controllers/tweetController");
const { verifyToken } = require("../middleware/auth")

tweetRouter
    .route('/')
    .get(verifyToken, tweetController.getTweetsController)
    .post(verifyToken, tweetController.createTweetController)

tweetRouter
    .route('/dashboard')
    .get(verifyToken, tweetController.getDailyTweetsController)

tweetRouter
    .route('/:tweetId')
    .delete(verifyToken, tweetController.deleteTweetController);

module.exports = { tweetRouter };
