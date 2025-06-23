const authRouter = require("express").Router();
const schemaValidator = require("../utils/interceptors/schema.validator");
const AuthController = require("./controller");
const AuthHandler = require("./handler");
const { loginSchema } = require("./schema");

const handler = new AuthHandler();
const controller = new AuthController(handler);

authRouter.post("/login", schemaValidator(loginSchema), (req, res, next) =>
  controller.handleLogin(req, res, next)
);

module.exports = authRouter;
