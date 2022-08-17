import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status((err && err.status) || 500);
  console.log("Internal server error=>", err)
  res.send({ error: "Internal server error" });
};