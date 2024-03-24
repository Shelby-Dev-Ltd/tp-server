import { NextFunction, Request, Response } from "express";

export const HelloService = (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello!')
}