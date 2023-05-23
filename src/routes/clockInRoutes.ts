import { Router } from "express";
import {clockin, protect,clockOut,queryByDate} from '../controller/clockInController';

const router = Router();

router.post('/clockin',clockin);
router.get('/clockout',protect,clockOut)
router.post('/bydate',queryByDate);
// router.post('/getstats',getStatistics);

export default router;