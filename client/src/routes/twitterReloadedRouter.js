const { Router } = require("express");
const twitterReloadedRouter = Router();
const twitterReloadedAPI = require("../api/twitterReloadedAPI");

twitterReloadedRouter
    .route('/')
    .get(twitterReloadedAPI.getMain);

twitterReloadedRouter
    .route('/home')
    .get(twitterReloadedAPI.getHome);

twitterReloadedRouter
    .route('/signup')
    .post(twitterReloadedAPI.signup);

twitterReloadedRouter
    .route('/login')
    .post(twitterReloadedAPI.login);

twitterReloadedRouter
    .route('/logout')
    .get(twitterReloadedAPI.logout);

twitterReloadedRouter
    .route('/tweet')
    .post(twitterReloadedAPI.tweet);

module.exports = { twitterReloadedRouter };