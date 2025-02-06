import express from "express";
import userController from "../controller/user-controller.js";
import { authApiKey } from "../middleware/apiKey-middleware.js";

const publicRouter = new express.Router();
publicRouter.use(authApiKey);
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.post("/api/users/refreshToken", userController.refreshToken);

export { publicRouter };
