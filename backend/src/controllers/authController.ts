import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import { loginBody, registerBody } from "../zod";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

const prisma = new PrismaClient();

export const register = async(req : Request,res:Response)=>{

    const { success, data } = registerBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: hashedPassword,
                    slang: data.slang,
                    profilePicUrl: data.profilePicUrl || null
                }
            });
            const token = jwt.sign(user.email, JWT_SECRET);
            res.json({user, token});
}


export const login = async (req: Request, res: Response) => {
    const { success, data } = loginBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    try {
        const desiredUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!desiredUser) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(data.password, desiredUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ email: desiredUser.email, id: desiredUser.id }, JWT_SECRET, {
            expiresIn: '1h' // Token expiration time
        });

        return res.json({ user: desiredUser, token });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};




// module.exports = {register}