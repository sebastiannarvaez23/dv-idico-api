import { DataTypes } from 'sequelize';
import db from '../db/conn';
import Character from './character';
import Product from './product';

const CharacterProduct = db.define('idi_re_characters_products', {
    character_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seriemovie_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Character.belongsToMany(Product, { foreignKey: 'character_id', through: CharacterProduct });
Product.belongsToMany(Character, { foreignKey: 'product_id', through: CharacterProduct });

export default CharacterProduct;