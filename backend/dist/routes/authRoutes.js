"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
// routes for authentication
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
exports.default = router;
