import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";
import { CharacterModel } from "../../domain/models/character.model";
import { CharactersRepository } from "../../domain/repositories/character.repository";
import { MinioConfig } from "../../../../../config/minio";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class CharacterManagement {

    constructor(
        private readonly _characterRepository: CharactersRepository,
        private readonly _minioConfig: MinioConfig,
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }> {
        try {
            const response = await this._characterRepository.getList(queryParams);
            response.rows = await Promise.all(
                response.rows.map(async e => {
                    e.image = await this._minioConfig.getPresignedUrl(e.image);
                    return e;
                })
            );
            return response;
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<CharacterModel | null> {
        try {
            const res = await this._characterRepository.get(id);
            if (res) res.image = await this._minioConfig.getPresignedUrl(res.image);
            return res;
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

    async edit(id: string, file: Express.Multer.File, character: CharacterEntity): Promise<CharacterEntity | null> {
        try {
            if (file) {
                const old = await this._characterRepository.get(id);
                this._minioConfig.replaceImage(old?.image!, file!);
            }
            const resultRole = await this._characterRepository.edit(id, character);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<CharacterModel | null> {
        try {
            const character = await this._characterRepository.get(id);
            this._minioConfig.deleteImage(character?.image!);
            const resultRole = await this._characterRepository.delete(id);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }
}