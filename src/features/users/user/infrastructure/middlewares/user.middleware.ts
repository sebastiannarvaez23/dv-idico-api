import { NextFunction, Request, Response } from "express";

import { CredentialBodyValidator } from "../../application/validations/credential-body.validator";
import { UserAddValidator } from "../../application/validations/user-add.validator";
import { UserEditValidator } from "../../application/validations/user-edit.validator";
import { validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const userAddValidator = new UserAddValidator();
const userEditValidator = new UserEditValidator();
const credentialBodyValidator = new CredentialBodyValidator();

export class UserMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(userAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(userEditValidator)(req, res, next);
    }

    validateCredentialBody(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(credentialBodyValidator)(req, res, next);
    }

}