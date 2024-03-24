import prisma from "../../config/prisma";
import { User, Profile } from '.prisma/client';

export class UserService {
    constructor() { }

    async findUser(uuid: string): Promise<User | null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    oauthId: uuid
                }
            });
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            return null;
        }
    }

    async createUser(uuid: string, profile: any): Promise<User | null> {
        try {
            const user = await prisma.user.create({
                data: {
                    email: profile.email,
                    name: profile.name?.givenName,
                    oauthId: profile.id,
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


}
