import { PrismaClient, Users } from "@prisma/client";
import { createError } from "../exceptions/error.exception";
import { hashPassword } from "../utils/password.utils";
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
