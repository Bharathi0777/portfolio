"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_js_1 = require("../controllers/uploadController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Protect upload endpoint so only authenticated admin can upload files
router.post('/', auth_js_1.authenticateAdmin, uploadController_js_1.handleFileUpload);
exports.default = router;
