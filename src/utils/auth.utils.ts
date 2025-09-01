import jwt from "jsonwebtoken";
import { userInfo } from "os";
import { createError } from "../exceptions/error.exception";
import { Request } from "express";
import config from "../config/config";

const ACCESS_KEY = config.jwtAccess;
const REFRESH_KEY = config.jwtRefresh;

interface JwtPayload {
  userId: number;
}

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, ACCESS_KEY, {
    expiresIn: "15m",
  });
};

export const getUserIdFromJWT = (req: Request) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw createError("Unauthorized", "Token Required", 401);
  }

  const verifiedToken = verifyAccessToken(token);

  if (!verifiedToken) {
    throw createError("Unauthorized", "Invalid Token", 401);
  }

  return verifiedToken.userId;
};

export const getUserIdFromJWTRefresh = (req: Request) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw createError("Unauthorized", "Token Required", 401);
  }

  const verifiedToken = verifyRefreshToken(token);

  if (!verifiedToken) {
    throw createError("Unauthorized", "Invalid Token", 401);
  }

  return verifiedToken.userId;
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, REFRESH_KEY, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_KEY) as JwtPayload;
  } catch (error) {
    return false;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_KEY) as JwtPayload;
  } catch (error) {
    return false;
  }
};


