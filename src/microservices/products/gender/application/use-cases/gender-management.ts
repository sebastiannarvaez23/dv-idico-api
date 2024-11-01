import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";
import { ProductModel } from "../../domain/models/gender.model";
import { ProductsRepository } from "../../domain/repositories/gender.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class ProductManagement {

    constructor(
        private readonly _rolesRepository: ProductsRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: ProductModel[]; count: number; }> {
        try {
            return await this._rolesRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<ProductModel | null> {
        try {
            return await this._rolesRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(product: ProductEntity): Promise<ProductEntity | null> {
        try {
            return await this._rolesRepository.add(product);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, product: ProductEntity): Promise<ProductEntity | null> {
        try {
            const resultProduct = await this._rolesRepository.edit(id, product);
            return resultProduct;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<ProductModel | null> {
        try {
            const resultProduct = await this._rolesRepository.delete(id);
            return resultProduct;
        } catch (e) {
            throw e;
        }
    }
}