import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isDate, isFile, isNumericString, isRequired, isString, isUUID, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";

export class ProductEditValidator extends BaseValidator<ProductEntity> {
    constructor() {
        super({
            title: [isRequired, isString, maxLength(100)],
            image: [isFile],
            createdDate: [isDate],
            qualification: [isNumericString, maxLength(1)],
            genderId: [isUUID],
            kindId: [isUUID],
        });
    }
}