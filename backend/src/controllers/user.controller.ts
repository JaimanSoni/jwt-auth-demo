const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
import { APIError } from "../utils/APIError";
import { httpStatus } from "../utils/httpStatus";
import { generateUsername } from "../utils/generateUsername";
import { RegisterRequestBody } from "../types";
import { User } from "../models/user.model";
import { UserRegisterSchema, UserLoginSchema } from "../validations";
import { APIResponse } from "../utils/APIResponse";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookieOptions";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
} from "../utils/tokenUtils";
import { verify } from "jsonwebtoken";
import { sendResetEmail } from "../utils/emailUtils";
const crypto = require("crypto");

export const register = asyncHandler(
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { error, value } = UserRegisterSchema.validate(req.body);

    if (error) {
      throw new APIError(httpStatus.BAD_REQUEST, error.details[0].message);
    }

    const { name, email, password } = value;

    const isUserAlreadyExist = await User.findOne({ email });
    if (isUserAlreadyExist) {
      throw new APIError(httpStatus.BAD_REQUEST, "User already exists.");
    }

    const username = generateUsername(email);

    try {
      const newUser = await User.create({
        name,
        username,
        email,
        password,
      });
      const id = newUser._id.toString();
      const refreshToken = generateRefreshToken(id);
      const accessToken = generateAccessToken(id);
      newUser.refresh_token = refreshToken;
      await newUser.save();

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
      res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      return res.status(httpStatus.CREATED).json(
        new APIResponse(
          httpStatus.CREATED,
          {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            accessToken,
          },
          "User Created Successfully"
        )
      );
    } catch (err: any) {
      throw new APIError(httpStatus.BAD_REQUEST, "Something went wrong.");
    }
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = UserLoginSchema.validate(req.body);
  if (error) {
    throw new APIError(httpStatus.BAD_REQUEST, error.details[0].message);
  }

  const { email, password } = value;
  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new APIError(httpStatus.UNAUTHORIZED, "Invalid credentials.");
  }

  const id = user._id.toString();
  const refreshToken = generateRefreshToken(id);
  const accessToken = generateAccessToken(id);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  user.refresh_token = refreshToken;
  await user.save();

  return res.status(httpStatus.OK).json(
    new APIResponse(
      httpStatus.OK,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        accessToken,
      },
      "Login Successful"
    )
  );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refresh_token = req.cookies.refreshToken;

  if (!refresh_token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json(
        new APIResponse(httpStatus.UNAUTHORIZED, null, "No refresh token found")
      );
  }

  const user = await User.findOne({ refresh_token });

  if (user) {
    user.refresh_token = null;
    await user.save();
  }

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res
    .status(httpStatus.OK)
    .json(new APIResponse(httpStatus.OK, null, "Logout successful"));
});

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) return res.status(403).json({ message: "No token" });

      // const payload = verify(token, process.env.JWT_REFRESH_SECRET);
      const payload = verifyRefreshToken(token);
      const user = await User.findById(payload.userId);
      if (!user || user.refresh_token !== token) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      const id = user._id.toString();
      const newAccessToken = generateAccessToken(id);
      const newRefreshToken = generateRefreshToken(id);
      user.refresh_token = newRefreshToken;
      await user.save();

      res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);
      res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: "Token expired or invalid" });
    }
  }
);

export const forgetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.createPasswordResetToken();
    await user.save();
    await sendResetEmail(email, resetToken);

    res.json({ message: "Reset email sent" });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.params)
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    user.password = req.body.password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  }
);