import { config } from "dotenv";

import { EncryptionUtil } from "../../../../../lib-core/utils/encryption.util";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { PersonsRepository } from "../../../person/domain/repositories/persons.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { UserEntity } from "../../../../../lib-entities/users/user.entity";
import { UserModel } from "../../../../../lib-models/user/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

config();

export class UserManagement {

    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _personRepository: PersonsRepository,
        private readonly _encryptedUtils: EncryptionUtil,
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: UserModel[]; count: number; }> {
        try {
            return await this._userRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<UserModel | null> {
        try {
            return await this._userRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(user: UserEntity): Promise<UserEntity | null> {
        try {
            if (user.nickname) {
                const ex = await this.getByNickname(user.nickname);
                if (ex) {
                    await this._userRepository.edit(ex.id, user);
                    const person = await this._personRepository.getPersonByNickname(user.nickname);
                    if (person) throw new HttpError('010003');
                }
                return ex;
            }
            user.password = this._encryptedUtils.encrypt(user.password!);
            return await this._userRepository.add(user);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, user: UserEntity): Promise<UserEntity | null> {
        try {
            const resultUser = await this._userRepository.edit(id, user);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }

    async validateCredential({ nickname, password }: Partial<UserEntity>): Promise<boolean> {
        try {
            const user = await this._userRepository.getUserPasswordByNickname(nickname!);
            if (!user) throw new HttpError("010001");
            const decriptedPass = this._encryptedUtils.decrypt(user.password);
            return (password === decriptedPass);
        } catch (e) {
            throw e;
        }
    }

    async getByNickname(nickname: string): Promise<UserModel | null> {
        try {
            return await this._userRepository.getByNickname(nickname);
        } catch (e) {
            throw e;
        }
    }
}