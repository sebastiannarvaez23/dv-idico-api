import express from "express";

import { authMiddleware, authorizationMiddleware, productController, productMiddleware, productSerialzerMiddleware, queryParamsMiddleware, } from "../../../dependencies";
import { buildProductListQueryParams } from "../middlewares/gender-query-params.middleware";
import { ProductListValidator } from "../../application/validations/gender-qlist.validator";

const productsRoutes = express.Router();

productsRoutes.get("/",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0301'),
    queryParamsMiddleware.queryValidationMiddleware(new ProductListValidator(), buildProductListQueryParams),
    productController.getList.bind(productController));

productsRoutes.get("/:id",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0302'),
    productController.get.bind(productController));

productsRoutes.post("/",
    authMiddleware.authenticateToken,
    productMiddleware.validateAdd.bind(productMiddleware),
    //authorizationMiddleware.checkAccess('0303'),
    productSerialzerMiddleware.add(),
    productController.add.bind(productController));

productsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0304'),
    productMiddleware.validateEdit.bind(productMiddleware),
    productSerialzerMiddleware.edit(),
    productController.edit.bind(productController));

productsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0305'),
    productController.delete.bind(productController));

export default productsRoutes;