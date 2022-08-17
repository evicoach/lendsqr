import { Http } from "@status/codes";
import { RequestHandler } from "express";
import fundService from "./fund_service";

class FundController {
  transfer: RequestHandler = async (req, res, next) => {
    const { error, data } = await fundService.transfer({
      ...req.body,
      from: req.user.user_id,
    });

    if (error) {
      return res.status(Http.BadRequest).json({
        error,
      });
    }
    return res.status(Http.Ok).json({
      data,
    });
  };
  fund: RequestHandler = async (req, res, next) => {
    const { error, data } = await fundService.fund(req.body);
    if (error) {
      return res.status(Http.ExpectationFailed).json({
        error,
      });
    }
    return res.status(Http.Ok).json({
      data,
    });
  };
  widthraw: RequestHandler = async (req, res, next) => {
    const { error, data } = await fundService.widthraw({
      amount: req.body.amount,
      userId: req.user.user_id,
    });

    if (error) {
      return res.status(Http.Forbidden).json({
        error,
      });
    }
    return res.status(Http.Ok).json({
      data,
    });
  };
}
export default new FundController();
