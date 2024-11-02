import { MinioConfig } from "../../../../../config/minio";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";
import { ProductModel } from "../../domain/models/product.model";
import { ProductsRepository } from "../../domain/repositories/product.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class ProductManagement {

    constructor(
        private readonly _productsRepository: ProductsRepository,
        private readonly _minioConfig: MinioConfig,
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: ProductModel[]; count: number; }> {
        try {
            return await this._productsRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<ProductModel | null> {
        try {
            const res = await this._productsRepository.get(id);
            if (res) res.image = await this._minioConfig.getPresignedUrl(res.image);
            return res;
        } catch (e) {
            throw e;
        }
    }

    async add(file: Express.Multer.File, product: ProductEntity): Promise<ProductEntity | null> {
        try {
            this._minioConfig.setFile(file!);
            return await this._productsRepository.add(product);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, file: Express.Multer.File, product: ProductEntity): Promise<ProductEntity | null> {
        try {
            const old = await this._productsRepository.get(id);
            this._minioConfig.replaceImage(old?.image!, file!);
            const resultProduct = await this._productsRepository.edit(id, product);
            return resultProduct;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<ProductModel | null> {
        try {
            const product = await this._productsRepository.get(id);
            this._minioConfig.deleteImage(product?.image!);
            const resultProduct = await this._productsRepository.delete(id);
            return resultProduct;
        } catch (e) {
            throw e;
        }
    }

    async addCharacterAssignment(id: string, characters: { characters: string[] }): Promise<ProductModel | null> {
        try {
            const resultRole = await this._productsRepository.addCharacterAssignment(id, characters.characters);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async deleteCharacterAssignment(id: string, characters: { characters: string[] }): Promise<ProductModel | null> {
        try {
            const resultRole = await this._productsRepository.deleteCharacterAssignment(id, characters.characters);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }
}