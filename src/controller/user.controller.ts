import { Request, Response } from "express";
import { changeEmailService, changePasswordService, changeUsernameService, createUser, getUser } from "../services/user.service";
import { generateAccessToken, verifyRefreshToken } from "../utils/auth.utils";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { logger } from "../utils/logging.utils";
import { createError } from "../exceptions/error.exception";
import { createRefreshToken, deleteToken } from "../services/token.service";
import { comparePassword } from "../utils/password.utils";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await createUser(username, email, password);

    logger.info(
      `Success create user ${user.username} with email: ${user.email}`
    );
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      details: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
    });
    return;
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await getUser({ email: email });

    if (!(await comparePassword(password, user.password))) {
      throw createError("failed", "Wrong password", 400);
      return;
    }

    const refreshToken = await createRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token: generateAccessToken(user.id),
    });

    return;
  }
);

export const getUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken);

    if (!token) {
      throw createError("failed", "Please attach token", 400);
      return;
    }

    const user = await getUser({ id: token.userId });

    res.status(200).json({
      status: "success",
      message: "Successfully get user",
      details: {
        user: {
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
    });

    return;
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw createError("failed", "Please attach RefreshToken", 400);
    return;
  }

  await deleteToken(token);

  res.clearCookie("refreshToken");

  res.status(200).json({
    status: "success",
    message: "Successfully Logged out",
  });

  return;
});

export const changeEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const { newEmail } = req.body;
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }
    const user = await changeEmailService(token.userId, newEmail);
    res.status(200).json({
      status: "success",
      message: "Email updated successfully",
      details: { email: user.email },
    });
  }
);

export const changeUsernameController = asyncHandler(
  async (req: Request, res: Response) => {
    const { newUsername } = req.body;
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }
    const user = await changeUsernameService(token.userId, newUsername);
    res.status(200).json({
      status: "success",
      message: "Username updated successfully",
      details: { username: user.username },
    });
  }
);

export const changePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }
    await changePasswordService(token.userId, oldPassword, newPassword);
    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  }
);
