import express from "express";

import { authMiddleware, authorizationMiddleware, characterController, characterMiddleware, characterSerialzerMiddleware, queryParamsMiddleware } from "../../../dependencies";
import { buildCharacterListQueryParams } from "../middlewares/character-query-params.middleware";
import { CharacterListValidator } from "../../application/validations/character-qlist.validator";

const charactersRoutes = express.Router();

charactersRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0501'),
    queryParamsMiddleware.queryValidationMiddleware(new CharacterListValidator(), buildCharacterListQueryParams),
    characterController.getList.bind(characterController));

charactersRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0502'),
    characterController.get.bind(characterController));

charactersRoutes.post("/",
    authMiddleware.authenticateToken,
    characterMiddleware.validateAdd.bind(characterMiddleware),
    authorizationMiddleware.checkAccess('0503'),
    characterSerialzerMiddleware.add(),
    characterController.add.bind(characterController));

charactersRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0504'),
    characterMiddleware.validateEdit.bind(characterMiddleware),
    characterSerialzerMiddleware.edit(),
    characterController.edit.bind(characterController));

charactersRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0505'),
    characterController.delete.bind(characterController));

export default charactersRoutes;