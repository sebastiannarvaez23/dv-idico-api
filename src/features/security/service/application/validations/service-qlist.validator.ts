import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isNumericString, isString, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { ServiceListParams } from "../../../../../lib-entities/security/service-qlist.entity";

export class ServiceListValidator extends BaseValidator<ServiceListParams> {
    constructor() {
        super({
            page: [isNumericString],
            code: [isNumericString, maxLength(4)],
            name: [isString, maxLength(70)],
            limit: [isNumericString],
        });
    }
}