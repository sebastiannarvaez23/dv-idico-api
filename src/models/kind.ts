import { DataTypes } from 'sequelize';
import db from '../config/db/conn';

const Kind = db.define('idi_ma_kinds', {
    name: {
        type: DataTypes.STRING(150)
    }
});

export default Kind;