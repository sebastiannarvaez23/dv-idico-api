import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isNumericString, isString, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { PersonListParams } from "../../../../../lib-entities/users/person-qlist.entity";

export class PersonListValidator extends BaseValidator<PersonListParams> {
    constructor() {
        super({
            page: [isNumericString],
            firstName: [isString, maxLength(70)],
            lastName: [isString, maxLength(70)],
            email: [isString],
            limit: [isNumericString],
        });
    }
}