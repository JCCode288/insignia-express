const BaseException = require("../exceptions/base.exception");

module.exports = class ResponseBuilder {
  /**
   *
   * @param {import("express").Response} res
   */
  constructor(res) {
    this.res = res;
    this.message = "OK";
    this.status = 200;
  }

  setStatus(status) {
    if (typeof status !== "number") throw new Error("invalid status");

    this.status = status;
    return this;
  }
  setPayload(payload) {
    if (!payload) throw new Error("invalid payload");

    this.data = payload;
    return this;
  }
  setMessage(message) {
    if (typeof message !== "string") throw new Error("invalid message");

    this.message = message;
    return this;
  }

  exec() {
    const payload = {
      status: this.status,
      success: this.status > 300 ? false : true, // naive success validation
      message: this.message,
    };

    if (this.data) payload.data = this.data;

    return this.res.status(this.status).json(payload);
  }

  /**
   *
   * @param {BaseException | Error} err
   */
  setError(err) {
    if (err instanceof BaseException) {
      this.status = err.status;
      this.message = err.message;

      return this;
    }

    this.status = 500;
    this.message = err.message;

    return this;
  }
};
