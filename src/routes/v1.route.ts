import { Router } from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import personalizeRoutes from "./personalize.routes";
import aboutRoutes from "./about.routes";


const router = Router()

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/personalize", personalizeRoutes);
router.use("/about", aboutRoutes);
export default router