import { NextFunction, Request, Response } from "express";

export class CharacterSerialzerMiddleware {
    add() {
        return (req: Request, res: Response, next: NextFunction) => {
            req.body.image = req.file!.originalname;
            req.body.createdBy = req.user!.id;
            next();
        };
    }

    edit() {
        return (req: Request, res: Response, next: NextFunction) => {
            req.body.image = req.file!.originalname;
            req.body.updatedBy = req.user!.id;
            next();
        };
    }
}