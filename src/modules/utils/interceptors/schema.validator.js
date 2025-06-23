const Joi = require("joi");
const { InternalServerError } = require("../exceptions/exception.impl");

/**
 *
 * @param {Joi.ObjectSchema} schema
 * @returns {import("express").RequestHandler}
 */
module.exports = function (schema) {
  if (!schema) throw new Error("Invalid schema");

  const validMethods = ["POST", "PUT"];

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  return async function (req, res, next) {
    try {
      if (!validMethods.includes(req.method))
        throw new InternalServerError("Invalid method");

      const body = req.body;
      await schema.validateAsync(body);

      next();
    } catch (err) {
      next(err);
    }
  };
};
