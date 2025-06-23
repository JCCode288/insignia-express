const authRouter = require("express").Router();
const AuthController = require("./controller");
const AuthHandler = require("./handler");

const handler = new AuthHandler();
const controller = new AuthController(handler);

authRouter.post("/login", (req, res, next) =>
  controller.handleLogin(req, res, next)
);

module.exports = authRouter;
