import { MinioConfig } from "../../../../../config/minio";
import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { CharacterModel } from "../../domain/models/character.model";
import { CharactersRepository } from "../../domain/repositories/character.repository";

export class CharacterManagement {

    constructor(
        private readonly _characterRepository: CharactersRepository,
        private readonly _minioConfig: MinioConfig,
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }> {
        try {
            return await this._characterRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<CharacterModel | null> {
        try {
            return await this._characterRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(file: Express.Multer.File, character: CharacterEntity): Promise<CharacterEntity | null> {
        try {
            this._minioConfig.setFile(file!);
            return await this._characterRepository.add(character);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, character: CharacterEntity): Promise<CharacterEntity | null> {
        try {
            const resultRole = await this._characterRepository.edit(id, character);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<CharacterModel | null> {
        try {
            const resultRole = await this._characterRepository.delete(id);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }
}