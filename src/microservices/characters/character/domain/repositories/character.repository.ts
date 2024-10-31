import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";
import { CharacterModel } from "../models/character.model";

export interface CharactersRepository {
    getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }>;
    get(id: string): Promise<CharacterModel | null>;
    add(person: RoleEntity): Promise<CharacterModel>;
    edit(id: string, person: RoleEntity): Promise<CharacterModel>;
    delete(id: string): Promise<CharacterModel>;
}