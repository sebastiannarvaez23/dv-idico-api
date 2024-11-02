import express from "express";

import { authMiddleware, authorizationMiddleware, genderController, genderMiddleware, genderSerialzerMiddleware, queryParamsMiddleware, } from "../../../dependencies";
import { buildGenderListQueryParams } from "../middlewares/gender-query-params.middleware";
import { GenderListValidator } from "../../application/validations/gender-qlist.validator";

const gendersRoutes = express.Router();

gendersRoutes.get("/",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0301'),
    queryParamsMiddleware.queryValidationMiddleware(new GenderListValidator(), buildGenderListQueryParams),
    genderController.getList.bind(genderController));

gendersRoutes.get("/:id",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0302'),
    genderController.get.bind(genderController));

gendersRoutes.post("/",
    authMiddleware.authenticateToken,
    genderMiddleware.validateAdd.bind(genderMiddleware),
    //authorizationMiddleware.checkAccess('0303'),
    genderSerialzerMiddleware.add(),
    genderController.add.bind(genderController));

gendersRoutes.put("/:id",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0304'),
    genderMiddleware.validateEdit.bind(genderMiddleware),
    genderSerialzerMiddleware.edit(),
    genderController.edit.bind(genderController));

gendersRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    //authorizationMiddleware.checkAccess('0305'),
    genderController.delete.bind(genderController));

export default gendersRoutes;