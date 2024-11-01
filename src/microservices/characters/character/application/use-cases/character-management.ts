import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";
import { CharacterModel } from "../../domain/models/character.model";
import { CharactersRepository } from "../../domain/repositories/character.repository";

export class CharacterManagement {

    constructor(
        private readonly _rolesRepository: CharactersRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }> {
        try {
            return await this._rolesRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<CharacterModel | null> {
        try {
            return await this._rolesRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(service: RoleEntity): Promise<RoleEntity | null> {
        try {
            return await this._rolesRepository.add(service);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, service: RoleEntity): Promise<RoleEntity | null> {
        try {
            const resultRole = await this._rolesRepository.edit(id, service);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<CharacterModel | null> {
        try {
            const resultRole = await this._rolesRepository.delete(id);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }
}