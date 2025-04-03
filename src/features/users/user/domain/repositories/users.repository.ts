import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { UserEntity } from "../../../../../lib-entities/users/user.entity";
import { UserModel } from "../../../../../lib-models/user/user.model";

export interface UsersRepository {
    getList(queryParams: QueryParams): Promise<{ rows: UserModel[]; count: number; }>;
    get(id: string): Promise<UserModel | null>;
    getUserPasswordByNickname(nickname: string): Promise<UserModel | null>;
    getByNickname(nickname: string): Promise<UserModel | null>;
    add(user: UserEntity): Promise<UserModel>;
    edit(id: string, user: UserEntity): Promise<UserModel>;
}