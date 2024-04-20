import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";

const GetAllAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all analytics
        const analytics = await prisma.analytics.findMany();

        // Send the analytics in the response
        res.status(200).json({ data: { analytics } });
    } catch (e) {
        console.error(e);
        // If an error occurs, return a 500 response
        res.status(500).json({ error: e });
        next(e);
    }
};

const GetOneAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Get one analytics record
        const analytics = await prisma.analytics.findFirstOrThrow({
            where: {
                id: Number(id)
            }
        });

        // Send the analytics in the response
        res.status(200).json({ data: { analytics } });
    } catch (e) {
        console.error(e);
        // If an error occurs, return a 500 response
        res.status(500).json({ error: e });
        next(e);
    }
};

const CreateAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Get query
        const { bikeCount, carCount, truckCount } = req.body;

        // Create an analytics record
        const analytics = await prisma.analytics.create({
            data: {
                CarCount: carCount,
                BikeCount: bikeCount,
                TruckCount: truckCount
            },
        });

        // Send the created analytics record in the response
        res.status(200).json({ data: { analytics } });
    } catch (e) {
        console.error(e);
        // If an error occurs, return a 500 response
        res.status(500).json({ error: e });
        next(e);
    }
};




export { GetAllAnalytics, GetOneAnalytics, CreateAnalytics }