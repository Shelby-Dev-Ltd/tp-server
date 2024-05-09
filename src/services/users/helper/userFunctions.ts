import { User } from "@prisma/client";
import prisma from "../../../config/prisma";

const findUser = async (id: number): Promise<User | null> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id,
            }
        });
        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }
}

const createUser = async (oauthId: string, profile: { email: string, name: string, photoUrl: string }) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: profile.email,
                name: profile.name,
                oauthId,
                profile: {
                    create: {
                        photoUrl: profile.photoUrl,
                        // Add other fields for extra information if needed
                    },
                },
            },
            include: {
                profile: true,
            },
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}


export { findUser, createUser }