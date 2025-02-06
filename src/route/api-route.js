import express from "express";
import userController from "../controller/user-controller.js";
import biayaController from "../controller/biaya-controller.js";
import { authentication } from "../middleware/auth-middleware.js";
import { authApiKey } from "../middleware/apiKey-middleware.js";

const apiRouter = new express.Router();
apiRouter.use(authentication, authApiKey);

// User API
apiRouter.get("/api/users/profile", userController.getUserController);
apiRouter.post("/api/users/logout", userController.logout);

// Biaya API
apiRouter.post("/api/user/biaya", biayaController.createBiayaController);
apiRouter.get("/api/user/biaya", biayaController.getAllBiayaController);
apiRouter.get("/api/user/:biayaId", biayaController.getBiayaByIdController);
apiRouter.delete(
  "/api/user/biaya/:biayaId/kebutuhan/:kebutuhanId",
  biayaController.removeBiayaController
);

export { apiRouter };
