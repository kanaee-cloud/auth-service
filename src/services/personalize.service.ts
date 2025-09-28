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

export const updateTechSkillService = async (
  id: number,
  data: { name?: string; iconUrl?: string | null }
) => {
  const existingSkill = await prisma.techSkill.findUnique({
    where: { id },
  });

  if (!existingSkill) {
    throw createError("Not Found", "Tech skill not found", 404);
  }

  const updated = await prisma.techSkill.update({
    where: { id },
    data,
  });

  logger.info(`Tech skill ${id} updated`);

  return updated;
};

export const deleteTechSkillService = async (id: number) => {
  const existingSkill = await prisma.techSkill.findUnique({
    where: { id }
  })

  if (!existingSkill) {
    throw createError("Not Found", "Tech skill not found", 404);
  }

  const deleted = await prisma.techSkill.delete({
    where: { id }
  });

  return deleted;
} 

export const addStatService = async (
  personalizeId: number,
  label: string,
  value: string
) => {
  const personalize = await prisma.personalize.findUnique({
    where: { id: personalizeId }
  });

  if (!personalize) {
    throw createError("Not Found", "Personalize not found", 404);
  }

  const stat = await prisma.stat.create({
    data: {
      label,
      value,
      personalizeId
    }
  });

  return stat;
};

export const updateStatService = async (
  id: number,
  label?: string,
  value?: string,
) => {
  const existingStat = await prisma.stat.findUnique({
    where: { id },
    include: { personalize: true }
  });

  if (!existingStat) {
    throw createError("Not Found", "Stat not found", 404);
  }

  const updated = await prisma.stat.update({
    where: { id },
    data: { label, value }
  });

  return updated;
};

export const deleteStatService = async (id: number) => {
  const existingStat = await prisma.stat.findUnique({
    where: { id },
    include: { personalize: true }
  });

  if (!existingStat) {
    throw createError("Not Found", "Stat not found", 404);
  }

  const deleted = await prisma.stat.delete({
    where: { id }
  });

  return deleted;
};
