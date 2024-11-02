import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";
import { ProductModel } from "../../domain/models/product.model";
import { ProductsRepository } from "../../domain/repositories/product.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { MinioConfig } from "../../../../../config/minio";

export class ProductManagement {

    constructor(
        private readonly _rolesRepository: ProductsRepository,
        private readonly _minioConfig: MinioConfig,
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

    async add(file: Express.Multer.File, product: ProductEntity): Promise<ProductEntity | null> {
        try {
            this._minioConfig.setFile(file!);
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

    async addCharacterAssignment(id: string, characters: { characters: string[] }): Promise<ProductModel | null> {
        try {
            const resultRole = await this._rolesRepository.addCharacterAssignment(id, characters.characters);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async deleteCharacterAssignment(id: string, characters: { characters: string[] }): Promise<ProductModel | null> {
        try {
            const resultRole = await this._rolesRepository.deleteCharacterAssignment(id, characters.characters);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }
}