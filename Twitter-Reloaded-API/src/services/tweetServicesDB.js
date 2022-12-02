const db = require("../database/models");
const { Op } = require("sequelize");

const createTweet = async(tweetData) => {
    const tweet = await db.tweet.create(tweetData);
    return tweet;
};

const getTweets = async() => {
    const tweets = await db.tweet.findAll({
        where: {
            replyToTweetId: {
                [Op.is]: null
            },
        },
        include: [{
            model: db.tweet,
            required: false,
            as: "replies",
            where: {
                statusDelete: false
            },
            include: [{
                model: db.user,
                attributes: {
                    exclude: ["id", "email", "password", "isAdmin", "createdAt", "updatedAt"]
                },
            }]
        },
        {
            model: db.user,
            attributes: {
                exclude: ["id", "email", "password", "isAdmin", "createdAt", "updatedAt"]
            },
        }],
        limit: 10,
        order: [["createdAt", "DESC"]]
    });

    return tweets;
};

const getDailyTweets = async() => {
    let startDate = new Date().getFullYear() + '-' + parseInt(new Date().getMonth()+1) + '-' + new Date().getDate();
    let endDate = new Date().getFullYear() + '-' + parseInt(new Date().getMonth()+1) + '-' + new Date().getDate();

    const tweets = await db.tweet.findAll({
        where: {
            createdAt: {
                [Op.lt]: new Date(new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1),
                [Op.gt]: new Date(startDate)
            }
        },
        attributes: {
            exclude: ["updatedAt"]
        },
        include: [{
            model: db.user,
            attributes: {
                exclude: ["id", "email", "password", "isAdmin", "createdAt", "updatedAt"]
            },
        }],
        order: [["createdAt", "DESC"]]
    });

    return tweets;
};

const deleteTweet = async(tweetId) => {
    const tweet = await db.tweet.update({
        statusDelete: true
    }, { 
        where: { 
            id: tweetId 
        } 
    });

    return tweet;
};

module.exports = { createTweet, getTweets, getDailyTweets, deleteTweet }