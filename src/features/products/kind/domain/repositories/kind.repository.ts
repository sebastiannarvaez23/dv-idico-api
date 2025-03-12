import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { KindEntity } from "../../../../../lib-entities/products/kind/kind.entity";
import { KindModel } from "../models/kind.model";

export interface KindsRepository {
    getList(queryParams: QueryParams): Promise<{ rows: KindModel[]; count: number; }>;
    get(id: string): Promise<KindModel | null>;
    add(kind: KindEntity): Promise<KindModel>;
    edit(id: string, kind: KindEntity): Promise<KindModel>;
    delete(id: string): Promise<KindModel>;
}