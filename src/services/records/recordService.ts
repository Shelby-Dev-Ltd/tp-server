import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { equal } from "assert";

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
        res.send(JSON.stringify({
            data: {
                records
            }
        }));

        next();
    } catch (e) {
        res.send({ error: e, status: 500 });
        next(e);
    }
};

const GetOneRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Upsert the media
        const record = await prisma.record.findFirstOrThrow({
            where: {
                id: Number(id),
            }
        });

        res.send(JSON.stringify({
            data: {
                record
            }
        }));

        next();
    } catch (e) {
        res.send({ error: e, status: 500 });
        next(e);
    }
};


const CreateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Get query
        const { user, mediaId, location } = req.body;

        // Create a record related to the media
        const record = await prisma.record.create({
            data: {
                userId: user.id,
                location,
                mediaId,
            },
        });

        return {
            data: {
                record
            }
        }
    } catch (e) {
        console.error(e);
        res.send({ error: e, status: 500 });
        next(e);
    }
};

const AttachAnalyticsToRecord = async (req: Request, res: Response, next: NextFunction) => { //updates analytics id of a record
    try {
        //Get query
        const { recordId, analyticsId } = req.body;

        // Create a record related to the media
        const record = await prisma.record.update({
            where: {
                id: Number(recordId),
            },
            data: {
                analyticsId: Number(analyticsId),
            },
        });

        return {
            data: {
                record
            }
        }
    } catch (e) {
        console.error(e);
        res.send({ error: e, status: 500 });
        next(e);
    }
};


export { GetAllRecords, GetOneRecord, CreateRecord, AttachAnalyticsToRecord }