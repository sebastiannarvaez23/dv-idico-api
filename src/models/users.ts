import { DataTypes } from 'sequelize';
import db from '../db/conn';

const User = db.define('idi_ma_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING,
        unique: true
    },
    birthdate: {
        type: DataTypes.DATE
    },
    phone: {
        type: DataTypes.STRING
    }
});

export default User;