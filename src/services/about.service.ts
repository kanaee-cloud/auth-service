import { PrismaClient } from "@prisma/client"
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logging.utils";

const prisma = new PrismaClient()

export const getAboutService = async () => {
    const about = await prisma.about.findFirst();

    if(!about){
        throw createError("Not Found", "About data not found", 404);
    }

    logger.info(`About data retrieved`)

    return about;
}

export const getWorkExperience = async () => {
    const workExperience = await prisma.workExperience.findMany();

    if(!workExperience || workExperience.length === 0){
        throw createError("Not Found", "Work experience data not found", 404);
    }

    logger.info(`Work experience data retrieved`)

    return workExperience;
}

export const getEducationService = async () => {

    const education = await prisma.education.findMany();

    if(!education || education.length === 0){
        throw createError("Not Found", "Education data not found", 404);
    }

    logger.info(`Education data retrieved`)

    return education;
}

export const updateAboutService = async (id: number, data: { description?: string; cvUrl?: string }) => {
  const aboutExists = await prisma.about.findUnique({ where: { id } });

  if (!aboutExists) {
    throw createError("Not Found", "About data not found", 404);
  }

  const updatedAbout = await prisma.about.update({
    where: { id },
    data: {
      description: data.description ?? aboutExists.description,
      cvUrl: data.cvUrl ?? aboutExists.cvUrl,
    },
  });

  logger.info(`About data with ID ${id} updated successfully`);
  return updatedAbout;
};

export const addWorkExperienceService = async (data : {
  title: string,
  company: string,
  imgUrl: string,
  location: string,
  startDate: Date,
  endDate?: Date,
  type: string,
}) => {
  const newWork = await prisma.workExperience.create({
    data
  });

  logger.info(`New work experience added with ID ${newWork.id}`);
  return newWork;
}

export const updateWorkExperienceService = async (id: number, data: {
  title?: string,
  company?: string,
  imgUrl?: string,
  location?: string,
  startDate?: Date,
  endDate?: Date,
  type?: string,
}) => {
  const workExists = await prisma.workExperience.findUnique({ where: { id } });

  if (!workExists) {
    throw createError("Not Found", `Work experience with ID ${id} not found`, 404);
  }

  const updatedWork = await prisma.workExperience.update({
    where: { id },
    data,
  })

  logger.info(`Work experience with ID ${id} updated successfully`);
  return updatedWork;
}

export const deleteWorkExperienceService = async (id: number) => {
  const work = await prisma.workExperience.findUnique({ where: { id } });

  if (!work) {
    throw createError("Not Found", `Work experience with ID ${id} not found`, 404);
  }

  const deleted = await prisma.workExperience.delete({ where: { id } });

  logger.info(`Work experience with ID ${id} deleted successfully`);
  return deleted;
};

export const addEducationService = async (data: {
  school: string,
  imgUrl: string,
  major: string,
  location: string,
  startDate: Date,
  endDate?: Date,
  status: string,
}) => {
  const newEducation = await prisma.education.create({
    data
  })

  logger.info(`New education added with ID ${newEducation.id}`);
  return newEducation;
}

export const deleteEducationService = async (id: number) => {
  const education = await prisma.education.findUnique({ where: { id } });

  if (!education) {
    throw createError("Not Found", `Education with ID ${id} not found`, 404);
  }
  const deleted = await prisma.education.delete({ where: { id } });

  logger.info(`Education with ID ${id} deleted successfully`);
  return deleted;
}

export const updateEducationService = async (id: number, data: {
  school?: string,
  imgUrl?: string,
  major?: string,
  location?: string,
  startDate?: Date,
  endDate?: Date,
  status?: string,
}) => {
  const educationExists = await prisma.education.findUnique({ where: { id } });

  if (!educationExists){
    throw createError("Not Found", `Education with ID ${id} not found`, 404);
  }

  const updatedEducation = await prisma.education.update({
    where: { id },
    data,
  })

  logger.info(`Education with ID ${id} updated successfully`);
  return updatedEducation;
}
