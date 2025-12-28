import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET, JWT_SECRET } from "../config/config.js";
import { ValidationError, validateUserData } from "../utils/CustomErrors.ts";
import { IUserDbService } from "../db/UserDbService.ts";
import responseGenerator from "../utils/responseGenerator.ts";

interface IAuthController {
  SignUp(req: Request, res: Response, next: NextFunction): Promise<void>;
  Login(req: Request, res: Response, next: NextFunction): Promise<void>;
  Refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
  Logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
class AuthController implements IAuthController {
  userDbService: IUserDbService;
  constructor(userDbSerive: IUserDbService) {
    this.userDbService = userDbSerive;
  }

  private refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedUserData = validateUserData(req.body);

      validatedUserData.password = await bcrypt.hash(
        validatedUserData.password,
        10
      );

      const user = await this.userDbService.createUser(validatedUserData);

      responseGenerator(201, false, user, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedUserData = validateUserData(req.body);

      const user = await this.userDbService.getUserByEmail(
        validatedUserData.email
      );

      if (!user) throw new ValidationError("Invalid email or password", 401);

      const verify = await bcrypt.compare(
        validatedUserData.password,
        user.password
      );

      if (!verify) throw new ValidationError("Invalid email or password", 401);

      const accessToken = jwt.sign({ email: user.email }, JWT_SECRET!, {
        expiresIn: "1h",
        subject: String(user.id),
      });

      const refreshToken = jwt.sign(
        { email: user.email },
        REFRESH_TOKEN_SECRET!,
        {
          expiresIn: "7d",
          subject: String(user.id),
        }
      );

      res.cookie("refreshToken", refreshToken, this.refreshCookieOptions);

      responseGenerator(200, false, { accessToken }, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  Refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = (req as Request & { cookies?: any }).cookies
        ?.refreshToken;

      if (!refreshToken) { 
        throw new ValidationError("Refresh token missing", 401);
      }

      let payload: jwt.JwtPayload;
      try {
        payload = jwt.verify(
          refreshToken,
          REFRESH_TOKEN_SECRET!
        ) as jwt.JwtPayload;
      } catch (_e) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        throw new ValidationError("Invalid or expired refresh token", 401);
      }

      const userId = payload.sub ? Number(payload.sub) : NaN;
      if (Number.isNaN(userId)) {
        throw new ValidationError("Invalid refresh token payload", 401);
      }

      const email =
        typeof payload.email === "string" ? payload.email : undefined;
      if (!email) {
        throw new ValidationError("Invalid refresh token payload", 401);
      }

      const accessToken = jwt.sign({ email }, JWT_SECRET!, {
        expiresIn: "1h",
        subject: String(userId),
      });
      // Optional rotation: issue a new refresh token each refresh.
      //   const newRefreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET!, {
      //     expiresIn: "7d",
      //     subject: String(userId),
      //   });
      //   res.cookie("refreshToken", newRefreshToken, this.refreshCookieOptions);

      responseGenerator(200, false, { accessToken }, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  Logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      // Stateless JWT logout: client should discard the token.
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(204).send();
      return;
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
