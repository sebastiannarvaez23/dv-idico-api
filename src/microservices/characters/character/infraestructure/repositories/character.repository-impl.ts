import { Optional, UniqueConstraintError } from "sequelize";

import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";
import { CharacterModel } from "../../domain/models/character.model";
import { CharactersRepository } from "../../domain/repositories/character.repository";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ProductModel } from "../../../../products/product/domain/models/product.model";

export class CharactersRepositoryImpl implements CharactersRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }> {
        try {
            return await CharacterModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                limit: queryParams.limit,
                offset: queryParams.offset,
                attributes: {
                    exclude: ['updatedAt', 'deletedAt']
                },
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<CharacterModel | null> {
        try {
            const character = await CharacterModel.findOne({
                where: { id },
                include: [{
                    model: ProductModel,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    through: {
                        attributes: []
                    }
                }],
            });
            if (!character) {
                throw new HttpError("050001");
            }
            return character;
        } catch (error) {
            throw error;
        }
    }

    async add(character: CharacterEntity): Promise<CharacterModel> {
        try {
            return await CharacterModel.create(
                character as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, character: CharacterEntity): Promise<CharacterModel> {
        try {
            const [affectRows] = await CharacterModel.update(character as Optional<any, string>, {
                where: { id },
                returning: true,
            });

            if (!affectRows) throw new HttpError("050001");

            const updatedCharacter = await CharacterModel.findOne({
                where: { id },
                include: [{
                    model: ProductModel,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    through: {
                        attributes: []
                    }
                }],
            });

            if (!updatedCharacter) throw new HttpError("050001");

            return updatedCharacter;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<CharacterModel> {
        try {
            const characterToDelete = await CharacterModel.findOne({
                where: { id: id }
            });
            if (!characterToDelete) {
                throw new HttpError("050001");
            }
            await characterToDelete.destroy();
            return characterToDelete;
        } catch (error) {
            throw error;
        }
    }
}