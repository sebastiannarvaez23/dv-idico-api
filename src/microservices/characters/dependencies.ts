import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../../lib-core/middlewares/validators/auth.validator";
import { CharacterManagement } from "./character/application/use-cases/character-management";
import { CharacterMiddleware } from "./character/infraestructure/middlewares/character.middleware";
import { CharactersController } from "./character/infraestructure/api/character.controller";
import { CharacterSerialzerMiddleware } from "./character/infraestructure/middlewares/character-serializer.middleware";
import { CharactersRepositoryImpl } from "./character/infraestructure/repositories/character.repository-impl";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { MinioConfig } from "../../config/minio";
import { QueryParamsMiddleware } from "../../lib-core/middlewares/validators/validation-query-params.middleware";
import { RedisConfig } from "../../config/redis";
import { TokenManager } from "../../lib-core/utils/token-manager.util";

export const minioConfig: MinioConfig = new MinioConfig();

const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const authValidator: AuthValidator = new AuthValidator();
const redisConfig: RedisConfig = new RedisConfig();

const charactersRepository = new CharactersRepositoryImpl();

const characterManagement = new CharacterManagement(charactersRepository, minioConfig);

export const authorizationMiddleware = new AuthorizationMiddleware();
export const characterSerialzerMiddleware = new CharacterSerialzerMiddleware();
export const queryParamsMiddleware = new QueryParamsMiddleware();
export const tokenManager = TokenManager.getInstance(redisConfig);
export const authMiddleware = new AuthMiddleware(authValidator, tokenManager);
export const characterMiddleware: CharacterMiddleware = new CharacterMiddleware();
export const characterController = new CharactersController(characterManagement, handlerError);