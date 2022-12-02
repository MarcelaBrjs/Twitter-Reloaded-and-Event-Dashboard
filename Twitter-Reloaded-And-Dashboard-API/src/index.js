require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express');
const app = express();
const path = require('path');

const { userRouter } = require("./routers/userRouter");
const { tweetRouter } = require("./routers/tweetRouter");
const cors = require('cors');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tweet", tweetRouter);

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});