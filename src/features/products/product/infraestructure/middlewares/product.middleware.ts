import { Request, Response, NextFunction } from "express";

import { ProductAddOrDeleteCharacterAssignmentValidator } from "../../application/validations/product-character-assignment.validator";
import { ProductAddValidator } from "../../application/validations/product-add.validator";
import { ProductEditValidator } from "../../application/validations/product-edit.validator";
import { validationDataFileMiddleware, validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const productAddValidator = new ProductAddValidator();
const productEditValidator = new ProductEditValidator();
const productAddSorDeleteServiceAssignmentValidator = new ProductAddOrDeleteCharacterAssignmentValidator();

export class ProductMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataFileMiddleware(productAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataFileMiddleware(productEditValidator)(req, res, next);
    }

    validateProductAddorDeleteCharacterAssignment(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(productAddSorDeleteServiceAssignmentValidator)(req, res, next);
    }
}