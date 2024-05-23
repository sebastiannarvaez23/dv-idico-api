import { DataTypes } from 'sequelize';
import db from '../config/db/conn';
import Product from './product'; // Importar Product al principio
import CharacterProduct from './characterproduct';

const Character = db.define('idi_ma_character', {
    image: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.DECIMAL
    },
    history: {
        type: DataTypes.STRING
    }
}, {
    paranoid: true
});

export default Character;