const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express"


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader ) {
        return res.status(403).json({Reason:"No auth headers"});
    }

    // const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET);

        // req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({msg:"Failed in JWT Authentication"});
    }
};

export {authMiddleware}