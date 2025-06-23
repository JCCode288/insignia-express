const userRouter = require("express").Router();
const { User } = require("./model");
const UserHandler = require("./handler");
const UserController = require("./controller");
const authMiddleware = require("../auth/middleware");
const schemaValidator = require("../utils/interceptors/schema.validator");
const { addUserSchema, updateUserSchema } = require("./schema");

const handler = new UserHandler(User);
const controller = new UserController(handler);

// using arrow function so "this" in controller doesn't lose context
userRouter.get("/", authMiddleware, (req, res, next) =>
  controller.handleAll(req, res, next)
);
userRouter.post("/", schemaValidator(addUserSchema), (req, res, next) =>
  controller.handleCreate(req, res, next)
);
userRouter.get("/:id", authMiddleware, (req, res, next) =>
  controller.handleDetail(req, res, next)
);
userRouter.put("/:id", schemaValidator(updateUserSchema), (req, res, next) =>
  controller.handleUpdate(req, res, next)
);
userRouter.delete("/:id", (req, res, next) =>
  controller.handleDelete(req, res, next)
);

module.exports = userRouter;
