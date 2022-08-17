import { Router } from "express";
import accountController from "../../app/account/account_controller";
import accountValidator from "../../app/account/account_validator";

const router = Router();

router.post(
  "/signup",
  accountValidator.createCustomer,
  accountController.signup
); // fund account
router.post("/login", accountValidator.login, accountController.login); // widthraw

export default router;
