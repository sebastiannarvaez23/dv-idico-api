import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength, isNumericString, isDate, isUUID } from "../../../../../lib-core/middlewares/validators/validation.type";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";

export class ProductAddValidator extends BaseValidator<ProductEntity> {
    constructor() {
        super({
            title: [isRequired, isString, maxLength(100)],
            image: [isRequired, isString, maxLength(250)],
            createdDate: [isDate],
            qualification: [isNumericString, maxLength(1)],
            genderId: [isRequired, isUUID],
            kindId: [isRequired, isUUID],
        });
    }
}