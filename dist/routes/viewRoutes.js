"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const viewController_1 = require("../controller/viewController");
const router = (0, express_1.Router)();
router.get('/', viewController_1.home);
exports.default = router;
//# sourceMappingURL=viewRoutes.js.map