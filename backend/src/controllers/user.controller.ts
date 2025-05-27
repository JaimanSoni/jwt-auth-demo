import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { Request, Response } from "express";
import { APIError } from "../utils/APIError";
import { httpStatus } from "../utils/httpStatus";
import { generateUsername } from "../utils/generateUsername";
import { RegisterRequestBody } from "../types/index";
import { User } from "../models/user.model";
import { UserRegisterSchema, UserLoginSchema } from "../validations/index";
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
import { sendResetEmail } from "../utils/emailUtils";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ): Promise<void> => {
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

      res.status(httpStatus.CREATED).json(
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
      return;
    } catch (err: any) {
      throw new APIError(httpStatus.BAD_REQUEST, "Something went wrong.");
    }
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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

    res.status(httpStatus.OK).json(
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
    return;
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const refresh_token = req.cookies?.refreshToken;

    if (!refresh_token) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json(
          new APIResponse(
            httpStatus.UNAUTHORIZED,
            null,
            "No refresh token found"
          )
        );
      return;
    }

    const user = await User.findOne({ refresh_token });

    if (user) {
      user.refresh_token = null;
      await user.save();
    }

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res
      .status(httpStatus.OK)
      .json(new APIResponse(httpStatus.OK, null, "Logout successful"));
    return;
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies?.refreshToken;
    if (!token) {
      res.status(403).json({ message: "No refresh token found" });
      return;
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired refresh token" });
      return;
    }
    const user = await User.findById(payload.userId);
    if (!user || user.refresh_token !== token) {
      res.status(403).json({ message: "Refresh token mismatch" });
      return;
    }

    const userId = user._id.toString();
    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    user.refresh_token = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);
    res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

    res.status(200).json({ accessToken: newAccessToken });
    return;
  }
);

export const forgetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const resetToken = user.createPasswordResetToken();
    await user.save();
    await sendResetEmail(email, resetToken);

    res.json({ message: "Reset email sent", token: resetToken });
    return;
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.params);
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      password_reset_token: hashedToken,
      password_reset_expires: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({ message: "Token invalid or expired" });
      return;
    }
    user.password = req.body.password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
    return;
  }
);
