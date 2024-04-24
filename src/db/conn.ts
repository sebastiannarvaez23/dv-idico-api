import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME || 'mysql',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'root', {
    port: parseInt(process.env.DB_PORT || '3306') || 3306,
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

export default db;