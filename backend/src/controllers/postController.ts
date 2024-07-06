import { postBody } from "../zod";
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createPost = async(req : Request,res:Response)=>{

    const { success, data } = postBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Invalid POST request"
        })
    }
    
            const newPost = await prisma.post.create({
                data: {
                  title: data.title,
                  description: data.description,
                  authorId: Number(req.headers.authorid)
                }
              })

            res.json({newPost});
}


export const allPosts = async(req : Request,res:Response)=>{

            const allPosts = await prisma.post.findMany();
            res.json({allPosts});
}

export const personsAllPosts = async(req : Request,res:Response)=>{

    const currentUser = await prisma.user.findUnique({
        where: {
            id: Number(req.headers.authorid),
        },
        include: {
            posts: true, // Include the 'posts' relation in the query result
        },
    });
      res.json({"all posts": currentUser?.posts});
}