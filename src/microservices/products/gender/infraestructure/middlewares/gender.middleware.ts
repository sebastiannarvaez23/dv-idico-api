import { Request, Response, NextFunction } from "express";

import { ProductAddValidator } from "../../application/validations/gender-add.validator";
import { ProductEditValidator } from "../../application/validations/gender-edit.validator";
import { validationMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const productAddValidator = new ProductAddValidator();
const productEditValidator = new ProductEditValidator();

export class ProductMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(productAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(productEditValidator)(req, res, next);
    }
}