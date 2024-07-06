"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const zod_1 = require("../zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = zod_1.registerBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const user = yield prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            slang: data.slang,
            profilePicUrl: data.profilePicUrl || null
        }
    });
    const token = jsonwebtoken_1.default.sign(user.email, config_1.JWT_SECRET);
    res.json({ user, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = zod_1.loginBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }
    try {
        const desiredUser = yield prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!desiredUser) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(data.password, desiredUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: desiredUser.email, id: desiredUser.id }, config_1.JWT_SECRET, {
            expiresIn: '1h' // Token expiration time
        });
        return res.json({ user: desiredUser, token });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.login = login;
// module.exports = {register}
