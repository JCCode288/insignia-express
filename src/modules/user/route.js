const userRouter = require("express").Router();
const { User } = require("./model");
const UserHandler = require("./handler");
const UserController = require("./controller");

const handler = new UserHandler(User);
const controller = new UserController(handler);

// using arrow function so "this" in controller doesn't lose context
userRouter.get("/", (req, res, next) => controller.handleAll(req, res, next));
userRouter.post("/", (req, res, next) =>
  controller.handleCreate(req, res, next)
);
userRouter.get("/:id", (req, res, next) =>
  controller.handleDetail(req, res, next)
);
userRouter.put("/:id", (req, res, next) =>
  controller.handleUpdate(req, res, next)
);
userRouter.delete("/:id", (req, res, next) =>
  controller.handleDelete(req, res, next)
);

module.exports = userRouter;
