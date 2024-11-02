import { GenderEntity } from "../../../../../lib-entities/products/gender/gender.entity";
import { GenderModel } from "../../domain/models/gender.model";
import { GendersRepository } from "../../domain/repositories/gender.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class GenderManagement {

    constructor(
        private readonly _gendersRepository: GendersRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: GenderModel[]; count: number; }> {
        try {
            return await this._gendersRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<GenderModel | null> {
        try {
            return await this._gendersRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(gender: GenderEntity): Promise<GenderEntity | null> {
        try {
            return await this._gendersRepository.add(gender);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, gender: GenderEntity): Promise<GenderEntity | null> {
        try {
            const resultGender = await this._gendersRepository.edit(id, gender);
            return resultGender;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<GenderModel | null> {
        try {
            const resultGender = await this._gendersRepository.delete(id);
            return resultGender;
        } catch (e) {
            throw e;
        }
    }
}