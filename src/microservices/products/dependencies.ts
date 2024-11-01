import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../../lib-core/middlewares/validators/auth.validator";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { ProductManagement } from "./product/application/use-cases/products-management";
import { ProductMiddleware } from "./product/infraestructure/middlewares/product.middleware";
import { ProductsController } from "./product/infraestructure/api/products.controller";
import { ProductSerialzerMiddleware } from "./product/infraestructure/middlewares/product-serializer.middleware";
import { ProductsRepositoryImpl } from "./product/infraestructure/repositories/product.repository-impl";
import { QueryParamsMiddleware } from "../../lib-core/middlewares/validators/validation-query-params.middleware";
import { RedisConfig } from "../../config/redis";
import { TokenManager } from "../../lib-core/utils/token-manager.util";


const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const authValidator: AuthValidator = new AuthValidator();
const redisConfig: RedisConfig = new RedisConfig();

const productsRepository = new ProductsRepositoryImpl();

const productManagement = new ProductManagement(productsRepository);

export const authorizationMiddleware = new AuthorizationMiddleware();
export const productSerialzerMiddleware = new ProductSerialzerMiddleware();
export const queryParamsMiddleware = new QueryParamsMiddleware();
export const tokenManager = TokenManager.getInstance(redisConfig);
export const authMiddleware = new AuthMiddleware(authValidator, tokenManager);
export const productMiddleware: ProductMiddleware = new ProductMiddleware();
export const productController = new ProductsController(productManagement, handlerError);