import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { addEducationService, addWorkExperienceService, deleteEducationService, deleteWorkExperienceService, getAboutService, getEducationService, getWorkExperience, updateAboutService } from "../services/about.service";
import { get } from "http";
import { createError } from "../exceptions/error.exception";

export const getAboutController = asyncHandler(
  async (req: Request, res: Response) => {
    const about = await getAboutService();

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved about data",
      details: {
        about,
      },
    });
  }
);

export const getWorkExperienceController = asyncHandler(
  async (req: Request, res: Response) => {
    const workExperience = await getWorkExperience();

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved work experience data",
      details: {
        workExperience,
      },
    });
  }
);

export const getEducationController = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await getEducationService();

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved education data",
      details: {
        education,
      },
    });
  }
);

export const updateAboutController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, description, cvUrl } = req.body;

    if (!id) {
      throw createError("failed", "About id is required", 400);
    }

    const updated = await updateAboutService(id, { description, cvUrl });

    res.status(200).json({
      status: "success",
      message: "About updated successfully",
      details: { about: updated },
    });

  }
)

export const addWorkExperienceController = asyncHandler(async (req: Request, res: Response) => {
  const { title, imgUrl, company, startDate, endDate, type, location } = req.body;
  const newWorkExperience = await addWorkExperienceService({ title, imgUrl, location, company, startDate, endDate, type })
  res.status(200).json({
    status: "success",
    message: "Work experience added successfully",
    details: { workExperience: newWorkExperience },
  });
})

export const deleteWorkExperienceController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    throw createError("failed", "Work experience id is required", 400);
  }
  const deleted = await deleteWorkExperienceService(id);
  res.status(200).json({
    status: "success",
    message: "Work experience deleted successfully",
    details: { workExperience: deleted },
  });
})

export const addEducationController = asyncHandler( async (req: Request, res: Response) => {
  const { school, imgUrl, major, location, startDate, endDate, status } = req.body;

  const newEducation = await addEducationService({ school, imgUrl, major, location, startDate, endDate, status });
  res.status(200).json({
    status: "success",
    message: "Education added successfully",
    details: { education: newEducation },
  });
})

export const deleteEducationController = asyncHandler( async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    throw createError("failed", "Education id is required", 400);
  }

  const deleted = await deleteEducationService(id);
  res.status(200).json({
    status: "success",
    message: "Education deleted successfully",
    details: { education: deleted },
  });
})
