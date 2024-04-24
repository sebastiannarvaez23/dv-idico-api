import { DataTypes } from 'sequelize';
import Character from './character';
import db from '../db/conn';

const SerieMovie = db.define('idi_ma_seriesmovies', {
    title: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    created_date: {
        type: DataTypes.DATE
    },
    qualification: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5')
    },
    gender_id: {
        type: DataTypes.INTEGER
    }
}, {
    paranoid: true
});

//SerieMovie.belongsToMany(Character, { through: 'CharacterSerieMovie', foreignKey: 'seriemovie_id' });

export default SerieMovie;