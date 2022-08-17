import { Http } from "@status/codes";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import accountDao from "../account/account_dao";

class Authenticate {
  authenticateUser: RequestHandler = async (req, res, next) => {
    const token = (req.headers["authorization"] as string).split(" ")[1];
    if (!token) {
      res.status(Http.NotAcceptable).json({
        error: "A token is required for authentication",
      });
    }
    console.log("Request headers ==> ", token);
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY!);
      console.log("Decoded user ", decoded);

        req.email = <{ email: string }>decoded.email;
        const user = await accountDao.getUser(req.email);
        req.user = { ...user };
      console.log("User found ", req.user);
    } catch (err) {
      console.log("Token error: ", err);
      return res.status(Http.BadRequest).json({
        error: "Invalid token",
      });
    }
    return next();
  };
}
export default new Authenticate();
