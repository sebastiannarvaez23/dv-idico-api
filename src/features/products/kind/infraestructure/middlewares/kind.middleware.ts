import { Request, Response, NextFunction } from "express";

import { KindAddValidator } from "../../application/validations/kind-add.validator";
import { KindEditValidator } from "../../application/validations/kind-edit.validator";
import { validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const kindAddValidator = new KindAddValidator();
const kindEditValidator = new KindEditValidator();

export class KindMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(kindAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(kindEditValidator)(req, res, next);
    }
}