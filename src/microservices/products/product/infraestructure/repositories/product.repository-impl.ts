import { ForeignKeyConstraintError, Optional, UniqueConstraintError } from "sequelize";

import { CharacterModel } from "../../../../characters/character/domain/models/character.model";
import { GenderModel } from "../../../gender/domain/models/gender.model";
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
            const product = await ProductModel.findOne({
                where: { id },
                include: [
                    {
                        model: GenderModel,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    },
                    {
                        model: CharacterModel,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                        through: {
                            attributes: []
                        }
                    }],
            });
            if (!product) {
                throw new HttpError("060001");
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
            if (error instanceof UniqueConstraintError || error instanceof ForeignKeyConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, product: ProductEntity): Promise<ProductModel> {
        try {
            const [affectRows] = await ProductModel.update(product as Optional<any, string>, {
                where: { id },
                returning: true,
            });

            if (!affectRows) throw new HttpError("060001");

            const updatedProduct = await ProductModel.findOne({
                where: { id },
                include: [{
                    model: CharacterModel,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    through: {
                        attributes: []
                    }
                }],
            });

            if (!updatedProduct) throw new HttpError("060001");

            return updatedProduct;
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
                throw new HttpError("060001");
            }
            await productToDelete.destroy();
            return productToDelete;
        } catch (error) {
            throw error;
        }
    }

    async addCharacterAssignment(id: string, characters: string[]): Promise<ProductModel> {
        try {

            let product = await ProductModel.findOne({
                where: { id: id }
            });

            const serviceInstances = await CharacterModel.findAll({
                where: { id: characters }
            });

            if (!product) throw new HttpError("060001");
            if (serviceInstances.length !== characters.length) throw new HttpError("070002");

            await product.$add('characters', serviceInstances);

            product = await ProductModel.findOne({
                where: { id: id },
                include: [CharacterModel],
            });
            if (!product) throw new HttpError("060001");

            return product;

        } catch (error) {
            throw error;
        }
    }

    async deleteCharacterAssignment(id: string, characters: string[]): Promise<ProductModel> {
        try {

            let product = await ProductModel.findOne({
                where: { id: id }
            });

            const serviceInstances = await CharacterModel.findAll({
                where: { id: characters }
            });

            if (!product) throw new HttpError("060001");
            if (serviceInstances.length !== characters.length) throw new HttpError("070002");

            await product.$remove('characters', serviceInstances);

            product = await ProductModel.findOne({
                where: { id: id },
                include: [CharacterModel],
            });
            if (!product) throw new HttpError("060001");

            return product;

        } catch (error) {
            throw error;
        }
    }
}