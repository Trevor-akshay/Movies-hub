import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/config.js";
import { ValidationError } from "../utils/CustomErrors.ts";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email?: string;
  };
}

const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new ValidationError("Authorization header missing or malformed", 401));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    const userId = payload.sub ? Number(payload.sub) : NaN;
    if (Number.isNaN(userId)) {
      next(new ValidationError("Invalid token payload", 401));
      return;
    }

    req.user = {
      userId,
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
