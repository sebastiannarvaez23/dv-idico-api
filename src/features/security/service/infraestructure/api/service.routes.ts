import express from "express";

import { buildServiceListQueryParams } from "../middlewares/service-query-params.middleware";
import { serviceController, serviceMiddleware, authMiddleware, authorizationMiddleware, queryParamsMiddleware, serviceSerialzerMiddleware } from "../../../dependencies";
import { ServiceListValidator } from "../../application/validations/service-qlist.validator";

const servicesRoutes = express.Router();

servicesRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0401'),
    queryParamsMiddleware.queryValidationMiddleware(new ServiceListValidator(), buildServiceListQueryParams),
    serviceController.getList.bind(serviceController));

servicesRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0401'),
    serviceController.get.bind(serviceController));

servicesRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0403'),
    serviceMiddleware.validateAdd.bind(serviceMiddleware),
    serviceSerialzerMiddleware.add(),
    serviceController.add.bind(serviceController));

servicesRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0404'),
    serviceMiddleware.validateEdit.bind(serviceMiddleware),
    serviceSerialzerMiddleware.edit(),
    serviceController.edit.bind(serviceController));

servicesRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0405'),
    serviceController.delete.bind(serviceController));

servicesRoutes.get("/assigned-role/:roleId",
    queryParamsMiddleware.queryValidationMiddleware(new ServiceListValidator(), buildServiceListQueryParams),
    serviceController.getListAssignedRole.bind(serviceController));

export default servicesRoutes;