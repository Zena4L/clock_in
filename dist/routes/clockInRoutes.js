"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clockInController_1 = require("../controller/clockInController");
const router = (0, express_1.Router)();
router.post('/clockin', clockInController_1.clockin);
router.get('/clockout', clockInController_1.protect, clockInController_1.clockOut);
router.get('/results/:collectionName', clockInController_1.getDoc);
exports.default = router;
//# sourceMappingURL=clockInRoutes.js.map