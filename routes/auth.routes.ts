import { Router } from "express";
import AuthController from "../controller/AuthController.ts";
import UserDbService from "../db/UserDbService.ts";

const authRouter = Router();

const userDbService = new UserDbService();
const authController = new AuthController(userDbService);

authRouter.post("/signup", authController.SignUp);
authRouter.post("/login", authController.Login);
authRouter.post("/refresh", authController.Refresh);
authRouter.delete("/logout", authController.Logout);

export default authRouter;
