import { Request, Response, NextFunction } from "express";

const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`Method: ${req.method} , URL: ${req.url}`);
  next()
};

export default logger;
