const { dashboardReports } = require('../helpers/reportGenerator');
const { loginDateFormatter, tweetDateFormatter, headerDateFormater } = require('../helpers/dateFormatter');

const getLogin = async (req, res) => {
    res.render('loginDashboard');
};

const getHome = async (req, res) => {
    let loginData, tweetData, reportData, headerDate;

    await fetch('http://localhost:3000/api/v1/user/dashboardLogin', {
        method: "GET",
        headers: {"content-type": "application/json", "authorization": `Bearer ${req.cookies.access_token}`}
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        loginData = data
    })
    .catch(err => res.status(500).render("error"));
    
    await fetch('http://localhost:3000/api/v1/tweet/dashboard', {
        method: "GET",
        headers: {"content-type": "application/json", "authorization": `Bearer ${req.cookies.access_token}`}
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        tweetData = data
    })
    .catch(err => res.status(500).render("error"));

    headerDate = await headerDateFormater(new Date());
    loginData = await loginDateFormatter(loginData);
    tweetData = await tweetDateFormatter(tweetData);
    reportData = await dashboardReports(tweetData, loginData);

    return res.render('eventDashboard', {loginData, tweetData, reportData, headerDate});
};

const logout = async (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect("/twitterReloadedDashboard")
};

const login = async (req, res) => {
    await fetch('http://localhost:3000/api/v1/user/dashboardLogin', {
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
        if(data.user.isAdmin == true) {
            return res
            .cookie("access_token", data.accessToken, {
              httpOnly: true,
              maxAge: 3600000
            })
            .status(200)
            .redirect("/twitterReloadedDashboard/home")
        }
        return res.status(500).render("error");
    })
    .catch(err => res.status(500).render("error"));
};

module.exports = { getLogin, getHome, login, logout }