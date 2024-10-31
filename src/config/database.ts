import { config } from "dotenv";
import { Dialect } from "sequelize";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { CharacterModel } from "../microservices/characters/character/domain/models/character.model";
import { OAuthClientModel } from "../microservices/auth/domain/models/o-auth-client.model";
import { PersonModel } from "../microservices/users/person/domain/models/person.model";
import { RoleModel } from "../microservices/security/role/domain/models/role.model";
import { RoleServiceModel } from "../microservices/security/role/domain/models/role-service.model";
import { ServiceModel } from "../microservices/security/service/domain/models/service.model";
import { UserModel } from "../microservices/users/user/domain/models/user.model";

config();

export class DatabaseConfig {

    private sequelize: Sequelize;
    public redisClient: any;

    constructor() {
        const name: string = process.env.DB_NAME!;
        const user: string = process.env.DB_USER!;
        const password: string = process.env.DB_PASSWORD!;
        const host: string = process.env.DB_HOST!;
        const port: number = Number(process.env.DB_PORT!);
        const driver: Dialect = process.env.DB_DRIVER as Dialect;

        const databaseOptions: SequelizeOptions = {
            host: host,
            port: port,
            dialect: driver,
            models: [
                OAuthClientModel,
                UserModel,
                PersonModel,
                RoleModel,
                ServiceModel,
                RoleServiceModel,
                CharacterModel
            ],
        };

        this.sequelize = new Sequelize(name, user, password, databaseOptions);
    }

    public getDatabase() {
        return this.sequelize;
    }

    public async syncDatabase() {
        try {
            await this.sequelize.sync({ alter: true });
            console.log('Synchronized database and tables');
        } catch (err) {
            console.error('Error syncing: ', err);
        }
    }
}
