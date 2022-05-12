import express, { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user_id: number;
        }
    }
}

export class ExpressController {
    callAPI = async (req: Request, res: Response, fn: () => any) => {
        try {
            let json = await fn();
            res.json(json);
        } catch (error) {
            res.status(500).json({ error: (error as Error).toString() });
        }
    };
}
