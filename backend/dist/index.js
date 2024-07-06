"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
;
const bodyParser = require('body-parser');
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const app = express();
console.log("ey");
app.use((0, cors_1.default)());
console.log("hey");
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ "msg": "Welcome" });
});
app.use('/auth', authRoutes_1.default);
app.use('/post', postRoutes_1.default);
// app.use('/post', postRoutes);
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
//sadasd
//hello
