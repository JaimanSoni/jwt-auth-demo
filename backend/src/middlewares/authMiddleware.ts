import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/APIError";
import { httpStatus } from "../utils/httpStatus";
import { User } from "../models/user.model";
import { verifyAccessToken } from "../utils/tokenUtils";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new APIError(httpStatus.UNAUTHORIZED, "Authorization token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);

    if (!decoded?.userId) {
      throw new APIError(httpStatus.UNAUTHORIZED, "Invalid token payload");
    }

    const user = await User.findById(decoded.userId).select(
      "-password -refresh_token"
    );

    if (!user) {
      throw new APIError(httpStatus.UNAUTHORIZED, "User not found");
    }

    req.user = user;
    next();
  } catch (err: any) {
    throw new APIError(
      httpStatus.UNAUTHORIZED,
      err.message || "Invalid access token"
    );
  }
};
