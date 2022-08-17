import { Router } from "express";
import fundController from "../../app/fund/fund_controller";
import fundValidator from "../../app/fund/fund_validator";
import authenticate from "../../app/middlewares/authenticate";

const router = Router();

router.post(
  "/",
  authenticate.authenticateUser,
  fundValidator.fund,
  fundController.fund
);
router.post(
  "/transfer",
  authenticate.authenticateUser,
  fundValidator.transfer,
  fundController.transfer
);
router.post(
  "/widthraw",
  authenticate.authenticateUser,
  fundValidator.widthraw,
  fundController.widthraw
);

export default router;
