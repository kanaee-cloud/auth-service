import { Router } from "express";
import { addStatController, addTechSkillController, deleteStatController, deleteTechSkillController, getPersonalizeController, updatePersonalizeController, updateStatController, updateTechSkillController } from "../controller/personalize.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();


//personalize
router.get("/", getPersonalizeController);
router.put("/", authMiddleware, updatePersonalizeController);

//tech skill
router.post("/tech-skill", authMiddleware, addTechSkillController);
router.put("/tech-skill", authMiddleware, updateTechSkillController);
router.delete("/tech-skill", authMiddleware, deleteTechSkillController);

//stats
router.post("/stat", authMiddleware, addStatController);
router.put("/stat", authMiddleware, updateStatController);
router.delete("/stat", authMiddleware, deleteStatController);

export default router;
