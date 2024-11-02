import { Request, Response, NextFunction } from "express";

import { ProductAddValidator } from "../../application/validations/product-add.validator";
import { ProductEditValidator } from "../../application/validations/product-edit.validator";
import { validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const productAddValidator = new ProductAddValidator();
const productEditValidator = new ProductEditValidator();

export class ProductMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(productAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(productEditValidator)(req, res, next);
    }
}