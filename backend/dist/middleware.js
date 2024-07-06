"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ Reason: "No auth headers" });
    }
    // const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        // req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({ msg: "Failed in JWT Authentication" });
    }
};
exports.authMiddleware = authMiddleware;
