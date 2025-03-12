import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { KindEntity } from "../../../../../lib-entities/products/kind/kind.entity";

export class KindEditValidator extends BaseValidator<KindEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)]
        });
    }
}