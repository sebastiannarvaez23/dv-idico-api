import { Request, Response } from "express";

import { ErrorHandlerUtil } from "../../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { ProductManagement } from "../../application/use-cases/products-management";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class ProductsController {

    constructor(
        private readonly _productManagement: ProductManagement,
        private readonly _handlerError: ErrorHandlerUtil
    ) { }

    async getList(req: Request, res: Response) {
        try {
            const queryParams: QueryParams = (req as any).queryParams;
            res.status(200).json(await this._productManagement.getList(queryParams));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._productManagement.get(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async add(req: Request, res: Response) {
        try {
            const result = await this._productManagement.add(req.file!, { ...req.body });
            res.status(200).json(result);
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._productManagement.edit(id, req.file!, { ...req.body }));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._productManagement.delete(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    };

    async addCharacterAssignment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._productManagement.addCharacterAssignment(id, req.body));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async deleteCharacterAssignment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._productManagement.deleteCharacterAssignment(id, req.body));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
