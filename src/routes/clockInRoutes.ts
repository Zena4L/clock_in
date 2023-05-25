import { Router } from "express";
import {clockin, protect,clockOut,queryByDate,getDocumentsByTimePeriod, geofence} from '../controller/clockInController';

const router = Router();

router.post('/clockin',geofence,clockin);
router.get('/clockout',protect,clockOut)
router.post('/bydate',queryByDate);
router.post('/getstats',getDocumentsByTimePeriod);

export default router;