import { Router } from 'express';
import fundRouter from './fund';
import accountRouter from './account';

const router = Router();

// ∙ A user can create an account
// ∙ A user can fund their account
// ∙ A user can transfer funds to another user’s account
// ∙ A user can withdraw funds from their account.

router.use("/fund", fundRouter) // transfer, fund and widthraw
router.use("/account", accountRouter) // signup and login

export default router;