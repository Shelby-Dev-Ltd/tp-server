import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";

const GetAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { take } = req.query;

        // Get all records
        const records = await prisma.record.findMany({
            orderBy: {
                date: 'asc',
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

const GetRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        // Upsert the media
        const record = await prisma.record.findFirstOrThrow({
            where: {
                id
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


export { GetAllRecords, GetRecord, CreateRecord }