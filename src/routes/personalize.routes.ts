import { Router } from "express";
import { addTechSkillController, getPersonalizeController, updatePersonalizeController } from "../controller/personalize.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();


router.get("/", getPersonalizeController);
router.put("/update", authMiddleware, updatePersonalizeController);
router.post("/tech-skill", authMiddleware, addTechSkillController);

export default router;
