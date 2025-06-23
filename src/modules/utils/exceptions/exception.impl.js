const BaseException = require("./base.exception");

class BadRequestError extends BaseException {
  constructor(message, opts) {
    super(message, 400, opts);
  }
}

class InternalServerError extends BaseException {
  constructor(message, opts) {
    if (!message) message = "Internal Server Error";
    super(message, 500, opts);
  }
}

class UnauthenticatedError extends BaseException {
  constructor(message, opts) {
    super(message, 401, opts);
  }
}

class UnauthorizedError extends BaseException {
  constructor(message, opts) {
    super(message, 403, opts);
  }
}

class ServiceError extends BaseException {
  constructor(message, opts) {
    super(message, 503, opts);
  }
}

module.exports = {
  BadRequestError,
  InternalServerError,
  UnauthenticatedError,
  UnauthorizedError,
  ServiceError,
};
