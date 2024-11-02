import express from "express";
import multer from "multer";

import { authMiddleware, authorizationMiddleware, characterController, characterMiddleware, characterSerialzerMiddleware, queryParamsMiddleware, minioConfig } from '../../../dependencies';
import { buildCharacterListQueryParams } from "../middlewares/character-query-params.middleware";
import { CharacterListValidator } from "../../application/validations/character-qlist.validator";

const charactersRoutes = express.Router();
const upload = multer({ storage: minioConfig.getStorage() });

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
    authorizationMiddleware.checkAccess('0503'),
    upload.single('image'),
    characterMiddleware.validateAdd.bind(characterMiddleware),
    characterSerialzerMiddleware.add(),
    characterController.add.bind(characterController));

charactersRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0504'),
    upload.single('image'),
    characterMiddleware.validateEdit.bind(characterMiddleware),
    characterSerialzerMiddleware.edit(),
    characterController.edit.bind(characterController));

charactersRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0505'),
    characterController.delete.bind(characterController));

export default charactersRoutes;