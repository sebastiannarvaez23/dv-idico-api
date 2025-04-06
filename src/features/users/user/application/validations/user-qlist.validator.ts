import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isNumericString, isString, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { UserListParams } from "../../../../../lib-entities/users/user-qlist.entity";

export class UserListValidator extends BaseValidator<UserListParams> {
    constructor() {
        super({
            page: [isNumericString],
            nickname: [isString, maxLength(70)],
            limit: [isNumericString],
        });
    }
}