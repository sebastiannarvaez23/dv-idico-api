import { Request, Response } from "express";

import { CharacterManagement } from "../../application/use-cases/character-management";
import { ErrorHandlerUtil } from "../../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class CharactersController {

    constructor(
        private readonly _characterManagement: CharacterManagement,
        private readonly _handlerError: ErrorHandlerUtil,
    ) { }

    async getList(req: Request, res: Response) {
        try {
            const queryParams: QueryParams = (req as any).queryParams;
            res.status(200).json(await this._characterManagement.getList(queryParams));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._characterManagement.get(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async add(req: Request, res: Response) {
        try {
            res.status(200).json(await this._characterManagement.add(req.file!, { ...req.body }));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._characterManagement.edit(id, req.file!, { ...req.body }));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._characterManagement.delete(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    };

    async getListNotAssignedProduct(req: Request, res: Response) {
        try {
            const queryParams: QueryParams = (req as any).queryParams;
            const { productId } = req.params;
            res.status(200).json(await this._characterManagement.getListNotAssignedProduct(productId, queryParams));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async getListAssignedProduct(req: Request, res: Response) {
        try {
            const queryParams: QueryParams = (req as any).queryParams;
            const { idProduct } = req.params;
            res.status(200).json(await this._characterManagement.getListAssignedProduct(queryParams));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
