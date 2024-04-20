import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";

const UploadVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url } = req.body;

        // Upsert the media
        const media = await prisma.media.upsert({
            where: { url },
            update: {
                url,
                type: 'VIDEO',
            },
            create: {
                url,
                type: 'VIDEO',
            },
        });

        res.send(JSON.stringify({
            data: {
                media
            }
        }));
        next();
    } catch (e) {
        res.send({ error: e, status: 500 });
        next(e);
    }
}

export { UploadVideo }