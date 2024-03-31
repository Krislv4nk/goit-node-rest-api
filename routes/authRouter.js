import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../helpers/validateBody.js";

import {userSignupSchema, userSigninSchema, userEmailSchema} from "../schemas/usersSchemas.js";

import authenticate from "../middlewares/authenticate.js";

import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", upload.single("avatar"), validateBody(userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", validateBody(userEmailSchema), authController.resendVerifyEmail);

authRouter.post("/login", validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch("/subscription", authenticate, authController.updateStatus);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);


export default authRouter;