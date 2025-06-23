require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../user/model");
const bcrypt = require("bcryptjs");
const {
  UnauthenticatedError,
  UnauthorizedError,
} = require("../utils/exceptions/exception.impl");

module.exports = class AuthHandler {
  constructor() {
    this.jwt = jwt;
    this.secret = process.env.JWT_SECRET ?? "rahasia^^";
    this.bcrypt = bcrypt;
    this.model = User;
  }

  async login({ email, password }) {
    const user = await this.model.findOne({ email }).exec();
    if (!user) throw new UnauthenticatedError("invalid email / password");

    const valid = await this.bcrypt.compare(password, user.password);

    if (!valid) throw new UnauthenticatedError("invalid email / password");

    const { name, _id } = user;

    return await this.sign({
      name,
      email,
      _id,
    });
  }

  async checkToken(token) {
    const payload = await this.verify(token);
    if (!payload._id) throw new UnauthorizedError("invalid payload");

    const user = await this.model.findById(payload._id);
    if (!user) throw new UnauthorizedError("invalid payload");

    return user;
  }

  async sign(payload) {
    return this.jwt.sign(payload, this.secret, { algorithm: "HS512" }); // signing using SHA-512 and no expires
  }

  async verify(token) {
    return this.jwt.verify(token, this.secret, { algorithms: "HS512" });
  }
};
