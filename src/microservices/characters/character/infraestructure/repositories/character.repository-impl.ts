import { Optional, UniqueConstraintError } from "sequelize";

import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";
import { CharacterModel } from "../../../../../lib-models/character/character.model";
import { CharactersRepository } from "../../domain/repositories/character.repository";
import { CustomQueryListPaginator } from "../../../../../lib-core/utils/custom-query-list-paginator";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { ProductModel } from "../../../../../lib-models/product/product.model";
import { queryListAssignedProduct } from "../../domain/queries/list-assigned-product";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { CharacterAssigment } from "../../../../../lib-entities/characters/character/character-assigment.interface";

export class CharactersRepositoryImpl implements CharactersRepository {

    constructor(
        private readonly _query: CustomQueryListPaginator,
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: CharacterModel[]; count: number; }> {
        try {
            return await CharacterModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                limit: queryParams.limit,
                offset: queryParams.offset,
                attributes: {
                    exclude: ['updatedAt', 'deletedAt', 'products']
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
                    attributes: ['title'],
                    through: {
                        attributes: []
                    }
                }],
            });
            if (!character) throw new HttpError("050001");

            const result = {
                ...character.toJSON(),
                products: character.products?.map((product: ProductModel) => product.title) || []
            };

            return result;
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

    async getListAssignedProduct(productId: string, queryParams: QueryParams): Promise<{ rows: CharacterAssigment[]; count: number; }> {
        try {
            return await this._query.execute(queryListAssignedProduct, {
                replacements: { productId },
                pagination: { offset: queryParams.offset, limit: queryParams.filters.limit }
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }
}