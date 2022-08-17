import express from "express";
import path from "path";
import dontenv from "dotenv";
dontenv.config({});
import cookieParser from "cookie-parser";
import logger from "morgan";

import router from "./routes/v1";
import { errorHandler } from "./app/middlewares";
const  app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", router);
app.use(errorHandler);

export default app;