module.exports = class BaseException extends Error {
  constructor(message, status, opts) {
    super(message, opts);
    this.status = status;
  }
};
