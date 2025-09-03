import { PrismaClient, Users } from "@prisma/client";
import { createError } from "../exceptions/error.exception";
import { comparePassword, hashPassword } from "../utils/password.utils";
import { logger } from "../utils/logging.utils";

const prisma = new PrismaClient();

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  if (await prisma.users.findUnique({ where: { email } })) {
    throw createError("Failed", "Email ALready Exist", 400);
  }

  const hashedPassword = await hashPassword(password);
  logger.info(
    `User created with email: ${email} hashed password: ${hashedPassword}`
  );

  return prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const getUser = async (where: Partial<Pick<Users, "id" | "email">>) => {
  const user = await prisma.users.findFirst({ where });

  if (!user) {
    throw createError(
      "Not Found",
      "User Not Found. please register first",
      404
    );
  }

  logger.info(`User retrieved with email: ${user.email}`);

  return user;
};

export const changeEmailService = async (userId: number, newEmail: string) => {
  const existing = await prisma.users.findUnique({
    where: { email: newEmail },
  });
  if (existing) {
    throw createError("Failed", "Email already exists", 400);
  }
  const user = await prisma.users.update({
    where: { id: userId },
    data: { email: newEmail },
  });
  logger.info(`User ${userId} changed email to ${newEmail}`);
  return user;
};

export const changeUsernameService = async (
  userId: number,
  newUsername: string
) => {
  const user = await prisma.users.update({
    where: { id: userId },
    data: { username: newUsername },
  });
  logger.info(`User ${userId} changed username to ${newUsername}`);
  return user;
};

export const changePasswordService = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    throw createError("Not Found", "User not found", 404);
  }

  if (!(await comparePassword(oldPassword, user.password))) {
    throw createError("Failed", "Old password is incorrect", 400);
  }
  const hashedPassword = await hashPassword(newPassword);
  await prisma.users.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  logger.info(`User ${userId} changed password`);
  return;
};
