import { Request, Response } from "express";
import { asyncHandler } from "../exceptions/async_handler.exception";
import {
    addTechSkillService,
  getPersonalizeService,
  updatePersonalizeService,
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