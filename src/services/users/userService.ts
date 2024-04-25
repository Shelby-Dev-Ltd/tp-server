import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { createUser, findUser } from "./helper/userFunctions";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name } = req.body;

        const { userId } = req.params;

        const user = await findUser(Number(userId));

        if (!user) {
            throw new Error('User not found');
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                email,
                name
            },
        })

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}

export { updateUser, findUser, createUser }