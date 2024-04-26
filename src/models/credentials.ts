import { DataTypes } from 'sequelize';
import db from '../db/conn';
import User from './users';

const Credential = db.define('idi_ma_credentials', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    password: {
        type: DataTypes.STRING
    }
});

Credential.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

export default Credential;
