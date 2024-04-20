import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";

const GetAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { take } = req.query;

        // Get all records
        const records = await prisma.record.findMany({
            orderBy: {
                id: 'desc',
            },
            take: Number(take) || undefined,
        });

        // Send the records in the response
        res.status(200).json({ data: { records } });
    } catch (e) {
        console.error(e);
        // If an error occurs, return a 500 response
        res.status(500).json({ error: e });
        next(e);
    }
};



const GetOneRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Find the record with the specified id
        const record = await prisma.record.findFirst({
            where: {
                id: Number(id),
            }
        });

        if (!record) {
            // If record is not found, return a 404 response
            res.status(404).json({ error: 'Record not found' });
            return;
        }

        // If record is found, return it in the response
        res.status(200).json({ data: { record } });
    } catch (e) {
        console.error(e);
        // If an error occurs, return a 500 response
        res.status(500).json({ error: e });
        next(e);
    }
};


const CreateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get query
        const { user, mediaId, location } = req.body;

        // Create a record related to the media
        const record = await prisma.record.create({
            data: {
                userId: user.id,
                location,
                mediaId,
            },
        });
        if (!record) throw Error('Failed to fetch data');

        // Send a success response
        res.status(200).json({ data: { record } });
    } catch (e) {
        console.error(e);
        // Send an error response
        res.status(500).json({ error: e });
        next(e);
    }
};



const AttachAnalyticsToRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get query
        const { recordId, analyticsId } = req.body;

        // Update the record with the new analyticsId
        const record = await prisma.record.update({
            where: {
                id: Number(recordId),
            },
            data: {
                analyticsId: Number(analyticsId),
            },
        });

        // Send a success response
        res.status(200).json({ data: { record } });
    } catch (e) {
        console.error(e);
        // Send an error response
        res.status(500).json({ error: e });
        next(e);
    }
};




export { GetAllRecords, GetOneRecord, CreateRecord, AttachAnalyticsToRecord }