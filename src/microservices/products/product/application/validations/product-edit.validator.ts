import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";

export class ProductEditValidator extends BaseValidator<ProductEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)]
        });
    }
}