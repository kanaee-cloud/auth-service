import { PrismaClient } from "@prisma/client";
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logging.utils";

const prisma = new PrismaClient();

export const getPersonalizeService = async () => {
  const personalize = await prisma.personalize.findFirst({
    include: {
      stats: true,
      techSkills: true,
    },
  });

  if (!personalize) {
    throw createError("Not Found", "Personalize data not found", 404);
  }

  logger.info(`Personalize data retrieved for ${personalize.name}`);

  return personalize;
};

export const updatePersonalizeService = async (
  personalizeId: number,
  data: {
    name?: string;
    age?: number;
    bio?: string;
    avatarUrl?: string;
  }
) => {
  const existing = await prisma.personalize.findUnique({
    where: { id: personalizeId },
  });

  if (!existing) {
    throw createError("Not Found", "Personalize data not found", 404);
  }

  const updated = await prisma.personalize.update({
    where: { id: personalizeId },
    data,
  });

  logger.info(`Personalize ${personalizeId} updated`);

  return updated;
}
export const addTechSkillService = async (
  name: string,
  iconUrl: string | null,
  personalizeId: number
) => {

  const existingPersonalize = await prisma.personalize.findUnique({
    where: { id: personalizeId },
  });

  if (!existingPersonalize) {
    throw createError("Not Found", "Personalize not found", 404);
  }

  
  const existingSkill = await prisma.techSkill.findFirst({
    where: {
      name,
      personalizeId,
    },
  });

  if (existingSkill) {
    throw createError("Failed", "Tech skill already exists for this user", 400);
  }

  const techSkill = await prisma.techSkill.create({
    data: {
      name,
      iconUrl,
      personalizeId, 
    },
  });

  logger.info(`Tech skill ${name} added for personalizeId ${personalizeId}`);

  return techSkill;
};