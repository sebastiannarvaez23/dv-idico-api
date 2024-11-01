import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ProductEntity } from "../../../../../lib-entities/products/product/product.entity";
import { ProductModel } from "../models/product.model";

export interface ProductsRepository {
    getList(queryParams: QueryParams): Promise<{ rows: ProductModel[]; count: number; }>;
    get(id: string): Promise<ProductModel | null>;
    add(person: ProductEntity): Promise<ProductModel>;
    edit(id: string, person: ProductEntity): Promise<ProductModel>;
    delete(id: string): Promise<ProductModel>;
}