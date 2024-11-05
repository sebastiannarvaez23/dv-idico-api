export interface CharacterEntity {
    id?: string;
    name?: string;
    image?: string | null | undefined;
    age?: string;
    history?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}