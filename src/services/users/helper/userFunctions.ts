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
            },
            include: {
                profile: true,
            }
        });

        if (!user) {
            throw new Error('Failed to create user');
        }

        const createdProfile = await prisma.profile.create({
            data: {
                userId: user.id,
                photoUrl: profile.photoUrl,
                // Add other fields for extra information if needed
            },
            include: {
                user: true,
            },
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export { findUser, createUser }