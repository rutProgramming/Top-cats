import express from 'express';
import * as ctrl from '../controllers/leaderboard.controller.js';
const router = express.Router();

router.get('/leaderboard/top', ctrl.getTopN);
router.get('/leaderboard/bottom', ctrl.getBottom);
router.get('/users/:id/around', ctrl.getUserAround);
router.post('/users', ctrl.addUser);
router.put('/users/:id/score', ctrl.updateUserScore);

export default router;
