const asyncHandler = require("express-async-handler");
const { Request, Response } = require("express");
const User = require("../models/user.model");

export const register = asyncHandler(async (req: Request, res: Response) => {
  console.log("Register");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  console.log("Login");
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  console.log("Logout");
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