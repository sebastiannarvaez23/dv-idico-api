import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Qualification } from "../../../../../lib-entities/products/product/product.entity";
import { GenderModel } from "../../../gender/domain/models/gender.model";
import { KindModel } from "../../../kind/domain/models/kind.model";

@Table({
    timestamps: true,
    tableName: 'products',
    paranoid: true,
    modelName: 'ProductModel',
})
export class ProductModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        field: 'id',
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING(100),
        field: 'title',
        allowNull: false,
        unique: true,
    })
    declare title: string;

    @Column({
        type: DataType.STRING(255),
        field: 'image',
        allowNull: true,
        unique: true,
    })
    declare image: string;

    @Column({
        type: DataType.DATE,
        field: 'created_date',
        allowNull: true,
        unique: false,
    })
    declare createdDate: Date;

    @Column({
        type: DataType.ENUM('1', '2', '3', '4', '5'),
        field: 'qualification',
        allowNull: true,
        unique: false,
    })
    declare qualification: Qualification;

    @Column({
        type: DataType.UUID,
        field: 'gender_id',
        allowNull: false,
        unique: false,
    })
    declare genderId: string;

    @Column({
        type: DataType.UUID,
        field: 'kind_id',
        allowNull: false,
        unique: false,
    })
    declare kindId: string;

    @Column({
        type: DataType.UUID,
        field: 'created_by',
        allowNull: false,
        unique: true,
    })
    declare createdBy: string;

    @Column({
        type: DataType.UUID,
        field: 'updated_by',
        allowNull: true,
        unique: true,
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

    @BelongsTo(() => GenderModel, {
        foreignKey: 'createdBy',
        targetKey: 'id',
    })
    declare gender: GenderModel;

    @BelongsTo(() => KindModel, {
        foreignKey: 'updatedBy',
        targetKey: 'id',
    })
    declare kind: KindModel;
}