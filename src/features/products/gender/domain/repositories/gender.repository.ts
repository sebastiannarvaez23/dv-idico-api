import { GenderEntity } from "../../../../../lib-entities/products/gender/gender.entity";
import { GenderModel } from "../models/gender.model";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export interface GendersRepository {
    getList(queryParams: QueryParams): Promise<{ rows: GenderModel[]; count: number; }>;
    get(id: string): Promise<GenderModel | null>;
    add(gender: GenderEntity): Promise<GenderModel>;
    edit(id: string, gender: GenderEntity): Promise<GenderModel>;
    delete(id: string): Promise<GenderModel>;
}