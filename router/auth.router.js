import express from "express";
import authController from "../controllers/auth.controller.js";

import { passwordIsOk } from "../middleware/auth/passwordIsOk.middleware.js";
import { accountHasBeenVerified } from "../middleware/auth/accountHasBeenVerified.middleware.js";
import { accountExistsSignup } from "../middleware/auth/accountExistsSignup.middleware.js";
import { accountExistsSignin } from "../middleware/auth/accountExistsSignin.middleware.js";

import passport from "../middleware/passport.js";

const { signup, signin, signout, token, googleSignin } = authController;

const router = express.Router();

router.post("/google", googleSignin);

router.post("/signup", accountExistsSignup, signup);

router.post(
  "/signin",
  accountExistsSignin,
  passwordIsOk,
  accountHasBeenVerified,
  signin
);

router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  signout
);

router.post("/token", passport.authenticate("jwt", { session: false }), token);

export default router;
