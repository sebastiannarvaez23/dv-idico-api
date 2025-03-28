import express from "express";
import multer from "multer";

import { authMiddleware, authorizationMiddleware, minioConfig, productController, productMiddleware, productSerialzerMiddleware, queryParamsMiddleware, } from "../../../dependencies";
import { buildProductListQueryParams } from "../middlewares/product-query-params.middleware";
import { ProductListValidator } from "../../application/validations/product-qlist.validator";

const productsRoutes = express.Router();
const upload = multer({ storage: minioConfig.getStorage() });

productsRoutes.get("/",
    queryParamsMiddleware.queryValidationMiddleware(new ProductListValidator(), buildProductListQueryParams),
    productController.getList.bind(productController));

productsRoutes.get("/:id",
    productController.get.bind(productController));

productsRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0603'),
    upload.single('image'),
    productMiddleware.validateAdd.bind(productMiddleware),
    productSerialzerMiddleware.add(),
    productController.add.bind(productController));

productsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0604'),
    upload.single('image'),
    productMiddleware.validateEdit.bind(productMiddleware),
    productSerialzerMiddleware.edit(),
    productController.edit.bind(productController));

productsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0605'),
    productController.delete.bind(productController));

productsRoutes.post("/add-character-assignment/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0606'),
    productMiddleware.validateProductAddorDeleteCharacterAssignment.bind(productMiddleware),
    productController.addCharacterAssignment.bind(productController));

productsRoutes.post("/delete-character-assignment/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0607'),
    productMiddleware.validateProductAddorDeleteCharacterAssignment.bind(productMiddleware),
    productController.deleteCharacterAssignment.bind(productController));

export default productsRoutes;