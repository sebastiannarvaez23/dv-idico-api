import { CharacterModel } from "../character/character.model";
import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table({
    tableName: 'products_characters',
    timestamps: false,
})
export class ProductCharacterModel extends Model {
    @ForeignKey(() => ProductModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'product_id',
    })
    declare productId: string;

    @ForeignKey(() => CharacterModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'character_id',
    })
    declare characterId: string;
}