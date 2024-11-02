import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isArray, isRequired, isUUID } from "../../../../../lib-core/middlewares/validators/validation.type";

export class ProductAddOrDeleteCharacterAssignmentValidator extends BaseValidator<{ characters: string[] }> {
    constructor() {
        super({
            characters: [isRequired, isArray(isUUID, false)]
        });
    }
}