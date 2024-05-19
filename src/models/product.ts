import { DataTypes } from 'sequelize';
import db from '../db/conn';
import Gender from './gender';
import Kind from './kind';

const SerieMovie = db.define('idi_ma_products', {
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
    kind_id: {
        type: DataTypes.INTEGER
    }
}, {
    paranoid: true
});

SerieMovie.belongsTo(Gender, { foreignKey: 'gender_id', as: 'gender' });
SerieMovie.belongsTo(Kind, { foreignKey: 'kind_id', as: 'kind' });

export default SerieMovie;