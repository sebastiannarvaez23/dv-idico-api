import { Optional, UniqueConstraintError } from "sequelize";

import { CharacterEntity } from "../../../../../lib-entities/characters/character/character.entity";
import { CharacterModel } from "../../domain/models/character.model";
import { CharactersRepository } from "../../domain/repositories/character.repository";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

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
            const person = await CharacterModel.findOne(
                { where: { id } });
            if (!person) {
                throw new HttpError("050001");
            }
            return person;
        } catch (error) {
            throw error;
        }
    }

    async add(person: CharacterEntity): Promise<CharacterModel> {
        try {
            return await CharacterModel.create(
                person as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, person: CharacterEntity): Promise<CharacterModel> {
        try {
            const [affectRows, editedPerson] = await CharacterModel.update(
                person as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("050001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<CharacterModel> {
        try {
            const personToDelete = await CharacterModel.findOne({
                where: { id: id }
            });
            if (!personToDelete) {
                throw new HttpError("050001");
            }
            await personToDelete.destroy();
            return personToDelete;
        } catch (error) {
            throw error;
        }
    }
}