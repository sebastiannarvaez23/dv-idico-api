import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { GenderEntity } from "../../../../../lib-entities/products/gender/gender.entity";
import { GenderModel } from "../../../../../lib-models/product/gender.model";
import { GendersRepository } from "../../domain/repositories/gender.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class GendersRepositoryImpl implements GendersRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: GenderModel[]; count: number; }> {
        try {
            return await GenderModel.findAndCountAll({
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

    async get(id: string): Promise<GenderModel | null> {
        try {
            const gender = await GenderModel.findOne(
                { where: { id }, });
            if (!gender) {
                throw new HttpError("080001");
            }
            return gender;
        } catch (error) {
            throw error;
        }
    }

    async add(gender: GenderEntity): Promise<GenderModel> {
        try {
            return await GenderModel.create(
                gender as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, gender: GenderEntity): Promise<GenderModel> {
        try {
            const [affectRows, editedPerson] = await GenderModel.update(
                gender as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("080001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<GenderModel> {
        try {
            const genderToDelete = await GenderModel.findOne({
                where: { id: id }
            });
            if (!genderToDelete) {
                throw new HttpError("080001");
            }
            await genderToDelete.destroy();
            return genderToDelete;
        } catch (error) {
            throw error;
        }
    }
}