"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    console.error('Unhandled Application Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'An unexpected server error occurred',
    });
};
exports.errorHandler = errorHandler;
