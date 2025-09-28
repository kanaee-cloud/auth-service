import { Request, Response } from "express";
import { asyncHandler } from "../exceptions/async_handler.exception";
import {
  addStatService,
    addTechSkillService,
  deleteStatService,
  deleteTechSkillService,
  getPersonalizeService,
  updatePersonalizeService,
  updateStatService,
  updateTechSkillService,
} from "../services/personalize.service";
import { verifyRefreshToken } from "../utils/auth.utils";
import { createError } from "../exceptions/error.exception";

export const getPersonalizeController = asyncHandler(
  async (req: Request, res: Response) => {
    const personalize = await getPersonalizeService();

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved personalize data",
      details: {
        personalize,
      },
    });
  }
);

export const updatePersonalizeController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }

    const { id, name, age, bio, avatarUrl } = req.body;

    if (!id) {
      throw createError("failed", "Personalize id is required", 400);
    }

    const updated = await updatePersonalizeService(id, {
      name,
      age,
      bio,
      avatarUrl,
    });

    res.status(200).json({
      status: "success",
      message: "Personalize updated successfully",
      details: { personalize: updated },
    });
  }
);

export const addTechSkillController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }

    const { personalizeId, name, iconUrl } = req.body;

    if (!personalizeId || !name) {
      throw createError("failed", "personalizeId and name are required", 400);
    }


    const techSkill = await addTechSkillService(name, iconUrl, personalizeId);

    res.status(200).json({
      status: "success",
      message: "Tech skill added successfully",
      details: { techSkill },
    });
  }
);

export const updateTechSkillController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }

    const { id, name, iconUrl } = req.body;

    if (!id) {
      throw createError("failed", "Tech skill id is required", 400);
    }

    const updated = await updateTechSkillService(id, { name, iconUrl });

    res.status(200).json({
      status: "success",
      message: "Tech skill updated successfully",
      details: { techSkill: updated },
    });
  }
);

export const deleteTechSkillController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken);
    if (!token) {
      throw createError("failed", "Please attach token", 400);
    }

    const { id } = req.body;

    if (!id) {
      throw createError("failed", "Tech skill id is required", 400);
    }

    const deleted = await deleteTechSkillService(id);

    res.status(200).json({
      status: "success",
      message: "Tech skill deleted successfully",
      details: { techSkill: deleted },
    });
  }
);

export const addStatController = async (req: Request, res: Response) => {
  try {
    const { personalizeId, label, value } = req.body;
    const stat = await addStatService(personalizeId, label, value);

    res.status(201).json({
      message: "Stat added successfully",
      details: stat
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error: error.name || "Error",
      message: error.message
    });
  }
};

export const updateStatController = async (req: Request, res: Response) => {
  try {
    const { id, label, value } = req.body;
  
    const updatedStat = await updateStatService(id, label, value);

    res.status(200).json({
      message: "Stat updated successfully",
      details: updatedStat
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error: error.name || "Error",
      message: error.message
    });
  }
};

export const deleteStatController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deletedStat = await deleteStatService(id);

    res.status(200).json({
      message: "Stat deleted successfully",
      details: deletedStat
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      error: error.name || "Error",
      message: error.message
    });
  }
};