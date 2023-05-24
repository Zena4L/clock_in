import { Router } from "express";
import {home} from '../controller/viewController'

const router = Router();

router.get('/',home)

export default router;