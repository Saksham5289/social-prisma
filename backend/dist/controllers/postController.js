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
Object.defineProperty(exports, "__esModule", { value: true });
exports.personsAllPosts = exports.allPosts = exports.createPost = void 0;
const zod_1 = require("../zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = zod_1.postBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid POST request"
        });
    }
    const newPost = yield prisma.post.create({
        data: {
            title: data.title,
            description: data.description,
            authorId: Number(req.headers.authorid)
        }
    });
    res.json({ newPost });
});
exports.createPost = createPost;
const allPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield prisma.post.findMany();
    res.json({ allPosts });
});
exports.allPosts = allPosts;
const personsAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield prisma.user.findUnique({
        where: {
            id: Number(req.headers.authorid),
        },
        include: {
            posts: true, // Include the 'posts' relation in the query result
        },
    });
    res.json({ "all posts": currentUser === null || currentUser === void 0 ? void 0 : currentUser.posts });
});
exports.personsAllPosts = personsAllPosts;
