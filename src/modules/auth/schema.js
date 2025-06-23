const Joi = require("joi");
const password_pattern = require("../utils/constants/password.pattern");

const loginSchema = Joi.object({
  email: Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(password_pattern).min(8),
});

module.exports = {
  loginSchema,
};
