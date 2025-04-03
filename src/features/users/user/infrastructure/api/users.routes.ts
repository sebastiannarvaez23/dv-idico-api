import express from "express";

import { authMiddleware, authorizationMiddleware, queryParamsMiddleware, userController, userMiddleware } from "../../../dependencies";
import { buildUserListQueryParams } from "../middlewares/user-query-params.middleware";
import { UserListValidator } from "../../application/validations/user-qlist.validator";

const usersRoutes = express.Router();

usersRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0101'),
    queryParamsMiddleware.queryValidationMiddleware(new UserListValidator(), buildUserListQueryParams),
    userController.getList.bind(userController));

usersRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0102'),
    userController.get.bind(userController));

usersRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0103'),
    userMiddleware.validateAdd.bind(userMiddleware),
    userController.add.bind(userController));

usersRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0104'),
    userMiddleware.validateEdit.bind(userMiddleware),
    userController.edit.bind(userController));

usersRoutes.post("/validate-credentials",
    userMiddleware.validateCredentialBody.bind(userMiddleware),
    userController.validateCredential.bind(userController));

export default usersRoutes;