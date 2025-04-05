import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { UserEntity } from "../../../../../lib-entities/users/user.entity";
import { UserModel } from "../../../../../lib-models/user/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: UserModel[]; count: number; }> {
        try {
            return await UserModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
                limit: queryParams.limit,
                offset: queryParams.offset,
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<UserModel | null> {
        try {
            const user = await UserModel.findOne(
                {
                    where: { id },
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
                });
            if (!user) {
                throw new HttpError("010001");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserPasswordByNickname(nickname: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne(
                {
                    where: { nickname }
                });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async getByNickname(nickname: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne(
                {
                    where: { nickname },
                    attributes: { exclude: ['password'] }
                });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async add(user: UserEntity): Promise<UserModel> {
        try {
            return await UserModel.create(user as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, user: UserEntity): Promise<UserModel> {
        try {
            const [affectRows, editedUser] = await UserModel.update(
                user as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedUser[0]) throw new HttpError("010001")
            return editedUser[0];
        } catch (error) {
            throw error;
        }
    }
}