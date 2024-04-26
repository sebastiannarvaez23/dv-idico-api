import { Request, Response } from 'express';
import User from '../models/users';
import Credential from '../models/credentials';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error al generar el hash de la contraseña:', error);
        throw error;
    }
}

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        return passwordMatch;
    } catch (error) {
        console.error('Error al comparar las contraseñas:', error);
        throw error;
    }
}

export const getToken = async (req: Request, res: Response) => {
    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ where: { mail } });

        if (!user) {
            return res.status(401).json({ msg: 'Credenciales inválidas 1' });
        }

        const credentials = await Credential.findOne({ where: { user_id: user.get('id') } });

        if (!credentials) {
            return res.status(401).json({ msg: 'Credenciales inválidas 2' });
        }

        const passwordFromRequest = password.trim();
        const passwordFromDatabase = (credentials.get('password') as string).trim();
        const passwordMatch = await comparePassword(passwordFromRequest, passwordFromDatabase);

        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Credenciales inválidas 3' });
        }

        const token = jwt.sign({
            sub: user.get('id'),
            name: user.get('name'),
            exp: Date.now() + 60 * 1000
        }, secret);

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error obteniendo el token del usuario, contacte el administrador.'
        });
    }
};

export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, lastname, mail, birthdate, phone, password } = req.body;

        const existingUser = await User.findOne({ where: { mail } });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, lastname, mail, birthdate, phone });

        await Credential.create({ user_id: newUser.get('id'), password: hashedPassword });

        res.status(201).json({ msg: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ msg: 'Error al registrar usuario, por favor inténtelo de nuevo más tarde' });
    }
};