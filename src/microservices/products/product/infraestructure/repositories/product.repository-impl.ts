import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";
import { ProductModel } from "../../domain/models/product.model";
import { ProductsRepository } from "../../domain/repositories/product.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class ProductsRepositoryImpl implements ProductsRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: ProductModel[]; count: number; }> {
        try {
            return await ProductModel.findAndCountAll({
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

    async get(id: string): Promise<ProductModel | null> {
        try {
            const product = await ProductModel.findOne(
                { where: { id }, });
            if (!product) {
                throw new HttpError("030001");
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async add(product: ProductEntity): Promise<ProductModel> {
        try {
            return await ProductModel.create(
                product as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, product: ProductEntity): Promise<ProductModel> {
        try {
            const [affectRows, editedPerson] = await ProductModel.update(
                product as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("030001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<ProductModel> {
        try {
            const productToDelete = await ProductModel.findOne({
                where: { id: id }
            });
            if (!productToDelete) {
                throw new HttpError("030001");
            }
            await productToDelete.destroy();
            return productToDelete;
        } catch (error) {
            throw error;
        }
    }
}