import { Op } from "sequelize";

import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { CharacterListParams } from "../../../../../lib-entities/characters/character/character-qlist.entity";
import { ProductCharacterModel } from "../../../../../lib-models/product/product-character.model";

export function buildCharacterListQueryParams(data: CharacterListParams): QueryParams {

    const LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);

    const limit = LIST_PAGINATION_LIMIT;
    const page = data.page ? parseInt(data.page, 10) : 1;
    const offset = (page - 1) * limit;

    const through: { [key: string]: any } = {};
    const filters: { [key: string]: any } = {};

    if (data.name) {
        filters.name = { [Op.iLike]: `%${data.name}%` };
    }

    if (data.excludeProduct) {
        through.productId = { [Op.ne]: `${data.excludeProduct}` };
    }

    return {
        limit,
        offset,
        filters,
        through
    };
}