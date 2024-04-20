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

        // Send the media in the response
        res.status(200).json({ data: { media } });
        next();
    } catch (e) {
        console.error(e);
        // If an error occurs, return a 500 response
        res.status(500).json({ error: e });
        next(e);
    }
}


export { UploadVideo }