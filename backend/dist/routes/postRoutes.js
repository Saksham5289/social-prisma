"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const postController_1 = require("../controllers/postController");
const middleware_1 = require("../middleware");
// routes for authentication
router.post('/createPost', middleware_1.authMiddleware, postController_1.createPost);
router.get('/allPosts', middleware_1.authMiddleware, postController_1.allPosts);
router.post('/personsAllPosts', middleware_1.authMiddleware, postController_1.personsAllPosts);
exports.default = router;
