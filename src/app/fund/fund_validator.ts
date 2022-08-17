import { Http } from "@status/codes";
import { RequestHandler } from "express";
import Joi from "joi";
import { Validator } from "../../util/validator";

class FundValidator {
  transfer: RequestHandler = (req, res, next) => {
    const transferSchema = Joi.object({
      to: Joi.number().required(),
      amount: Joi.number().required(),
      description: Joi.string().required()
    });
    const errors = Validator.validate(transferSchema, req.body);
    if (!errors) return next();
    if (errors.length > 0) return res.status(Http.BadRequest).json(errors);
  };
  widthraw: RequestHandler = (req, res, next) => {
    const widthrawSchema = Joi.object({
      amount: Joi.number().required()
    });
    const errors = Validator.validate(widthrawSchema, req.body);
    if (!errors) return next();
    if (errors.length > 0) return res.status(Http.BadRequest).json(errors);
  };
  fund: RequestHandler = (req, res, next) => {
    const fundSchema = Joi.object({
      amount: Joi.number().required(),
      accountId: Joi.number().required(),
    });
    const errors = Validator.validate(fundSchema, req.body);
    if (!errors) return next();
    if (errors.length > 0) return res.status(Http.BadRequest).json(errors);
  };
}

export default new FundValidator();
