const { UnauthorizedError } = require("../utils/exceptions/exception.impl");
const AuthHandler = require("./handler");
const authHandler = new AuthHandler();

module.exports = async function (req, res, next) {
  try {
    const headers = req.headers;
    const bearerToken = headers.authorization;
    if (!bearerToken) throw new UnauthorizedError("not authorized");

    const [type, token] = bearerToken.split(" ");

    if (!type || type !== "Bearer" || !token)
      throw new UnauthorizedError("not authorized");

    const user = await authHandler.checkToken(token);
    req.user = user; //appending user to request just in case needed when updating or deleting

    next();
  } catch (err) {
    next(err);
  }
};
