import { Router } from "express";
import {clockin, protect,clockOut, getDoc} from '../controller/clockInController';

const router = Router();

router.post('/clockin',clockin);
router.get('/clockout',protect,clockOut)
router.get('/results/:collectionName',getDoc)

export default router;