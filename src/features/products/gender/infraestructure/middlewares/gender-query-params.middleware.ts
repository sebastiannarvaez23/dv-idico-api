import { Op } from "sequelize";

import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { GenderListParams } from "../../../../../lib-entities/products/gender/gender-qlist.entity";

export function buildGenderListQueryParams(data: GenderListParams): QueryParams {

    const LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);

    const limit = LIST_PAGINATION_LIMIT;
    const page = data.page ? parseInt(data.page, 10) : 1;
    const offset = (page - 1) * limit;

    const filters: { [key: string]: any } = {};

    if (data.name) {
        filters.name = { [Op.iLike]: `%${data.name}%` };
    }

    return { limit, offset, filters };
}