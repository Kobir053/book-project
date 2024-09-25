import express, { Router } from 'express';
import { ifPassedUserId } from '../middlewares/authMiddleware.js';
import { getBooksOfUser } from '../controllers/userController.js';

const router: Router = express.Router();

router.use(ifPassedUserId);

router.route('/').get(getBooksOfUser);

export default router;