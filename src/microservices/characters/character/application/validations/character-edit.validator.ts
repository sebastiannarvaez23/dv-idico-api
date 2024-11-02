import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";
import { isFile, isNumericString, isRequired, isString, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";

export class CharacterEditValidator extends BaseValidator<CharacterEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(100)],
            image: [isRequired, isFile],
            age: [isRequired, isNumericString, maxLength(3)],
            history: [isRequired, isString, maxLength(1000)]
        });
    }
}