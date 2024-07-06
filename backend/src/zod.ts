import zod from "zod";


export const registerBody = zod.object({

    email: zod.string().email(),
	name: zod.string(),
	password: zod.string(),
	slang: zod.string(),
    profilePicUrl: zod.string().optional()
})

export const loginBody = zod.object({

    email: zod.string().email(),
    password: zod.string()
})

export const postBody = zod.object({

    title: zod.string(),
    description: zod.string(),
})