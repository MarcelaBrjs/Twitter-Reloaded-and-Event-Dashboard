const { createTweet, getTweets, getDailyTweets, deleteTweet } = require("../services/tweetServicesDB");
const { Tweet } = require("../entities/tweet");

const createTweetController = async (req, res) => {
    const content  = req.body.content;
    const replyToTweetId  = req.body.replyToTweetId == "" ? null : req.body.replyToTweetId;

    try {
        let tweet = new Tweet.Builder()
            .setContent(content)
            .setReplyToTweetId(replyToTweetId)
            .setUserId(req.user)
            .withStatusDeleteFalse()
            .build();

        console.log("Tweet", tweet.toJSON())
        let createdTweet = await createTweet(tweet.toJSON());

        if (createdTweet.id) return res.status(200).json({msj: "Tweet has been created."});
        return res.sendStatus(400);
    } catch (error) {
        return res.status(500).send(error.message)
    };
};

const getTweetsController = async (req, res) => {
    try {
        let retrievedTweets = await getTweets();

        if (retrievedTweets) return res.status(200).send(retrievedTweets);
        return res.sendStatus(500);
    } catch (error) {
        return res.status(500).send(error.message);
    };
};

const getDailyTweetsController = async (req, res) => {
    try {
        let retrievedTweets = await getDailyTweets();

        if (retrievedTweets) return res.status(200).send(retrievedTweets);
        return res.sendStatus(500);
    } catch (error) {
        return res.status(500).send(error.message);
    };
};

const deleteTweetController = async (req, res) => {
    const tweetId = req.params.tweetId;

    try {
        let deletedTweet = await deleteTweet(tweetId);

        if (deletedTweet) return res.status(200).send(`Tweet ${tweetId} has been deleted.`);
        return res.sendStatus(400).send(`Tweet ${tweetId} not found.`);
    } catch (error) {
        return res.status(500).send(error.message);
    };
};

module.exports = { createTweetController, getTweetsController, getDailyTweetsController, deleteTweetController };
