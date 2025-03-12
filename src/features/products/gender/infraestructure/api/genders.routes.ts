import express from "express";

import { authMiddleware, authorizationMiddleware, genderController, genderMiddleware, genderSerialzerMiddleware, queryParamsMiddleware, } from "../../../dependencies";
import { buildGenderListQueryParams } from "../middlewares/gender-query-params.middleware";
import { GenderListValidator } from "../../application/validations/gender-qlist.validator";

const gendersRoutes = express.Router();

gendersRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0801'),
    queryParamsMiddleware.queryValidationMiddleware(new GenderListValidator(), buildGenderListQueryParams),
    genderController.getList.bind(genderController));

gendersRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0802'),
    genderController.get.bind(genderController));

gendersRoutes.post("/",
    authMiddleware.authenticateToken,
    genderMiddleware.validateAdd.bind(genderMiddleware),
    authorizationMiddleware.checkAccess('0803'),
    genderSerialzerMiddleware.add(),
    genderController.add.bind(genderController));

gendersRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0804'),
    genderMiddleware.validateEdit.bind(genderMiddleware),
    genderSerialzerMiddleware.edit(),
    genderController.edit.bind(genderController));

gendersRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0805'),
    genderController.delete.bind(genderController));

export default gendersRoutes;