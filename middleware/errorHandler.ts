import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import responseGenerator from "../utils/responseGenerator.ts";
import { ValidationError } from "../utils/CustomErrors.ts";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("err : ", err);
  if (
    err instanceof jwt.TokenExpiredError ||
    err instanceof jwt.JsonWebTokenError
  ) {
    let status = 401;
    return responseGenerator(status, true, err, res);
  }
  if (err instanceof PrismaClientKnownRequestError) {
    const prismaErr = err;

    let status = 400;
    let message = "Database request failed";

    switch (prismaErr.code) {
      case "P2002": {
        status = 409;
        const target = (prismaErr.meta as { target?: unknown } | undefined)
          ?.target;
        message = target
          ? `Unique constraint failed on: ${String(target)}`
          : "Unique constraint failed";
        break;
      }
      case "P2025": {
        status = 404;
        message = "Record not found";
        break;
      }
      default: {
        status = 400;
        message = prismaErr.message || message;
      }
    }

    return responseGenerator(
      status,
      true,
      { name: "PrismaClientKnownRequestError", message, status },
      res
    );
  }

  if (err instanceof ValidationError) {
    return responseGenerator(err.status, true, err, res);
  }

  return responseGenerator(err?.status || 500, true, err, res);
};

export default errorHandler;
