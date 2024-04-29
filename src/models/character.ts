import { DataTypes } from 'sequelize';
import db from '../db/conn';
import SerieMovie from './seriemovie'; // Importar SerieMovie al principio
import CharacterSerieMovie from './characterseriemovie';

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