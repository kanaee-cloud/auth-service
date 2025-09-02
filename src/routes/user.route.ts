import {  Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware';
import { getUserController } from '../controller/user.controller';


const router = Router();

router.use(authMiddleware);
router.get("/session", getUserController);

export default router;