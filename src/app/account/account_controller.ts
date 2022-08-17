import { json, RequestHandler } from "express";
import bycrypt from "bcrypt";
import accountService from "./account_service";
import listener from "../../util/listener";
import { EVENTS } from "../../constants/events";
import { Http } from "@status/codes";

class AccountController {
  signup: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
          const hashedPassword = await bycrypt.hash(password, 10);
    const result = await accountService.createCustomerAuth({
      email,
      password: hashedPassword,
    });
    res.json(result);
    listener.emit(EVENTS.CUSTOMER.CREATED, req.body);
    } catch (exception) {
      console.log("Error creating user", exception)
      next(exception);
    }

  };
  login: RequestHandler = async(req, res, next) => {
    const { error, data } = await accountService.login(req.body);
    if (error)
      return res.status(Http.Forbidden).json({
        error: error,
      });
    res.status(Http.Ok).json({data});
  };
}

export default new AccountController();
