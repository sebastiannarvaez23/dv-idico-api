import { Op } from "sequelize";

import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { UserListParams } from "../../../../../lib-entities/users/user-qlist.entity";

export function buildUserListQueryParams(data: UserListParams): QueryParams {

    const LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);

    const limit = LIST_PAGINATION_LIMIT;
    const page = data.page ? parseInt(data.page, 10) : 1;
    const offset = (page - 1) * limit;

    const filters: { [key: string]: any } = {};

    if (data.nickname) {
        filters.nickname = { [Op.iLike]: `%${data.nickname}%` };
    }

    return { limit, offset, filters };
}