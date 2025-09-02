import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../dtos/user.dtos";
import { validateDTO } from "../middleware/validate.middleware";
import { refreshToken } from "../controller/token.controller";
import {
  loginController,
  logout,
  registerController,
} from "../controller/user.controller";

const router = Router();

router.post("/register", validateDTO(registerUserSchema), registerController);
router.post("/login", validateDTO(loginUserSchema), loginController);
router.get("/refresh-token", refreshToken);
router.delete("/logout", logout);

export default router;
