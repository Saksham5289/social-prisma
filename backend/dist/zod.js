"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBody = exports.loginBody = exports.registerBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string(),
    slang: zod_1.default.string(),
    profilePicUrl: zod_1.default.string().optional()
});
exports.loginBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.postBody = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
