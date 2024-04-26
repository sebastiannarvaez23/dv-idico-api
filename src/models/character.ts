import { DataTypes } from 'sequelize';
import SerieMovie from './seriemovie';
import db from '../db/conn';

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

Character.belongsToMany(SerieMovie, {
    through: 'idi_re_characters_seriesmovies',
    foreignKey: 'character_id',
    otherKey: 'seriemovie_id'
});

export default Character;