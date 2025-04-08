import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, minLength, isDate, maxLength, isBoolean, isNullable } from "../../../../../lib-core/middlewares/validators/validation.type";
import { UserEntity } from "../../../../../lib-entities/users/user.entity";

export class UserEditValidator extends BaseValidator<UserEntity> {
    constructor() {
        super({
            nickname: [isString, minLength(5), maxLength(20)],
            password: [isString, minLength(3), maxLength(200)],
            lastAuth: [isNullable, isDate],
            origin: [isNullable, isString, minLength(3), maxLength(100)],
            active: [isNullable, isBoolean]
        });
    }
}