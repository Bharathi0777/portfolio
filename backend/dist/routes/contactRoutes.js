"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const contactController_js_1 = require("../controllers/contactController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Rate limiter for spam protection on contact submissions: 5 messages per 15 minutes per IP
const contactLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'Too many messages sent from this IP. Please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
router.post('/', contactLimiter, contactController_js_1.submitContact);
router.get('/', auth_js_1.authenticateAdmin, contactController_js_1.getContactMessages);
router.patch('/:id/read', auth_js_1.authenticateAdmin, contactController_js_1.markMessageRead);
router.delete('/:id', auth_js_1.authenticateAdmin, contactController_js_1.deleteContactMessage);
exports.default = router;
