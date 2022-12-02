require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const path = require('path');
const cookieParser = require("cookie-parser");
const { twitterReloadedRouter } = require("./routes/twitterReloadedRouter");
const { dashboardRouter } = require("./routes/dashboardRouter");
const public = path.join(__dirname, '../public');
const views = path.join(__dirname, './views');
const cors = require('cors');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/twitterReloaded", twitterReloadedRouter);
app.use("/twitterReloadedDashboard", dashboardRouter);

app.set("view engine", "ejs");
app.set("views", views);
app.use(express.static(public));

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});