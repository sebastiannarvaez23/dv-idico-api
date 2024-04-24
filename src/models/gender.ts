import { DataTypes, Model } from 'sequelize';
import db from '../db/conn';

const Gender = db.define('idi_ma_genders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(150),
        unique: true
    },
    image: {
        type: DataTypes.STRING(255)
    }
});

export { Gender };