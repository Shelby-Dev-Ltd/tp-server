import { User } from "@prisma/client";
import prisma from "../../../config/prisma";

const findUser = async (id: number): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }
}

const createUser = async (id: number, profile: any): Promise<User | null> => {
    try {
        const user = await prisma.user.create({
            data: {
                email: profile.email,
                name: profile.name?.givenName,
                id: profile.id,
            },
        });

        if (!user) {
            throw new Error('Failed to create user');
        }

        const createdProfile = await prisma.profile.create({
            data: {
                userId: user.id,
                photoUrl: profile.photos[0].value
                // Add other fields for extra information if needed
            },
            include: {
                user: true,
            },
        });

        return createdProfile.user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export { findUser, createUser }