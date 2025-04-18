import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";
import { ProductCharacterModel } from "../product/product-character.model";
import { ProductModel } from "../product/product.model";

@Table({
    timestamps: true,
    tableName: 'characters',
    paranoid: true,
    modelName: 'CharacterModel',
})
export class CharacterModel extends Model {

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        field: 'id',
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING(100),
        field: 'name',
        allowNull: false,
        unique: true,
    })
    declare name: string;

    @Column({
        type: DataType.STRING(255),
        field: 'image',
        allowNull: true,
        unique: true,
    })
    declare image: string | null | undefined;

    @Column({
        type: DataType.STRING(3),
        field: 'age',
        allowNull: false,
        unique: false,
    })
    declare age: string;

    @Column({
        type: DataType.TEXT,
        field: 'history',
        allowNull: false,
        unique: false,
    })
    declare history: string;

    @Column({
        type: DataType.UUID,
        field: 'created_by',
        allowNull: false,
        unique: false,
    })
    declare createdBy: string;

    @Column({
        type: DataType.UUID,
        field: 'updated_by',
        allowNull: true,
        unique: false,
    })
    declare updatedBy: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        field: 'created_at',
    })
    declare createdAt: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        field: 'updated_at',
    })
    declare updatedAt: Date;

    @DeletedAt
    @Column({
        type: DataType.DATE,
        field: 'deleted_at',
    })
    declare deletedAt: Date;

    @BelongsToMany(() => ProductModel, () => ProductCharacterModel)
    products!: ProductModel[];

}