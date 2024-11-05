export type Qualification = '1' | '2' | '3' | '4' | '5';

export interface ProductEntity {
    id?: string;
    title?: string;
    image?: string | null | undefined;
    createdDate?: Date;
    qualification?: Qualification;
    genderId?: string;
    kindId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

}