import { Request, Response, NextFunction } from "express";

import { GenderAddValidator } from "../../application/validations/gender-add.validator";
import { GenderEditValidator } from "../../application/validations/gender-edit.validator";
import { validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const genderAddValidator = new GenderAddValidator();
const genderEditValidator = new GenderEditValidator();

export class GenderMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(genderAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(genderEditValidator)(req, res, next);
    }
}