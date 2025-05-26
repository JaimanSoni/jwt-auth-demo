const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
import { APIError } from "../utils/APIError";
import { httpStatus } from "../utils/httpStatus";
import { generateUsername } from "../utils/generateUsername";
import { RegisterRequestBody } from "../types";
import { User } from "../models/user.model";
import { UserRegisterSchema, UserLoginSchema } from "../validations";
import { APIResponse } from "../utils/APIResponse";
import { cookieOptions } from "../utils/cookieOptions";
import { generateRefreshToken, generateAccessToken } from "../utils/tokenUtils";

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

      res.cookie("refreshToken", refreshToken, cookieOptions);

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

  res.cookie("refreshToken", refreshToken, cookieOptions);

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
      .json(new APIResponse(httpStatus.UNAUTHORIZED, null, "No refresh token found"));
  }

  const user = await User.findOne({ refresh_token });

  if (user) {
    user.refresh_token = null;
    await user.save();
  }

  res.clearCookie("refreshToken");

  return res
    .status(httpStatus.OK)
    .json(new APIResponse(httpStatus.OK, null, "Logout successful"));
});


export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Refresh Access Token");
  }
);

export const forgetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Forget Password");
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Reset Password");
  }
);
