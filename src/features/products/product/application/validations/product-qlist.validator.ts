import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isDate, isNumericString, isString, isUUID, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { RolListParams } from "../../../../../lib-entities/security/role-qlist.entity";

export class ProductListValidator extends BaseValidator<RolListParams> {
    constructor() {
        super({
            page: [isNumericString],
            title: [isString, minLength(3), maxLength(70)],
            createdDate: [isDate],
            qualification: [isNumericString, maxLength(1)],
            genderId: [isUUID],
            limit: [isNumericString],
        });
    }
}