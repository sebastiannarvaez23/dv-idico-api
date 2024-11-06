import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength, isNumericString, isFile } from "../../../../../lib-core/middlewares/validators/validation.type";
import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";

export class CharacterAddValidator extends BaseValidator<CharacterEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(100)],
            image: [isFile],
            age: [isRequired, isNumericString, maxLength(3)],
            history: [isRequired, isString, maxLength(1000)]
        });
    }
}