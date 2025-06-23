const express = require("express");
const cors = require("cors");
const userRouter = require("./modules/user/route");
const ExceptionHandler = require("./modules/utils/exceptions/handler");

const app = express();
let originWhitelist = [];

if (process.env.ORIGIN_WHITELIST) {
  originWhitelist = process.env.ORIGIN_WHITELIST.split(",");
}

app.use(
  cors({
    origin: originWhitelist,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(ExceptionHandler.handle);

module.exports = app;
