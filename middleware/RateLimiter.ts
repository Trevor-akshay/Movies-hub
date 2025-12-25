import { Request, Response, NextFunction } from "express";
import { API_REQUESTS_PER_USER } from "../config/config.ts";
import { ValidationError } from "../utils/CustomErrors.ts";

const map: {
  [key: string]: { count: number; timeStamp: Date[] };
} = {};
const RateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user?.userId as number;

  if (!id) throw new ValidationError("Please login", 400);

  const currentTime = new Date();

  if (map[id]) {
    map[id].timeStamp = map[id].timeStamp.filter((time) => {
      return currentTime.getTime() - time.getTime() < 15000;
    });
    map[id].count = map[id].timeStamp.length;

    if (map[id].count > Number.parseInt(API_REQUESTS_PER_USER!)) {
      throw new ValidationError("API limit exceeded. Try again later", 429);
    }

    map[id].timeStamp.push(currentTime);
  } else {
    map[id] = { count: 1, timeStamp: [currentTime] };
  }

  next();
};


export default RateLimiter;
