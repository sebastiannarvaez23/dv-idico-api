import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { KindEntity } from "../../../../../lib-entities/products/kind/kind.entity";
import { KindModel } from "../../domain/models/kind.model";
import { KindsRepository } from "../../domain/repositories/kind.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class KindsRepositoryImpl implements KindsRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: KindModel[]; count: number; }> {
        try {
            return await KindModel.findAndCountAll({
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

    async get(id: string): Promise<KindModel | null> {
        try {
            const kind = await KindModel.findOne(
                { where: { id }, });
            if (!kind) {
                throw new HttpError("070001");
            }
            return kind;
        } catch (error) {
            throw error;
        }
    }

    async add(kind: KindEntity): Promise<KindModel> {
        try {
            return await KindModel.create(
                kind as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, kind: KindEntity): Promise<KindModel> {
        try {
            const [affectRows, editedPerson] = await KindModel.update(
                kind as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("070001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<KindModel> {
        try {
            const kindToDelete = await KindModel.findOne({
                where: { id: id }
            });
            if (!kindToDelete) {
                throw new HttpError("070001");
            }
            await kindToDelete.destroy();
            return kindToDelete;
        } catch (error) {
            throw error;
        }
    }
}