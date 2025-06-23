const CRUDService = require("../base.service");
const { BadRequestError } = require("../utils/exceptions/exception.impl");
const ResponseBuilder = require("../utils/response");

class UserController {
  /**
   *
   * @param {CRUDService} service
   */
  constructor(service) {
    this.service = service;
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async handleAll(req, res, next) {
    const response = new ResponseBuilder(res);
    try {
      const query = req.query; // just for reminder i should handle query later

      const data = await this.service.getAll(query);
      response.setPayload(data);

      return response.exec();
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async handleCreate(req, res, next) {
    const response = new ResponseBuilder(res);
    try {
      const body = req.body;
      if (!body) throw new BadRequestError("invalid body");

      const result = await this.service.create(body);
      response.setStatus(201).setPayload(result);

      return response.exec();
    } catch (err) {
      next(err);
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async handleDetail(req, res, next) {
    const response = new ResponseBuilder(res);
    try {
      let id = req.params.id;
      if (!id || typeof id !== "string")
        throw new BadRequestError("no id provided");

      const detail = await this.service.getOne(id);
      response.setStatus(200).setPayload(detail);

      return response.exec();
    } catch (err) {
      next(err);
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async handleUpdate(req, res, next) {
    const response = new ResponseBuilder(res);
    try {
      let id = req.params.id;
      if (!id || typeof id !== "string")
        throw new BadRequestError("no id provided");

      const body = req.body;
      if (!body) throw new BadRequestError("invalid body");

      const updated = await this.service.update(id, body);
      response.setStatus(201).setPayload(updated);

      return response.exec();
    } catch (err) {
      next(err);
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async handleDelete(req, res, next) {
    const response = new ResponseBuilder(res);
    try {
      let id = req.params.id;
      if (!id || typeof id !== "string")
        throw new BadRequestError("no id provided");

      const data = await this.service.delete(id);
      response.setStatus(201).setPayload(data);

      return response.exec();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
