import { Request, Response, NextFunction } from "express";

import { CharacterAddValidator } from "../../application/validations/character-add.validator";
import { CharacterEditValidator } from "../../application/validations/character-edit.validator";
import { validationDataFileMiddleware, validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const characterAddValidator = new CharacterAddValidator();
const characterEditValidator = new CharacterEditValidator();

export class CharacterMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataFileMiddleware(characterAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(characterEditValidator)(req, res, next);
    }
}