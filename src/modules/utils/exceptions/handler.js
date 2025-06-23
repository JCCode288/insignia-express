const { Error: mongooseError, MongooseError } = require("mongoose");
const ResponseBuilder = require("../response");
const BaseException = require("./base.exception");
const {
  ServiceError,
  InternalServerError,
  BadRequestError,
} = require("./exception.impl");
const { MongoServerError } = require("mongodb");

module.exports = class ExceptionHandler {
  static handle(err, req, res, next) {
    console.error(err);
    const response = new ResponseBuilder(res);

    switch (true) {
      case err instanceof BaseException:
        response.setError(err);

        return response.exec();

      case err instanceof mongooseError.ValidationError:
        response.setStatus(400);
        response.setMessage("invalid payload");

        return response.exec();

      // add other mongo case here
      case err instanceof MongooseError:
        err = new ServiceError("something wrong happened");
        response.setError(err);

        return response.exec();

      case err instanceof MongoServerError && err.message.includes("duplicate"):
        response.setPayload(err.errorResponse);

        err = new BadRequestError("duplicate error");
        response.setError(err);

        return response.exec();

      default:
        err = new InternalServerError();
        response.setError(err);

        return response.exec();
    }
  }
};
