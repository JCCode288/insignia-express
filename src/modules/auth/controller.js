const { BadRequestError } = require("../utils/exceptions/exception.impl");
const ResponseBuilder = require("../utils/response");

module.exports = class AuthController {
  constructor(service) {
    this.service = service;
  }

  async handleLogin(req, res, next) {
    const response = new ResponseBuilder(res);
    try {
      const body = req.body;

      if (!body.email || !body.password)
        throw new BadRequestError("invalid payload");

      const access_token = await this.service.login({
        email: body.email,
        password: body.password,
      });
      response.setStatus(201).setPayload({ access_token });

      return response.exec();
    } catch (err) {
      next(err);
    }
  }
};
