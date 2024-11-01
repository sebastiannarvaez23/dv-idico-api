import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../../lib-core/middlewares/validators/auth.validator";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { KindManagement } from "./kind/application/use-cases/kinds-management";
import { KindsRepositoryImpl } from "./kind/infraestructure/repositories/kind.repository-impl";
import { ProductManagement } from "./product/application/use-cases/products-management";
import { ProductMiddleware } from "./product/infraestructure/middlewares/product.middleware";
import { ProductsController } from "./product/infraestructure/api/products.controller";
import { ProductSerialzerMiddleware } from "./product/infraestructure/middlewares/product-serializer.middleware";
import { ProductsRepositoryImpl } from "./product/infraestructure/repositories/product.repository-impl";
import { QueryParamsMiddleware } from "../../lib-core/middlewares/validators/validation-query-params.middleware";
import { RedisConfig } from "../../config/redis";
import { TokenManager } from "../../lib-core/utils/token-manager.util";
import { KindsController } from "./kind/infraestructure/api/kinds.controller";
import { KindMiddleware } from "./kind/infraestructure/middlewares/kind.middleware";
import { KindSerialzerMiddleware } from "./kind/infraestructure/middlewares/kind-serializer.middleware";


const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const authValidator: AuthValidator = new AuthValidator();
const redisConfig: RedisConfig = new RedisConfig();

const productsRepository = new ProductsRepositoryImpl();
const kindsRepository = new KindsRepositoryImpl();

const productManagement = new ProductManagement(productsRepository);
const kindManagement = new KindManagement(kindsRepository);

export const authorizationMiddleware = new AuthorizationMiddleware();
export const productSerialzerMiddleware = new ProductSerialzerMiddleware();
export const queryParamsMiddleware = new QueryParamsMiddleware();
export const tokenManager = TokenManager.getInstance(redisConfig);
export const authMiddleware = new AuthMiddleware(authValidator, tokenManager);
export const productMiddleware: ProductMiddleware = new ProductMiddleware();

export const kindSerialzerMiddleware = new KindSerialzerMiddleware();
export const kindMiddleware: KindMiddleware = new KindMiddleware();

export const productController = new ProductsController(productManagement, handlerError);
export const kindController = new KindsController(kindManagement, handlerError);