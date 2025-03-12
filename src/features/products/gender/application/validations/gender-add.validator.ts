import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { GenderEntity } from "../../../../../lib-entities/products/gender/gender.entity";

export class GenderAddValidator extends BaseValidator<GenderEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)]
        });
    }
}