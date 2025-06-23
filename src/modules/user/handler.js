const { Model } = require("mongoose");
const mongoose = require("../database");
const CRUDStrategy = require("../base.service");
const { BadRequestError } = require("../utils/exceptions/exception.impl");

module.exports = class UserHandler extends CRUDStrategy {
  /**
   * @template T
   * @param {T extends Model} model
   */
  constructor(model) {
    super();
    this.model = model;
  }

  async getAll(query = {}) {
    const mongoQuery = this.model.find(query);
    // do other operation as needed

    return mongoQuery
      .select({
        name: 1,
        email: 1,
      })
      .exec();
  }

  async getOne(id) {
    const mongoQuery = this.model.findById(id);
    // do other operation as needed
    return mongoQuery.select({ password: 0 }).exec();
  }

  async create(data) {
    const user = new this.model(data);
    await user.validate();
    await user.save();

    const { name, email, _id, createdAt, updatedAt } = user;

    return { _id, name, email, createdAt, updatedAt };
  }

  async update(id, data) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const current = await this.getOne(id);
    if (!current) throw new BadRequestError("invalid id");

    current.set(data);
    const { name, email, _id, createdAt, updatedAt } = await current.save();
    await session.commitTransaction();
    await session.endSession();

    return {
      _id,
      name,
      email,
      createdAt,
      updatedAt,
    };
  }

  async delete(id) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const user = await this.getOne(id);
    if (!user) throw new BadRequestError("invalid id");

    const res = await user.deleteOne();

    await session.commitTransaction();
    await session.endSession();

    return res;
  }
};
