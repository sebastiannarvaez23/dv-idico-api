import { CharacterAssigment } from "../../../../../lib-entities/characters/character/character-assigment.interface";
import { CharacterModel } from "../../../../../lib-models/character/character.model";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";

export interface CharactersRepository {
    getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }>;
    get(id: string): Promise<CharacterModel | null>;
    add(character: RoleEntity): Promise<CharacterModel>;
    edit(id: string, character: RoleEntity): Promise<CharacterModel>;
    delete(id: string): Promise<CharacterModel>;
    getListAssignedProduct(productId: string, queryParams: QueryParams): Promise<{ rows: CharacterAssigment[]; count: number; }>;
}