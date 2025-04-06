import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isNumericString, isString, isUUID, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class CharacterListValidator extends BaseValidator<QueryParams> {
    constructor() {
        super({
            page: [isNumericString],
            limit: [isNumericString],
            name: [isString, maxLength(70)],
        });
    }
}