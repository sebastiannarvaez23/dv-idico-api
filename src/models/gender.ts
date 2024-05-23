import { DataTypes } from 'sequelize';
import db from '../config/db/conn';

const Gender = db.define('idi_ma_genders', {
    name: {
        type: DataTypes.STRING(150)
    },
    image: {
        type: DataTypes.STRING(255)
    }
});

export default Gender;