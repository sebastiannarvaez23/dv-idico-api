import { DataTypes } from 'sequelize';
import db from '../db/conn';

const Character = db.define('Character', {
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
    },
    deleted: {
        type: DataTypes.BOOLEAN
    }
});

export default Character;