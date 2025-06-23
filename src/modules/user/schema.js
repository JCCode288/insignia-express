const Joi = require("joi");
const password_pattern = require("../utils/constants/password.pattern");

const addUserSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(password_pattern).min(8).required(), // naive password validation
});

const updateUserSchema = Joi.object({
  name: Joi.string().alphanum().min(1),
  email: Joi.string().min(3).email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(password_pattern).min(8),
});

module.exports = {
  addUserSchema,
  updateUserSchema,
};
