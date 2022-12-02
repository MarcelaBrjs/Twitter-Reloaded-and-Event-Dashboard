const { tweetDateFormatter } = require('../helpers/dateFormatter');

const getMain = async (req, res) => {
    res.render('mainTwitterReloaded');
};

const getHome = async (req, res) => {
    let tweetsData;

    await fetch('http://localhost:3000/api/v1/tweet', {
        method: "GET",
        headers: {"content-type": "application/json", "authorization": `Bearer ${req.cookies.access_token}`}
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        tweetsData = data
    })
    .catch(err => res.status(500).send(err));  

    tweetsData = await tweetDateFormatter(tweetsData);

    return res.render('userHomeTwitterReloaded', {tweetsData});
};

const signup = async (req, res) => {
    await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": req.body.password
        }),
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        return res
            .status(200)
            .redirect("/twitterReloaded")
    })
    .catch(err => res.status(500).render("error"));
};

const logout = async (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect("/twitterReloaded")
};

const login = async (req, res) => {
    await fetch('http://localhost:3000/api/v1/user/twitterReloadedLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": req.body.email,
            "password": req.body.password
        }),
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        return res
            .cookie("access_token", data.accessToken, {
              httpOnly: true,
              maxAge: 3600000
            })
            .status(200)
            .redirect("/twitterReloaded/home")
    })
    .catch(err => res.status(500).render("error"));
};

const tweet = async (req, res) => {
    if (req.body.content.length > 300) {
        res.status(500).render("error");
    }

    await fetch('http://localhost:3000/api/v1/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${req.cookies.access_token}`
        },
        body: JSON.stringify({
            "content": req.body.content,
            "replyToTweetId": req.body.replyToTweetId
        }),
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        return res
            .status(200)
            .redirect("/twitterReloaded/home")
    })
    .catch(err => res.status(500).render("error"));
};

module.exports = { getMain, getHome, signup, login, logout, tweet }