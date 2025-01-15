import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "../middleware/error-middleware.js";
import helmet from "helmet";
import { publicRouter } from "../route/public-route.js";
import { apiRouter } from "../route/api-route.js";

export const web = express();
dotenv.config();
web.use(helmet());
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header;
  next();
});
web.use(errorMiddleware);
web.use(publicRouter);
web.use(apiRouter);
