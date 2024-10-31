import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isNumericString, isRequired, isString, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";

export class CharacterEditValidator extends BaseValidator<CharacterEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(100)],
            image: [isRequired, isString, maxLength(250)],
            age: [isRequired, isNumericString, maxLength(3)],
            history: [isRequired, isString, maxLength(1000)]
        });
    }
}