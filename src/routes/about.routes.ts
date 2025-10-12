import { Router } from "express";
import { addEducationController, addWorkExperienceController, deleteEducationController, deleteWorkExperienceController, getAboutController, getEducationController, getWorkExperienceController, updateAboutController } from "../controller/about.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/description", getAboutController);
router.get("/work-experience", getWorkExperienceController);
router.get("/education", getEducationController);

router.put("/description", authMiddleware, updateAboutController);
router.post("/work-experience", authMiddleware, addWorkExperienceController);
router.delete("/work-experience", authMiddleware, deleteWorkExperienceController);

router.post("/education", authMiddleware, addEducationController);
router.delete("/education", authMiddleware, deleteEducationController);

export default router;