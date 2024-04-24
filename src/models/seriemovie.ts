import { DataTypes } from 'sequelize';
import db from '../db/conn';

const SerieMovie = db.define('SerieMovie', {
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
    },
    deleted: {
        type: DataTypes.BOOLEAN
    },
});

export default SerieMovie;