import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength, isNumericString } from "../../../../../lib-core/middlewares/validators/validation.type";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";

export class ProductAddValidator extends BaseValidator<ProductEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)]
        });
    }
}