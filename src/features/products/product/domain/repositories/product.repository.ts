import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";
import { ProductModel } from "../../../../../lib-models/product/product.model";

export interface ProductsRepository {
    getList(queryParams: QueryParams): Promise<{ rows: ProductModel[]; count: number; }>;
    get(id: string): Promise<ProductModel | null>;
    add(person: ProductEntity): Promise<ProductModel>;
    edit(id: string, person: ProductEntity): Promise<ProductModel>;
    delete(id: string): Promise<ProductModel>;
    addCharacterAssignment(id: string, characters: string[]): Promise<ProductModel>;
    deleteCharacterAssignment(id: string, characters: string[]): Promise<ProductModel>;
}