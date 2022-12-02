const { Router } = require("express");
const dashboardRouter = Router();
const dashboardAPI = require("../api/dashboardAPI");

dashboardRouter
    .route('/')
    .get(dashboardAPI.getLogin);

dashboardRouter
    .route('/home')
    .get(dashboardAPI.getHome);

dashboardRouter
    .route('/login')
    .post(dashboardAPI.login);

dashboardRouter
    .route('/logout')
    .get(dashboardAPI.logout);

module.exports = { dashboardRouter };