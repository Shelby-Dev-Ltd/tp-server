import { NextFunction, Request, Response} from "express";
import prisma from "../../config/prisma";
import { User, Profile } from '.prisma/client';


   const findUser =  async(id: number): Promise<User | null> => {
        try {
            const user = await prisma.user.findFirst({
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

    const  createUser = async(id: number, profile: any): Promise<User | null> => {
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

    const updateUser = async(req: Request, res: Response, next: NextFunction) => {
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

export {updateUser}