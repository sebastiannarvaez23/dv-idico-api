import { Request, Response, NextFunction } from "express";

import { KindAddValidator } from "../../application/validations/kind-add.validator";
import { KindEditValidator } from "../../application/validations/kind-edit.validator";
import { validationMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const kindAddValidator = new KindAddValidator();
const kindEditValidator = new KindEditValidator();

export class KindMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(kindAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(kindEditValidator)(req, res, next);
    }
}