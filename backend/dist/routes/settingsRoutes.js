"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_js_1 = require("../controllers/settingsController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
router.get('/', settingsController_js_1.getSiteSettings);
router.put('/', auth_js_1.authenticateAdmin, settingsController_js_1.updateSiteSettings);
exports.default = router;
