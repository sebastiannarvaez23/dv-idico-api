import { KindEntity } from "../../../../../lib-entities/products/kind/kind.entity";
import { KindModel } from "../../domain/models/kind.model";
import { KindsRepository } from "../../domain/repositories/kind.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class KindManagement {

    constructor(
        private readonly _kindsRepository: KindsRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: KindModel[]; count: number; }> {
        try {
            return await this._kindsRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<KindModel | null> {
        try {
            return await this._kindsRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(kind: KindEntity): Promise<KindEntity | null> {
        try {
            return await this._kindsRepository.add(kind);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, kind: KindEntity): Promise<KindEntity | null> {
        try {
            const resultKind = await this._kindsRepository.edit(id, kind);
            return resultKind;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<KindModel | null> {
        try {
            const resultKind = await this._kindsRepository.delete(id);
            return resultKind;
        } catch (e) {
            throw e;
        }
    }
}