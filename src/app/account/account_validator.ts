import { RequestHandler } from "express";
import Joi, { Schema } from "joi";
import { Http } from "@status/codes";
import { Validator } from "../../util/validator";

class AccountValidator {
  public createCustomer: RequestHandler = (req, res, next) => {
    const signupSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).alphanum().required(),
      dob: Joi.date().required(),
      sex: Joi.string().valid("male", "female", "not sure").required(),
    });
    const errors = Validator.validate(signupSchema, req.body);
    if (!errors) return next();
    if (errors.length > 0) return res.status(Http.BadRequest).json(errors);
  };
  public login: RequestHandler = (req, res, next) => {
    const loginSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const errors = Validator.validate(loginSchema, req.body);
    if (!errors) return next();
    if (errors.length > 0) return res.status(Http.BadRequest).json(errors);
  };
}

export default new AccountValidator();
