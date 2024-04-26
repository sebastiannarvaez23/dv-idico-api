import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY as string;

interface UserData {
    id: number;
    name: string;
    email: string;
}

interface CustomRequest extends Request {
    user?: UserData;
}

function verificarJWT(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, secret, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}

export default verificarJWT;