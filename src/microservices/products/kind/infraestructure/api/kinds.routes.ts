import express from "express";

import { authMiddleware, authorizationMiddleware, kindController, kindMiddleware, kindSerialzerMiddleware, queryParamsMiddleware, } from "../../../dependencies";
import { buildKindListQueryParams } from "../middlewares/kind-query-params.middleware";
import { KindListValidator } from "../../application/validations/kind-qlist.validator";

const kindsRoutes = express.Router();

kindsRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0701'),
    queryParamsMiddleware.queryValidationMiddleware(new KindListValidator(), buildKindListQueryParams),
    kindController.getList.bind(kindController));

kindsRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0702'),
    kindController.get.bind(kindController));

kindsRoutes.post("/",
    authMiddleware.authenticateToken,
    kindMiddleware.validateAdd.bind(kindMiddleware),
    authorizationMiddleware.checkAccess('0703'),
    kindSerialzerMiddleware.add(),
    kindController.add.bind(kindController));

kindsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0704'),
    kindMiddleware.validateEdit.bind(kindMiddleware),
    kindSerialzerMiddleware.edit(),
    kindController.edit.bind(kindController));

kindsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0705'),
    kindController.delete.bind(kindController));

export default kindsRoutes;