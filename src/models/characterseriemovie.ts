import { DataTypes } from 'sequelize';
import db from '../db/conn';
import Character from './character';
import SerieMovie from './seriemovie';

const CharacterSerieMovie = db.define('idi_re_characters_seriesmovies', {
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

Character.belongsToMany(SerieMovie, { foreignKey: 'character_id', through: CharacterSerieMovie });
SerieMovie.belongsToMany(Character, { foreignKey: 'seriemovie_id', through: CharacterSerieMovie });

export default CharacterSerieMovie;