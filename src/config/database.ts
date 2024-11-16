import { config } from "dotenv";
import { Dialect } from "sequelize";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { CharacterModel } from "../lib-models/character/character.model";
import { GenderModel } from "../lib-models/product/gender.model";
import { KindModel } from "../lib-models/product/kind.model";
import { OAuthClientModel } from "../lib-models/auth/o-auth-client.model";
import { PersonModel } from "../lib-models/user/person.model";
import { ProductCharacterModel } from "../lib-models/product/product-character.model";
import { ProductModel } from "../lib-models/product/product.model";
import { RoleModel } from "../lib-models/security/role.model";
import { RoleServiceModel } from "../lib-models/security/role-service.model";
import { ServiceModel } from "../lib-models/security/service.model";
import { UserModel } from '../lib-models/user/user.model';

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
                CharacterModel,
                KindModel,
                GenderModel,
                ProductModel,
                ProductCharacterModel,
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
