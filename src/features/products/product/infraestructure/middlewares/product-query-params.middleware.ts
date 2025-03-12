import { Op } from "sequelize";

import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ProductListParams } from "../../../../../lib-entities/products/product/product-qlist.entity";

export function buildProductListQueryParams(data: ProductListParams): QueryParams {

    const LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);

    const limit = LIST_PAGINATION_LIMIT;
    const page = data.page ? parseInt(data.page, 10) : 1;
    const offset = (page - 1) * limit;

    const filters: { [key: string]: any } = {};

    if (data.title) {
        filters.title = { [Op.iLike]: `%${data.title}%` };
    }

    return { limit, offset, filters };
}