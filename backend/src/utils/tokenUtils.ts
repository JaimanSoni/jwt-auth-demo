import { config } from "dotenv";
import { sign, SignOptions } from "jsonwebtoken";

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error(
    "ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be defined"
  );
}

type JwtExpiresIn =
  | "1s"
  | "10s"
  | "30s"
  | "1m"
  | "10m"
  | "30m"
  | "1h"
  | "2h"
  | "1d"
  | "7d";

function getExpiresIn(
  envValue: string | undefined,
  defaultValue: JwtExpiresIn
): JwtExpiresIn {
  const allowedValues: JwtExpiresIn[] = [
    "1s",
    "10s",
    "30s",
    "1m",
    "10m",
    "30m",
    "1h",
    "2h",
    "1d",
    "7d",
  ];
  if (envValue && allowedValues.includes(envValue as JwtExpiresIn)) {
    return envValue as JwtExpiresIn;
  }
  return defaultValue;
}

const accessTokenOptions: SignOptions = {
  expiresIn: getExpiresIn(process.env.JWT_EXPIRES_IN, "1h"),
};

const refreshTokenOptions: SignOptions = {
  expiresIn: getExpiresIn(process.env.JWT_REFRESH_EXPIRES_IN, "7d"),
};

export const generateAccessToken = (userId: string): string => {
  return sign({ userId }, ACCESS_TOKEN_SECRET, accessTokenOptions);
};

export const generateRefreshToken = (userId: string): string => {
  return sign({ userId }, REFRESH_TOKEN_SECRET, refreshTokenOptions);
};
