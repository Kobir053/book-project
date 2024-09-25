import express from 'express';
import { ifBodyContainsUserIdAndBookName, ifPassedUserId } from '../middlewares/authMiddleware.js';
import { createBookForUser, getBooksOfUser } from '../controllers/userController.js';
const router = express.Router();
// router.use(ifPassedUserId);
router.route('/').get(ifPassedUserId, getBooksOfUser);
router.route('/').post(ifBodyContainsUserIdAndBookName, createBookForUser);
export default router;
