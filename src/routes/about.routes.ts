import { Router } from "express";
import { addEducationController, addWorkExperienceController, deleteEducationController, deleteWorkExperienceController, getAboutController, getEducationController, getWorkExperienceController, updateAboutController, updateEducationController, updateWorkExperienceController } from "../controller/about.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/description", getAboutController);
router.put("/description", authMiddleware, updateAboutController);

router.post("/work-experience", authMiddleware, addWorkExperienceController);
router.get("/work-experience", getWorkExperienceController);
router.delete("/work-experience", authMiddleware, deleteWorkExperienceController);
router.put("/work-experience", authMiddleware, updateWorkExperienceController);

router.post("/education", authMiddleware, addEducationController);
router.get("/education", getEducationController);
router.delete("/education", authMiddleware, deleteEducationController);
router.put("/education", authMiddleware, updateEducationController);

export default router;