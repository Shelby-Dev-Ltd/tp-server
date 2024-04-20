import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";

const GetAllAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all records
        const analytics = await prisma.analytics.findMany();

        res.send(JSON.stringify({
            data: {
                analytics
            }
        }));

        next();
    } catch (e) {
        res.send({ error: e, status: 500 });
        next(e);
    }
};

const GetOneAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Upsert the media
        const analytics = await prisma.analytics.findFirstOrThrow({
            where: {
                id: Number(id)
            }
        });

        res.send(JSON.stringify({
            data: {
                analytics
            }
        }));

        next();
    } catch (e) {
        res.send({ error: e, status: 500 });
        next(e);
    }
};


const CreateAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Get query
        const { bikesCount, carCount } = req.body;

        // Create a record related to the media
        const analytics = await prisma.analytics.create({
            data: {
                CarCount: carCount,
                BikesCount: bikesCount,
            },
        });

        return {
            data: {
                analytics
            }
        }
    } catch (e) {
        console.error(e);
        res.send({ error: e, status: 500 });
        next(e);
    }
};


export { GetAllAnalytics, GetOneAnalytics, CreateAnalytics }