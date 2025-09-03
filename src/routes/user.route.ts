import {  Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { changeEmailController, changePasswordController, changeUsernameController, getUserController } from '../controller/user.controller';


const router = Router();

router.use(authMiddleware);
router.get("/session", getUserController);
router.put("/change-email", changeEmailController);
router.put("/change-username", changeUsernameController);
router.put("/change-password", changePasswordController);

export default router;