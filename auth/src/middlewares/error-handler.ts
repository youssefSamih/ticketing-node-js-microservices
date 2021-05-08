import express from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map(error => {
      return {
        message: error.msg,
        field: error.param
      };
    });
    return res.status(400).send({ errors: formattedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('DatabaseConnectionError')
  }
  res.status(400).send({
    message: err.message
  })
}